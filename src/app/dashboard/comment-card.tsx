import { Button } from "@/components/ui/button";
import React from "react";
import CommentDialog from "./comment-dialog";

export default function CommentCard({
  comment,
  userId,
}: {
  comment: string;
  userId: string;
}) {
  console.log(comment);
  return (
    <div className="h-60 w-40 rounded-md border p-5 relative">
      <h1 className="text-yellow-400 text-2xls">
        {comment.substring(0, 5)}...
      </h1>
      <div className="flex flex-col gap-2">
        <Button variant={"outline"} className="p-0" size={"sm"}>
          Reveal
        </Button>
        <CommentDialog userId={userId} />
      </div>
    </div>
  );
}
