import clientPromise from "@/app/lib/mongoDB";

export async function getUserByEmail(email: string) {
  const client = await clientPromise;
  const db = client.db();
  const user = await db.collection("users").findOne({ email });

  if (!user) {
    throw new Error(`No user found with email: ${email}`);
  }

  return user;
}
