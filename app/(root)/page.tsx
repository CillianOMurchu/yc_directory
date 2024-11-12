"use client";

import { useState } from "react";
import axios from "axios";

import { Response } from "@/app/components/chat/Response";
import { Question } from "@/app/components/chat/Question";
import { Spinner } from "@radix-ui/themes";
import ChatBox from "@/app/components/Chat";

const defaultConversation = [
  { role: "assistant", content: "Hi there! How can I assist you?" },
];

const App = () => {
  return <ChatBox />;
};

export default App;
