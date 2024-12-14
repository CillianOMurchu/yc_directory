"use client";

import React, { useEffect, useState } from "react";
import DialogPrompt, { FormDetails } from "@/app/components/promptForm/Dialog";
import { Session } from "next-auth";
import { PromptFieldType } from "@/app/components/promptForm/PromptField";
import axios from "axios";
import { fetchPrompt } from "@/app/hooks/fetchPrompt";
import {
  extractVariables,
  fillTemplate,
} from "@/app/utils/promptForm/fillTemplate";

type PromptFormProps = {
  session: Session | null;
};

const PromptForm = ({ session }: PromptFormProps) => {
  const defaultPrompt = fetchPrompt();

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
    console.log("filledTemplateId is ", filledTemplateId);
    const updatedUser = await axios.post(`/api/users`, {
      session,
      userId: userId.data,
      filledTemplateId: filledTemplateId.data,
      filledTemplate,
    });
  };

  return session ? <DialogPrompt onSavePromptForm={onSavePromptForm} /> : null;
};

export default PromptForm;
