"use client";

import { Button } from "@/components/ui/button";
import { deleteComment } from "@/lib/server-actions";
import { Trash2 } from "lucide-react";
import React from "react";

export default function CommentDeleteButton({
  commentId,
  userId,
}: {
  commentId: string;
  userId: string;
}) {
  return (
    <Button
      variant={"secondary"}
      className="flex flex-row items-center gap-5"
      onClick={async () => {
        await deleteComment(userId, commentId);
      }}
    >
      <Trash2 size={20} /> Delete
    </Button>
  );
}
