import clientPromise from "@/app/lib/mongoDB";

export async function POST(req: Request) {
  const { conversation, id, savedPrompt } = await req.json();

  const client = await clientPromise;
  const db = client.db("conversations");

  // Find the document with the specified id and replace it
  const newDocument = { conversation, id, savedPrompt };
  const options = { returnOriginal: false, upsert: true };

  await db
    .collection("conversations")
    .findOneAndReplace({ id }, newDocument, options);

  // console.log("Updated document is ", result.value);

  return new Response(JSON.stringify({ name: "collection" }));
  // }

  // // Find the document with the specified id and replace it, or create a new one if it doesn't exist
  // const newDocument = { conversation, id };
  // const options = { returnOriginal: false, upsert: true };  // This option creates a new document if no document matches the filter

  // const result = await db
  //   .collection("conversations")
  //   .findOneAndUpdate({ id }, { $set: newDocument }, options);

  // // console.log("Updated document is ", result.value);

  // return new Response(JSON.stringify({ name: "collection" }));
}
