import clientPromise from "@/app/lib/mongoDB";

export async function POST(req: Request) {
  const { session, promptFormId, filledTemplateId, filledTemplate } =
    await req.json();
  const collection = "users";
  const client = await clientPromise;
  const db = client.db(collection);

  const existingUser = await db
    .collection(collection)
    .findOne({ email: session.user.email });
  console.log("filledTemplateId in api request is ", filledTemplateId);
  if (!existingUser) {
    const newDocument = {
      email: session.user.email,
      name: session.user.name,
      promptForm: promptFormId,
      filledTemplateId,
      filledTemplate,
    };
    const newInsertion = await db.collection(collection).insertOne(newDocument);

    return new Response(JSON.stringify(newInsertion.insertedId));
  } else {
    const updateFields = {
      ...(promptFormId && { promptForm: promptFormId }),
      ...(filledTemplateId && { filledTemplateId: filledTemplateId }),
      ...(filledTemplate && { filledTemplate: filledTemplate }),
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

export async function GET(req: Request) {
  console.log("get Request is ", req.url.searchParams);
  // get session from the params
  // const email = req.url.searchParams.get('user[email]');
  // const { session } = await req.json();
  const collection = "users";
  const client = await clientPromise;
  const db = client.db(collection);

  const fetchedUser = await db
    .collection(collection)
    .findOne({ email: "cillian.murchu@gmail.com" });
  console.log("fetchedUser is ", fetchedUser);
  if (fetchedUser) {
    return new Response(JSON.stringify(fetchedUser.filledTemplate));
  } else {
    return new Response("User not found");
  }
}
