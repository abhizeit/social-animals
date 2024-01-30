import { db } from "@/db";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import CommentCard from "./comment-card";

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
  console.log(comments);

  return (
    <div className="flex flex-row gap-5 flex-wrap justify-center">
      {comments?.map((c) => (
        <CommentCard key={c.id} comment={c.comment} userId={c.userId} />
      ))}
    </div>
  );
}
