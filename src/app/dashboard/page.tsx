import { db } from "@/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { FormEvent } from "react";

export default async function Dashboard() {

  const session = await getServerSession();
  if (!session || !session.user || !session.user.email) {
    redirect("/api/auth/signin");
  }
  
  const res = await fetch("http://localhost:8080/api/posts/");
  const comments: {
    id: string;
    comment: string;
    userId: string;
    postedOn: Date;
  }[] = await res.json();

  async function addComment(formData: FormData) {
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
      <div className="h-screen pt-10 px-20 bg-gray-700">
        <h1>This is DashBoard for {session.user.email}</h1>
        <div>
          <form action={addComment}>
            <input type="text" name="comment" />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div>
          {comments?.map((c) => (
            <li key={c.id}>{c.comment}</li>
          ))}
        </div>
      </div>
    </>
  );
}
