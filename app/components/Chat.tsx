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
        });

        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching response:", error);
    }

    // Clear input field
    setValue("");

    // setConversation((prevConversation) => {
    //   return [...prevConversation, { role: "user", content: value }];
    // });

    // await axios.post("/api/conversations", {
    //   id: session?.user?.email,
    //   conversation,
    // });

    // setValue("");

    // try {
    //   setIsLoading(true);
    //   const messages = [...conversation, { role: "user", content: value }];
    //   const response = await axios.post(
    //     "/api/chat",
    //     { messages },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    //       },
    //     }
    //   );
    //   const responseContent = response.data.choices[0].message.content;

    //   if (responseContent) {
    //     setIsLoading(false);
    //     const role = response.data.choices[0].message.role;
    //     setConversation((prevConversation) => {
    //       return [...prevConversation, { role, content: responseContent }];
    //     });
    //     await axios.post("/api/conversations", {
    //       id: session?.user?.email,
    //       conversation,
    //     });
    //   }
    // } catch (error) {
    //   setIsLoading(false);
    //   console.error("Error fetching response:", error);
    // }
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
