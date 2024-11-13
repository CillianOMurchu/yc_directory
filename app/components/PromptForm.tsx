"use client";

import React from "react";
import DialogPrompt from "@/app/components/promptForm/Dialog";

type PromptFormProps = {};

const PromptForm = () => {
  const onSave = async (e: { name: string }) => {
    console.log("Save changes", e);
  };
  return <DialogPrompt onSave={onSave} />;
};

export default PromptForm;
