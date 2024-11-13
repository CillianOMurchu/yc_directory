import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: apiKey });

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
