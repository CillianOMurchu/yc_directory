"use client";

import React from "react";
import { useState } from "react";
import axios from "axios";

import { Response } from "@/app/components/chat/Response";
import { Question } from "@/app/components/chat/Question";
import { Spinner } from "@radix-ui/themes";
import { Session } from "next-auth";
import PromptForm from "@/app/components/PromptForm";

type ChatBoxProps = {
  session: Session | null;
};

type ConversationType = { role: string; content: string }[];

const ChatBox = ({ session }: ChatBoxProps) => {
  const savedPrompt = window.localStorage.getItem("chatPrompt");
  console.log("savedPrompt is ", savedPrompt);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [conversation, setConversation] = useState<ConversationType>([
    {
      role: "assistant",
      content: savedPrompt ?? "Hi there! How can I assist you?",
    },
  ]);

  const [value, setValue] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setValue(e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setConversation((prevConversation) => {
      return [...prevConversation, { role: "user", content: value }];
    });

    setValue("");

    try {
      setIsLoading(true);
      const messages = [...conversation, { role: "user", content: value }];
      const response = await axios.post(
        "/chat",
        { messages },
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
      <PromptForm session={session} />
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
