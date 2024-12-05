import clientPromise from "@/app/lib/mongoDB";

export async function POST(req: Request) {
  const { conversation, id, savedPrompt } = await req.json();

  const client = await clientPromise;
  const db = client.db("conversations");

  const newDocument = { conversation, id, savedPrompt };
  const options = { returnOriginal: false, upsert: true };

  await db
    .collection("conversations")
    .findOneAndReplace({ id }, newDocument, options);

  return new Response(JSON.stringify({ name: "collection" }));
}
