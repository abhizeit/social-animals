import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CommentList from "./comment-list";

import { Suspense } from "react";
import { Loader2} from "lucide-react";
import { authOptions } from "@/server/auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      <div className="pt-10 px-20">
        <Suspense
          fallback={
            <div className="h-4/5 items-center justify-center w-full flex">
              <Loader2 className="h-20 w-20 animate-spin" />
            </div>
          }
        >
          <CommentList />
        </Suspense>
      </div>
    </>
  );
}
