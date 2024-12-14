import clientPromise from "@/app/lib/mongoDB";
import { ObjectId } from "mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("prompt");

  const defaultPrompt = await db
    .collection("prompt")
    .findOne({ _id: new ObjectId("675d717349f98bb20af88abc") });

  return new Response(JSON.stringify(defaultPrompt));
}
