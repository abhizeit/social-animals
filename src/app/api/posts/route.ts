import { authOptions } from "@/server/auth";
import { db } from "@/server/db";


import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("not logged in");
  }
  const comments = await db.comment.findMany({
    include: {
      user: true,
    },
  });
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
          id: "65b2c603bfed17c98012bf4e",
        },
      },
    },
  });
  return new Response("added");
}
