import { Button } from "@/components/ui/button";
import { Trash, Trash2 } from "lucide-react";
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
    >
      <Trash2 size={20} /> Delete
    </Button>
  );
}
