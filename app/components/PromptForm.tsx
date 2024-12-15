"use client";

import React from "react";
import DialogPrompt, { FormDetails } from "@/app/components/promptForm/Dialog";
import { Session } from "next-auth";
import { PromptFieldType } from "@/app/components/promptForm/PromptField";
import axios from "axios";
import { useFetchPrompt } from "@/app/hooks/fetchPrompt";
import {
  extractVariables,
  fillTemplate,
} from "@/app/utils/promptForm/fillTemplate";

type PromptFormProps = {
  session: Session | null;
};

const PromptForm = ({ session }: PromptFormProps) => {
  const defaultPrompt = useFetchPrompt();

  const onSavePromptForm = async (
    data: FormDetails & { fields: PromptFieldType[] }
  ) => {
    const { name, company, objective, context, fields } = data;
    const promptFormVariables = {
      name: name || null,
      company: company || null,
      objective: objective || null,
      context: context || null,
      fields: fields || null,
    };
    const filledTemplate = fillTemplate(defaultPrompt, promptFormVariables);
    const variablesToGet = extractVariables(filledTemplate);
    const createdPromptFormId = await axios.post("/api/promptForms", {
      promptForm: promptFormVariables,
      id: session?.user?.email,
    });
    const userId = await axios.post("/api/users", {
      session,
      promptFormId: createdPromptFormId.data,
    });
    const filledTemplateId = await axios.post("/api/filledTemplates", {
      filledTemplate,
      userId: userId.data,
      promptFormId: createdPromptFormId.data,
      variablesToGet,
    });
    await axios.post(`/api/users`, {
      session,
      userId: userId.data,
      filledTemplateId: filledTemplateId.data,
      createdPromptFormId: createdPromptFormId.data,
      filledTemplate,
      variablesToGet,
    });

  };

  return session ? <DialogPrompt onSavePromptForm={onSavePromptForm} /> : null;
};

export default PromptForm;
