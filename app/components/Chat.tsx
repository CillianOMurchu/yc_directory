"use client";

import React from "react";
import { useState } from "react";
import axios from "axios";

import { Response } from "@/app/components/chat/Response";
import { Question } from "@/app/components/chat/Question";
import { Spinner } from "@radix-ui/themes";
import { Session } from "next-auth";

type ChatBoxProps = {
  session: Session | null;
};

const ChatBox = ({ session }: ChatBoxProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [conversation, setConversation] = useState<
    { role: string; content: string }[]
  >([{ role: "assistant", content: "Hi there! How can I assist you?" }]);

  const [value, setValue] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setValue(e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setConversation((prevConversation) => [
      ...prevConversation,
      { role: "User", content: value },
    ]);
    setValue("");

    try {
      setIsLoading(true);
      const response = await axios.post(
        "/chat",
        { question: value },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );
      const responseContent = response.data.choices[0].message.content;
      if (responseContent) {
        setIsLoading(false);
        const role = response.data.choices[0].message.role;
        setConversation((prevConversation) => [
          ...prevConversation,
          { role, content: responseContent },
        ]);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching response:", error);
    }
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
    </div>
  ) : (
    <div>Sign in to view chatbot</div>
  );
};

export default ChatBox;
