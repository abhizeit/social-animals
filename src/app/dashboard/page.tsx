import { db } from "@/server/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import CommentList from "./comment-list";

import { Suspense } from "react";
import { Loader2, RotateCw } from "lucide-react";
import { authOptions } from "@/server/auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    redirect("/api/auth/signin");
  }

  async function addComment(formData: FormData, userId: string) {
    "use server";
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
    revalidatePath("/dashboard");
  }

  return (
    <>
      <div className="h-screen pt-10 px-20">
        <h1>This is DashBoard for {session.user.email}</h1>
        <Suspense
          fallback={
            <div className="h-4/5 items-center justify-center w-full flex">
              <Loader2 className="h-20 w-20 animate-spin" />
            </div>
          }
        >
          <CommentList />
        </Suspense>
      </div>
    </>
  );
}
