import { db } from "@/db";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UserCommentCard from "./user-comment-card";

async function getDbUser(email: string) {
  return await db.user.findFirst({
    where: {
      email,
    },
  });
}

async function getUserComments(email: string | null | undefined) {
  if (email) {
    const user = await getDbUser(email);
    try {
      const userComments = db.comment.findMany({
        where: {
          userId: user?.id,
        },
      });
      return userComments;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }

  const comments = await getUserComments(session?.user?.email);

  return (
    <div className="px-20 pt-10">
      {
        <h1 className="text-4xl text-ellipsis font-extrabold font">
          Hey, {session?.user?.name}{" "}
        </h1>
      }
      <div >
        {comments?.map((c) => (
          <UserCommentCard key={c.id} comment={c?.comment} userId={c?.userId} />
        ))}
      </div>
    </div>
  );
}
