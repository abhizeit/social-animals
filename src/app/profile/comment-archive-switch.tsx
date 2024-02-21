"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { archiveComment } from "@/lib/server-actions";
import React from "react";

export default function CommentArchiveSwitch({
  archived = false,
  commentId,
  userId,
}: {
  archived: boolean;
  commentId: string;
  userId: string;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="archive"
        checked={archived}
        onCheckedChange={async () => {
          await archiveComment(userId, !archived, commentId);
        }}
      />
      <Label htmlFor="archive">Archive</Label>
    </div>
  );
}
