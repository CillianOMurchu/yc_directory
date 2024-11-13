import OpenAI from "openai";

const openai = new OpenAI({ apiKey: "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" });

export async function POST(req: Request) {
  const { question } = await req.json();
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant who knows everything about gaming.",
      },
      {
        role: "user",
        content: question,
      },
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 300,
  });
  return new Response(JSON.stringify(response));
}
