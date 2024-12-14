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

type Role = "assistant" | "user";

type ConversationType = { role: string; content: string }[];

const ChatBox = ({ session }: ChatBoxProps) => {
  const savedPrompt = window.localStorage.getItem("chatPrompt");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [conversation, setConversation] = useState<ConversationType>([
    {
      role: "assistant",
      content: savedPrompt ?? "Hi there! How can I assist you?",
    },
  ]);

  // clear the currentConversation from localStorage if its the beginning of a new chat
  if (!conversation[1]) {
    window.localStorage.removeItem("currentConversation");
  }

  const [value, setValue] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("submit clicked");

    e.preventDefault();

    setConversation((prevConversation) => {
      return [...prevConversation, { role: "user", content: value }];
    });

    setValue("");

    try {
      setIsLoading(true);
      const messages = [...conversation, { role: "user", content: value }];
      const response = await axios.post(
        "/api/chat",
        { messages },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );
      console.log("messages is ", { messages });
      const responseContent = response.data.choices[0].message.content;
      console.log("responseContent is ", responseContent);

      if (responseContent) {
        // save the response to a mongodb database
        await axios.post("/api/conversations", {
          id: session?.user?.email,
          conversation: responseContent,
          savedPrompt: savedPrompt,
        });

        setIsLoading(false);
        const role = response.data.choices[0].message.role;

        setConversation((prevConversation) => {
          updateSavedChat([
            ...prevConversation,
            { role, content: responseContent },
          ]);
          return [...prevConversation, { role, content: responseContent }];
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching response:", error);
    }
  };

  const updateSavedChat = (
    contentToSave: { role: Role; content: string }[]
  ) => {
    const previousSavedChat = window.localStorage.getItem(
      "currentConversation"
    );
    const updatedChat = previousSavedChat
      ? JSON.parse(previousSavedChat).concat(contentToSave)
      : [contentToSave];

    window.localStorage.setItem(
      "currentConversation",
      JSON.stringify(updatedChat)
    );
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
