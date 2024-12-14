import { PromptFieldType } from "@/app/components/promptForm/PromptField";

type PromptFormVariables = {
  name: string | null;
  company: string | null;
  objective: string | null;
  context: string | null;
  fields: PromptFieldType[];
};

type VariablesObject = {
  [key: string]: string | null;
};

export const fillTemplate = (
  template: string,
  variables: PromptFormVariables
): string => {
  const stringifiedVariables: VariablesObject = {
    name: variables.name || "",
    company: variables.company || "",
    objective: variables.objective || "",
    context: variables.context || "",
    fields: variables.fields.map((field) => JSON.stringify(field)).join(", "),
  };

  return template.replace(
    /{(.*?)}/g,
    (_, key) => stringifiedVariables[key.trim()] || ""
  );
};

export const extractVariables = (prompt: string): VariablesObject => {
  // Regular expression to match JSON-like strings
  const regex = /{[^}]*}/g;

  // Find all matches in the prompt
  const matches = prompt.match(regex);

  // Parse each match into an object and add it to the array
  const variables = matches?.map((match) => JSON.parse(match)) || [];

  // Convert the array of objects into a single object
  const variablesObject: VariablesObject = {};
  variables.forEach(
    (variable: { label: string }) => (variablesObject[variable.label] = null)
  );

  return variablesObject;
};