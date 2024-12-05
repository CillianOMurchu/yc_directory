import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: apiKey });

export async function POST(req: Request) {
  console.log("req from chat is ", req);
  const { messages } = await req.json();
  const response = await openai.chat.completions.create({
    messages,
    model: "gpt-4o",
    response_format: {
      type: "json_object",
    },
    temperature: 0,
    max_tokens: 300,
  });
  return new Response(JSON.stringify(response));
}
