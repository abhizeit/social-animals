import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { db } from "@/server/db";

import { revalidatePath } from "next/cache";

export default function CommentDialog({ userId }: { userId: string }) {
  async function addComment(formData: FormData) {
    "use server";
    await db.comment.create({
      data: {
        comment: formData.get("comment") as string,
        postedOn: new Date(),
        user: {
          connect: {
            id: userId, // Replace with the actual User ID
          },
        },
      },
    });
    revalidatePath("/dashboard");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={"sm"}>
          Add Comment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>What this animal has to say?</DialogTitle>
        </DialogHeader>
        <form action={addComment}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input name="comment" className="col-span-3" />
            </div>
          </div>

          <Button type="submit" variant={"secondary"}>
            Post Comment
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
