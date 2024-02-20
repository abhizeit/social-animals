import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { Textarea } from "@/components/ui/textarea";
import { addComment } from "@/lib/server-actions";


import { revalidatePath } from "next/cache";

export default function CommentDialog({ userId }: { userId: string }) {
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
        <form
          action={async (formdata) => {
            "use server";
            await addComment(formdata, userId, "/dashboard");
          }}
        >
          <div className="grid gap-4 py-4">
            <Textarea placeholder="Type your message here." name="comment" />
          </div>
          <DialogClose asChild>
            <Button type="submit" variant={"secondary"} className="w-full">
              Post Comment
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}
