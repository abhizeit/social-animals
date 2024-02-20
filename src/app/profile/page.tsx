import { db } from "@/server/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UserCommentCard from "./user-comment-card";
import { authOptions } from "@/server/auth";
import Link from "next/link";
import ProfileLinkCopyButton from "./profile-link-copy-button";
import CommentForm from "./[...id]/comment-form";

async function getDbUser(email: string | null | undefined) {
  return await db.user.findFirst({ where: { email } });
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
  const user = await getDbUser(session?.user?.email);
  const comments = await getUserComments(session?.user?.email);

  return (
    <div className="px-20 pt-10">
      <div className="flex items-center flex-row gap-5">
        <h1 className="text-4xl text-ellipsis font-extrabold font">
          Hey, {session?.user?.name} 
          <ProfileLinkCopyButton
            uri={`https://social-animals-abhizeit.vercel.app/profile/${user?.id}`}
          />
        </h1>
      </div>
      <Link className="text-2xl font-bold" href={`/profile/${user?.id}`}>
        Add comment
      </Link>
      <div className="flex flex-wrap gap-5 justify-between">
        {comments?.map((c) => (
          <UserCommentCard
            key={c.id}
            comment={c?.comment}
            userId={c?.userId}
            archived={c.archived}
            commentId={c.id}
          />
        ))}
      </div>
    </div>
  );
}
