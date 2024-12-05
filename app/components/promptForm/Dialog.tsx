"use client";

import React, { ChangeEvent, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./dialog.css";
import PromptInput from "@/app/components/promptForm/PromptInput";
import { Divider } from "@/app/components/separator/Divider";
import PromptField, {
  PromptFieldType,
} from "@/app/components/promptForm/PromptField";

export type FormDetails = {
  name?: string;
  company?: string;
  context?: string;
  objective?: string;
};

export type DialogProps = {
  onSavePromptForm: (e: FormDetails & { fields: PromptFieldType[] }) => void;
};

const DialogPrompt = ({ onSavePromptForm }: DialogProps) => {
  const closeRef = useRef(null);
  const [formDetails, setFormDetails] = useState<FormDetails>({});
  const [fieldDetails, setFieldDetails] = useState<PromptFieldType[]>([]);

  const onChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    setFormDetails({ ...formDetails, [name]: e.target.value });
  };

  const onAddField = (newField: PromptFieldType) => {
    setFieldDetails([...fieldDetails, newField]);
  };

  const saveChanges = () => {
    const result = { ...formDetails, fields: fieldDetails };
    onSavePromptForm(result);
    if (closeRef.current) {
      closeRef.current.click();
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Close asChild ref={closeRef}>
        <button className="IconButton" aria-label="Close">
          <Cross2Icon />
        </button>
      </Dialog.Close>
      <Dialog.Trigger asChild>
        <button className="Button violet">Prompt Form</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Prompt Form</Dialog.Title>
          <Dialog.Description className="DialogDescription"></Dialog.Description>
          <PromptInput
            value={formDetails.name || ""}
            name="name"
            onChange={onChange}
          />
          <PromptInput
            value={formDetails.company || ""}
            name="company"
            onChange={onChange}
          />
          <PromptInput
            value={formDetails.context || ""}
            name="context"
            onChange={onChange}
          />
          <PromptInput
            value={formDetails.objective || ""}
            name="objective"
            onChange={onChange}
          />
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
