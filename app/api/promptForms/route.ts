import clientPromise from "@/app/lib/mongoDB";

export async function POST(req: Request) {
  const { promptForm, id } = await req.json();
  const collection = "promptForms";
  const client = await clientPromise;
  const db = client.db(collection);

  const newDocument = { ...promptForm, id };
  const newInsertion = await db.collection(collection).insertOne(newDocument);

  return new Response(JSON.stringify(newInsertion.insertedId));
}
