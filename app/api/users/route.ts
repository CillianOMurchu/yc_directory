import clientPromise from "@/app/lib/mongoDB";

export async function POST(req: Request) {
  const {
    session,
    promptFormId,
    filledTemplateId,
    filledTemplate,
    variablesToGet,
    jsonResponse,
  } = await req.json();
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
      filledTemplateId,
      filledTemplate,
      variablesToGet,
    };
    const newInsertion = await db.collection(collection).insertOne(newDocument);

    return new Response(JSON.stringify(newInsertion.insertedId));
  } else {
    let mappedVariables = null;
    if (jsonResponse) {
      // Map any from the jsonResponse to the variablesToGet items
      mappedVariables = Object.keys(existingUser.variablesToGet).reduce(
        (acc, key) => {
          return { ...acc, [key]: jsonResponse[key] || null };
        },
        {}
      );
    }
    const updateFields = {
      ...(promptFormId && { promptForm: promptFormId }),
      ...(filledTemplateId && { filledTemplateId: filledTemplateId }),
      ...(filledTemplate && { filledTemplate: filledTemplate }),
      ...(variablesToGet && { variablesToGet }),
      ...(mappedVariables && { mappedVariables }),
    };
    const updateResult = await db
      .collection(collection)
      .updateOne({ email: session.user.email }, { $set: updateFields });

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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const collection = "users";
  const client = await clientPromise;
  const db = client.db(collection);

  const fetchedUser = await db.collection(collection).findOne({ email });
  if (fetchedUser) {
    return new Response(JSON.stringify(fetchedUser.filledTemplate));
  } else {
    return new Response("User not found");
  }
}
