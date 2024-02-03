import { db } from "@/server/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UserCommentCard from "./user-comment-card";
import { authOptions } from "@/server/auth";
import Link from "next/link";
import ProfileLinkCopyButton from "./profile-link-copy-button";

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
      <p>hello world</p>
      <Link href="/profile/65bbd9acabcadfa0c27aa972">put a comment</Link>
      <div className="flex items-center flex-row gap-5">
        <h1 className="text-4xl text-ellipsis font-extrabold font">
          Hey, {session?.user?.name}{" "}
        </h1>
        <ProfileLinkCopyButton
          uri={`https://localhost:8080/profile/${user?.id}`}
        />
      </div> 
      <div>
        <Link href={`/profile/${user?.id}`}>put a comment</Link>
        {comments?.map((c) => (
          <UserCommentCard key={c.id} comment={c?.comment} userId={c?.userId} />
        ))}
      </div>
    </div>
  );
}
