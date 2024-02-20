"use client";
import { Button } from "@/components/ui/button";
import { deactivateUser } from "@/lib/server-actions";
import { signOut } from "next-auth/react";

export default function DeactivateAccountButton({
  userId,
}: {
  userId: string;
}) {
  return (
    <Button
      variant={"secondary"}
      className="w-28"
      onClick={async () => {
        await deactivateUser(userId);
        await signOut();
      }}
    >
      Deactivate
    </Button>
  );
}
