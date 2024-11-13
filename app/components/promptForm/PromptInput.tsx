import { ChangeEvent } from "react";

type PromptInputProps = {
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>, name: string) => void;
};

const PromptInput = ({ name, onChange }: PromptInputProps) => {
  return (
    <fieldset className="Fieldset">
      <label className="Label" htmlFor={name}>
        {name}
      </label>
      <input
        className="Input"
        id={name}
        data-1p-ignore
        onChange={(e) => onChange(e, name)}
      />
    </fieldset>
  );
};

export default PromptInput;
