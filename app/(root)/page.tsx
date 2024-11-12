"use client";

import { useState } from "react";
import axios from "axios";
import * as Form from "@radix-ui/react-form";
import { ArrowUpIcon } from "@radix-ui/react-icons";

import { Button } from "@radix-ui/themes";

const App = () => {
  const [response, setResponse] = useState<string>(
    "Hi there! How can I assist you?"
  );

  const [value, setValue] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setValue(e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents default form submission

    try {
      const response = (
        await axios.post(
          "/chat",
          { question: value },
          {
            headers: {
              Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
          }
        )
      ).data.choices[0].message.content;
      setResponse(response);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  return (
    <div className="chat">
      {/* <Form.Root onSubmit={handleSubmit} className="FormRoot my-4">
        <Form.Field className="FormField" name="question">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter your query
            </Form.Message>
          </div>
          <Form.Control asChild>
            <div className="chat__input">
              <div className="gap-x-2.5 rounded-md flex items-center p-4 bg-gray-800">
                <textarea
                  autoFocus
                  value={value}
                  onChange={onChange}
                  placeholder="Type your message here..."
                  className=" flex-grow bg-gray-700 text-white placeholder-gray-400 border-none focus:ring-2 focus:ring-blue-500 p-3 outline-none"
                />
                <Form.Submit asChild>
                  <Button size="2" color="green">
                    <ArrowUpIcon />
                  </Button>
                </Form.Submit>
              </div>
            </div>
          </Form.Control>
        </Form.Field>
      </Form.Root> */}

      {/* <div> */}
      {/* <p>Chatbot: {response}</p> */}
      {/* </div> */}
    </div>
  );
};

export default App;
