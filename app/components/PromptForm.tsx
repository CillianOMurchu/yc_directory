"use client";

import React from "react";
import DialogPrompt from "@/app/components/promptForm/Dialog";

const PromptForm = () => {
  const onSave = async (e: { [key: string]: string }) => {
    console.log("Save changes", e);
  };
  return <DialogPrompt onSave={onSave} />;
};

export default PromptForm;
