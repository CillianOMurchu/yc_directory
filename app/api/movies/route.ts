import clientPromise from "@/app/lib/mongoDB";
import { NextApiRequest, NextApiResponse } from "next";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("inside handler with request ", req);
  try {
    const client = await clientPromise;
    const db = client.db("mongodbVSCodePlaygroundDB");
    const movies = await db
      .collection("sales")
      // .find({})
      // .sort({ metacritic: -1 })
      // .limit(10)
      // .toArray();
    // res.json(movies);
  } catch (e) {
    console.error(e);
  }
};

export default handler;
