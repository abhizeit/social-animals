import { db } from "@/server/db";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import CommentCard from "./comment-card";
import { authOptions } from "@/server/auth";

async function getComments() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      redirect("/api/auth/signin");
    }
    const comments = await db.comment.findMany({});
    return comments;
  } catch (e) {
    console.log(e);
  }
}

export default async function CommentList() {
  const comments = await getComments();

  return (
    <div className="flex flex-row gap-5 flex-wrap justify-center">
      {comments?.map((c) => (
        <CommentCard key={c.id} comment={c.comment} userId={c.userId} />
      ))}
    </div>
  );
}
