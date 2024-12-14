"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import { Response } from "@/app/components/chat/Response";
import { Question } from "@/app/components/chat/Question";
import { Spinner } from "@radix-ui/themes";
import { Session } from "next-auth";
import { getUserByEmail } from "@/app/utils/getUserByEmail";

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
        params: session,
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

    setConversation((prevConversation) => {
      return [...prevConversation, { role: "user", content: value }];
    });

    setValue("");

    try {
      setIsLoading(true);
      const messages = [...conversation, { role: "user", content: value }];
      console.log("messages are ", messages);
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
        // await axios.post("/api/conversations", {
        //   id: session?.user?.email,
        //   conversation: responseContent,
        // savedPrompt: savedPrompt,
        // });

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
    // const previousSavedChat = window.localStorage.getItem(
    //   "currentConversation"
    // );
    // const updatedChat = previousSavedChat
    //   ? JSON.parse(previousSavedChat).concat(contentToSave)
    //   : [contentToSave];
    // window.localStorage.setItem(
    //   "currentConversation",
    //   JSON.stringify(updatedChat)
    // );
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
