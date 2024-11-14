"use client";

import React, { ChangeEvent, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./dialog.css";
import PromptInput from "@/app/components/promptForm/PromptInput";
import { Divider } from "@/app/components/separator/Divider";
import PromptField, {
  PromptFieldType,
} from "@/app/components/promptForm/PromptField";

type DialogProps = {
  onSave: (e: { [key: string]: string } & { fields: PromptFieldType[] }) => void;
};

const DialogPrompt = ({ onSave }: DialogProps) => {
  const [formDetails, setFormDetails] = useState({});
  const [fieldDetails, setFieldDetails] = useState<PromptFieldType[]>([]);

  const onChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    setFormDetails({ ...formDetails, [name]: e.target.value });
    console.log("formDetails is ", formDetails);
  };

  const onAddField = (newField: PromptFieldType) => {
    console.log("previous fields are ", fieldDetails);
    setFieldDetails([...fieldDetails, newField]);
    console.log("fieldDetails is ", fieldDetails);
  };

  const saveChanges = () => {
    const result = { ...formDetails, fields: fieldDetails };
    console.log("result is ", result);
    onSave(result);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="Button violet">Prompt Form</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Prompt Form</Dialog.Title>
          <Dialog.Description className="DialogDescription"></Dialog.Description>
          <PromptInput name="name" onChange={onChange} />
          <PromptInput name="company" onChange={onChange} />
          <PromptInput name="context" onChange={onChange} />
          <PromptInput name="objective" onChange={onChange} />
          <Divider />
          <PromptField addField={onAddField} />

          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <button onClick={saveChanges} className="Button green">
              Save changes
            </button>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogPrompt;
