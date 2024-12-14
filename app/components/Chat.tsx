"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import { Response } from "@/app/components/chat/Response";
import { Question } from "@/app/components/chat/Question";
import { Spinner } from "@radix-ui/themes";
import { Session } from "next-auth";

type ChatBoxProps = {
  session: Session | null;
};

type Role = "assistant" | "user";

type ConversationType = { role: string; content: string }[];

const ChatBox = ({ session }: ChatBoxProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [filledTemplate, setFilledTemplate] = useState<string | null>(null);
  const [conversation, setConversation] = useState<ConversationType>([]);

  useEffect(() => {
    const fetchFilledTemplate = async () => {
      if (!session?.user?.email) {
        return;
      }
      const userFilledTemplate = await axios.get("/api/users", {
        params: { email: session?.user?.email },
      });
      setFilledTemplate(userFilledTemplate.data);
    };
    fetchFilledTemplate();
    setConversation([
      {
        role: "assistant",
        content: filledTemplate || "Hello, how can I help you today?",
      },
    ]);
  }, [filledTemplate]);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userMessage = { role: "user", content: value };
    const newConversation = [...conversation, userMessage];
    try {
      setIsLoading(true);
      const response = await axios.post(
        "/api/chat",
        { messages: newConversation },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );
      const responseContent = response.data.choices[0].message.content;

      if (responseContent) {
        const assistantMessage = {
          role: response.data.choices[0].message.role,
          content: responseContent,
        };
        const updatedConversation = [...newConversation, assistantMessage];

        // Update state
        setConversation(updatedConversation);

        // Save conversation to the database
        await axios.post("/api/conversations", {
          id: session?.user?.email,
          conversation: updatedConversation,
          // add template id and prompt id here aswell
        });

        const jsonResponse = JSON.parse(responseContent);
        console.log(
          "response.data.choices[0].message.content si ",
          jsonResponse
        );
        // const variablesToFill =
        await axios.post("/api/users", { session, jsonResponse });

        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching response:", error);
    }

    // Clear input field
    setValue("");
  };

  return session ? (
    <div className="chat">
      <Response response={conversation} />

      {isLoading && (
        <div className="spinner">
          {" "}
          <Spinner size="3" />
        </div>
      )}

      <Question value={value} onChange={onChange} handleSubmit={handleSubmit} />
      {/* <div>{JSON.stringify(conversation, null, "\t")}</div> */}
    </div>
  ) : (
    <div>Sign in to view chatbot</div>
  );
};

export default ChatBox;
