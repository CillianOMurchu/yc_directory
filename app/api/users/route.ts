import clientPromise from "@/app/lib/mongoDB";

export async function POST(req: Request) {
  const { session, promptFormId, filledTemplateId } = await req.json();
  const collection = "users";
  const client = await clientPromise;
  const db = client.db(collection);

  const existingUser = await db
    .collection(collection)
    .findOne({ email: session.user.email });

  if (!existingUser) {
    const newDocument = {
      email: session.user.email,
      name: session.user.name,
      promptForm: promptFormId,
      filledTemplate: filledTemplateId,
    };
    const newInsertion = await db.collection(collection).insertOne(newDocument);

    return new Response(JSON.stringify(newInsertion.insertedId));
  } else {
    const updateFields = {
      ...(promptFormId && { promptForm: promptFormId }),
      ...(filledTemplateId && { filledTemplate: filledTemplateId }),
    };
    const updateResult = await db
      .collection(collection)
      .updateOne({ email: session.user.email }, { $set: updateFields });

    console.log("updateResult is ", updateResult);
    if (updateResult.modifiedCount === 1) {
      // Fetch the updated document
      const updatedUser = await db
        .collection(collection)
        .findOne({ email: session.user.email });
      return new Response(JSON.stringify(updatedUser?._id));
    } else {
      return new Response("Update failed");
    }
  }
}
