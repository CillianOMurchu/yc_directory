import React from "react";
import { ArrowUpIcon } from "@radix-ui/react-icons";

import { Button } from "@radix-ui/themes";
type QuestionProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
};

export const Question = ({ value, onChange, handleSubmit }: QuestionProps) => {
  return (
    <>
      <textarea
        value={value}
        onChange={(e) => onChange(e)}
        placeholder="Search in here"
      ></textarea>

      <Button size="2" color="green" onClick={handleSubmit}>
        <ArrowUpIcon />
      </Button>
    </>
  );
};
