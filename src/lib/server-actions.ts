"use server";
import { authOptions } from "@/server/auth";
import { db } from "@/server/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addComment(
  formData: FormData,
  userId: string,
  revalidationPath?: string
) {
  await db.comment.create({
    data: {
      comment: formData.get("comment") as string,
      postedOn: new Date(),
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
  if (revalidationPath) {
    revalidatePath(revalidationPath,"page");
  }
}

export async function archiveComment(
  userId: string,
  archived: boolean,
  commentId: string
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  const user = await db.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });

  if (!user || user?.id !== userId) {
    redirect("/");
  } else {
    await db.comment.update({
      where: {
        id: commentId,
      },
      data: {
        archived,
      },
    });
  }
  revalidatePath(`profile/${userId}`);
}

export async function deactivateUser(userId: string) {
  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      active: false,
    },
  });
  await db.session.deleteMany({
    where: {
      userId,
    },
  });
}
