export const fillTemplate = (
  template: string,
  variables: { [key: string]: string }
) => {
  return template.replace(/{(.*?)}/g, (_, key) => variables[key.trim()] || "");
};
