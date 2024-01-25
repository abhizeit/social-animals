"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <div className=" h-10 flex flex-row  flex-wrap justify-between align-middle  top-0  backdrop-filter backdrop-blur-sm z-50 absolute w-screen px-20">
      <div>
        <h1 className="text-2xl text-white font-semibold">Anonymously</h1>
      </div>
      {!session ? (
        <div>
          <Button asChild variant="default">
            <Link href="/api/auth/signin">Log In</Link>
          </Button>
        </div>
      ) : (
        <button
          onClick={() => {
            signOut();
          }}
        >
          <LogOut color="white" size={20} />
        </button>
      )}
    </div>
  );
}
