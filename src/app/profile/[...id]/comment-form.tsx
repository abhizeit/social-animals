"use client";
import { Textarea } from "@/components/ui/textarea";
import { addComment } from "@/lib/server-actions";
import FormSubmitButton from "./form-submit-button";

export default function CommentForm({ userId }: { userId: string }) {
  return (
    <form
      className="w-[80%]"
      action={(formData: FormData) => addComment(formData, userId,"/profile")}
    >
      <div className="grid gap-5">
        <Textarea name="comment" placeholder="Add your comment here" />
        <FormSubmitButton />
      </div>
    </form>
  );
}
