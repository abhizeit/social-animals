import { db } from "@/server/db";
import CommentForm from "./comment-form";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const user = await db.user.findFirst({
      where: {
        id: `${params.id}`,
        active: true,
      },
    });
    if (!user) {
      notFound();
    }
    return <CommentForm userId={`${params.id}`} />;
  } catch (err) {
    console.log(err);
    notFound();
  }
}
