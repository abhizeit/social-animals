import { db } from "@/db";
import { getServerSession } from "next-auth";
import { json } from "stream/consumers";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  console.log(session);
  const comments = await db.comment.findMany();
  return new Response(JSON.stringify(comments));
}

export async function POST(request: Request) {
  const formData = await request.formData();
  await db.comment.create({
    data: {
      comment: formData.get("comment") as string,
      postedOn: new Date(),
      user: {
        connect: {
          id: "65b2c603bfed17c98012bf4e", // Replace with the actual User ID
        },
      },
    },
  });
  return new Response("added");
}
