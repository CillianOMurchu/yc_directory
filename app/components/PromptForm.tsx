"use client";

import React from "react";
import DialogPrompt, { FormDetails } from "@/app/components/promptForm/Dialog";
import { Session } from "next-auth";
import { PromptFieldType } from "@/app/components/promptForm/PromptField";

type PromptFormProps = {
  session: Session | null;
};

const PromptForm = ({ session }: PromptFormProps) => {
  const onSave = (data: FormDetails & { fields: PromptFieldType[] }) => {
    const { name, company, objective, context, fields } = data;

    const variablesString = fields
      .map(
        (type: { label: string; type: string }) =>
          `{ ${type.label}: ${type.type} }`
      )
      .join(", ");

    const prompt =
      `Speak only in english.` +
      `ONLY respond with JSON, for example, { aKey: aValue }` +
      "Do NOT prefix with any markdown, like ```json or otherwise" +
      `Do not respond with Markdown or anything else, ONLY JSON.` +
      `You are the virtual assistant of the person ${name} who works for ${company}.` +
      `Your goal is to respond to the user in the same language they use, utilizing the 'message' variable.` +
      `If you don't have a message variable in the response, then make sure you add at least an options key and put the array of answers as the value.` +
      `Ask questions if necessary and capture as much user data as possible while assisting the user and in addition to their objective which is ${objective}` +
      `Keep in mind the context you've been given aswell which is ${context}` +
      `You must capture the user's data and add the variables to your JSON as you obtain their values.` +
      `Once you have finished, ask for confirmation to send the data to the user and if confirmed, add the 'Finish' variable with the value 'True'.` +
      `Always keep in mind the name of the variables and their specifications.` +
      `These are the variables you should request: ${variablesString}`;

    if (typeof window !== "undefined") {
      localStorage.setItem("chatPrompt", prompt);
    }
  };

  return session ? <DialogPrompt onSave={onSave} /> : null;
};

export default PromptForm;