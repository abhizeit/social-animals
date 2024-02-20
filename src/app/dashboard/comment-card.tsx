import { Button } from "@/components/ui/button";
import React from "react";
import CommentDialog from "./comment-dialog";
import { Textarea } from "@/components/ui/textarea";

export default function CommentCard({
  comment,
  userId,
}: {
  comment: string;
  userId: string;
}) {
  return (
    <div className=" w-40 rounded-md border p-5 relative gap-5 grid">
      <Textarea disabled value={comment} rows={6} className="scrollbar-none" />
      <div className="flex flex-col gap-2">
        <CommentDialog userId={userId} />
      </div>
    </div>
  );
}
