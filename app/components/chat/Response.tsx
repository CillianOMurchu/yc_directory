import React from "react";

type ResponseProps = {
  response: { role: string; content: string }[];
};

export const Response = ({ response }: ResponseProps) => {
  return (
    <div className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-auto pt-4">
      <div className="w-full mx-auto max-w-3xl px-4 group/message">
        {response.map((item, index) => (
          <div
            key={index}
            className={`${
              item.role === "assistant"
                ? "text-left px-3 py-2 mt-2"
                : "text-right  border-solid border-2 border-sky-500  px-3 py-2 mt-2"
            } rounded-lg py-3`}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};
