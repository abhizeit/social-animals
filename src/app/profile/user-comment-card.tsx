import { Button } from "@/components/ui/button";
import React from "react";

export default function UserCommentCard({
  comment,
  userId,
}: {
  comment: string;
  userId: string;
}) {
  console.log(comment);
  return (
    <div className="rounded-md border p-5 relative">
      <h1 className="text-yellow-400 text-2xls">{comment}</h1>
    </div>
  );
}
