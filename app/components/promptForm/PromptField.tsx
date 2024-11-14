import PromptInput from "@/app/components/promptForm/PromptInput";
import { Button } from "@radix-ui/themes";
import { ChangeEvent, useState } from "react";

export type PromptFieldType = { label: string; type: string };

type PromptFieldProps = {
  addField: (newField: PromptFieldType) => void;
};

const PromptField = ({ addField }: PromptFieldProps) => {
  const [fieldLabel, setFieldLabel] = useState("");
  const [fieldType, setFieldType] = useState("");

  const onChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldLabel(e.target.value);
  };

  const onChangeType = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldType(e.target.value);
  };

  const updateFields = () => {
    console.log("Field should be added");
    const result = { label: fieldLabel, type: fieldType };
    console.log("result is ", result);
    addField(result);
    setFieldLabel("");
    setFieldType("");
  };

  return (
    <div>
      <PromptInput name="label" onChange={onChangeLabel} />
      <PromptInput name="type" onChange={onChangeType} />
      <Button
        className="Button"
        onClick={updateFields}
        color="gold"
        size="2"
        variant="classic"
      >
        Save Field
      </Button>
    </div>
  );
};

export default PromptField;
