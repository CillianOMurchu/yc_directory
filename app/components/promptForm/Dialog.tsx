"use client";

import React, { ChangeEvent, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./dialog.css";
import PromptInput from "@/app/components/promptForm/PromptInput";

type DialogProps = {
  onSave: (e: { [key: string]: string }) => void;
};

const DialogPrompt = ({ onSave }: DialogProps) => {
  const [formDetails, setFormDetails] = useState({});

  const onChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    setFormDetails({ ...formDetails, [name]: e.target.value });
    console.log("formDetails is ", formDetails);
  };

  const saveChanges = (e: React.MouseEvent<HTMLButtonElement>) => {
    onSave(formDetails);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="Button violet">Edit profile</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Edit profile</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Make changes to your profile here. Click save when you're done.
          </Dialog.Description>
          <PromptInput name="name" onChange={onChange} />
          <PromptInput name="company" onChange={onChange} />
          <PromptInput name="context" onChange={onChange} />
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
