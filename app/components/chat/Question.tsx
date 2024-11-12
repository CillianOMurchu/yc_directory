import React from "react";
import { ArrowUpIcon } from "@radix-ui/react-icons";

import { Button } from "@radix-ui/themes";
type QuestionProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
};

export const Question = ({ value, onChange, handleSubmit }: QuestionProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <div className="question__container pb-4 py-2 rounded-md gap-4 w-full mx-auto max-w-3xl px-4">
      <textarea
        value={value}
        onChange={(e) => onChange(e)}
        placeholder="Send a message... (Shift + Enter to send)"
        onKeyDown={(e) => handleKeyDown(e)}
      ></textarea>

      <Button size="2" color="green" onClick={handleSubmit}>
        <ArrowUpIcon />
      </Button>
    </div>
  );
};
