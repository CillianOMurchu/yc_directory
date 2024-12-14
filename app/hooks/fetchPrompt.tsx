import { useState, useEffect } from "react";
import axios from "axios";

export const fetchPrompt = () => {
  const [prompt, setPrompt] = useState<string>("");

  useEffect(() => {
    const source = axios.CancelToken.source();

    const loadData = async () => {
      try {
        const response = await axios.get("/api/defaultPrompt", {
          cancelToken: source.token,
        });

        const promptToSet = response.data.prompt ?? "";
        setPrompt(promptToSet ?? "");
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request cancelled", error.message);
        } else {
          console.error(error);
        }
      }
    };

    loadData();

    return () => {
      source.cancel("Component unmounted");
    };
  }, []);

  return prompt;
};