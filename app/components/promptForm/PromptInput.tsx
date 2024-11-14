import { ChangeEvent } from "react";

type PromptInputProps = {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>, name: string) => void;
};

const PromptInput = ({ name, onChange, value }: PromptInputProps) => {
  return (
    <fieldset className="Fieldset">
      <label className="Label" htmlFor={name}>
        {name}
      </label>
      <input
        className="Input"
        id={name}
        value={value}
        data-1p-ignore
        onChange={(e) => onChange(e, name)}
      />
    </fieldset>
  );
};

export default PromptInput;
