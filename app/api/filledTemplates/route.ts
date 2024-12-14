import clientPromise from "@/app/lib/mongoDB";

export async function POST(req: Request) {
  const { filledTemplate, userId, promptFormId, variablesToGet } =
    await req.json();
  const collection = "filledTemplates";
  const client = await clientPromise;
  const db = client.db(collection);
  const newDocument = { filledTemplate, userId, promptFormId, variablesToGet };
  const newInsertion = await db.collection(collection).insertOne(newDocument);

  return new Response(JSON.stringify(newInsertion.insertedId));
}
