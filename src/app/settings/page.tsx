import { Button } from "@/components/ui/button";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { db } from "@/server/db";
import { deactivateUser } from "@/lib/server-actions";
import DeactivateAccountButton from "./deactivate-account-button";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  const user = await db.user.findFirst({
    where: {
      email: session.user?.email,
    },
  });

  return (
    <div className="w-full  rounded-md p-4 grid gap-5 mt-20 border">
      <div className="flex items-center justify-between">
        <span className="font-bold text-sm">Deactivate Account</span>
        <DeactivateAccountButton userId={user?.id as string} />
      </div>
      <div className="flex items-center justify-between">
        <span className="font-bold text-sm">Delete Account</span>
        <Button variant={"destructive"} className="w-28">
          Delete
        </Button>
      </div>
    </div>
  );
}
