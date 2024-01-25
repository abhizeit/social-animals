import { db } from "@/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
  return new Response("all good");
}

export async function POST(request: Request) {
  const session = await getServerSession();
  console.log("session", session);
  console.log(request.formData);
  const body = await request.json();
  console.log(body);
  await db.comment.create({
    data: {
      comment: body.comment,
      postedOn: new Date(),
      user: {
        connect: {
          id: body.user, // Replace with the actual User ID
        },
      },
    },
  });
  return new Response("added");
}
