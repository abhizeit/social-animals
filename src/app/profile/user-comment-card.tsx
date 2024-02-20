// import CommentArchiveSwitch from "./comment-archive-switch";

import { Textarea } from "@/components/ui/textarea";
import CommentArchiveSwitch from "./comment-archive-switch";
import CommentDeleteButton from "./comment-delete-button";

export default function UserCommentCard({
  comment,
  userId,
  commentId,
  archived,
}: {
  comment: string;
  userId: string;
  commentId: string;
  archived: boolean;
}) {
  return (
    <div className="rounded-md border p-5 relative h-80 w-80 shadow-slate-300 hover:shadow-lg flex flex-col items-center justify-center overflow-y-auto gap-5">
      <Textarea
        disabled
        value={comment}
        rows={6}
        className="scrollbar-none"
      />
      <CommentArchiveSwitch
        commentId={commentId}
        userId={userId}
        archived={archived}
      />
      <CommentDeleteButton commentId={commentId} userId={userId} />
    </div>
  );
}
