"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut, LogOutIcon, User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <div className="  flex flex-row    top-0  backdrop-filter backdrop-blur-sm z-50 sticky items-center px-20 justify-between">
      <div>
        <Link href={"/"}>
          <h1 className="text-2xl text-white font-semibold">
            Social Animals 🐵
          </h1>
        </Link>
      </div>
      {!session ? (
        <div>
          <Button asChild className="my-3" size={"sm"}>
            <Link href="/api/auth/signin">Log In</Link>
          </Button>
        </div>
      ) : (
        <Popover>
          <PopoverTrigger className="flex flex-row gap-2">
            <User /> {session?.user?.email}
          </PopoverTrigger>
          <PopoverContent className="flex flex-col  gap-2 border-gray-700 w-auto px-2">
            <Button
              asChild
              variant={"ghost"}
              size={"sm"}
              className="text-gray-400 hover:text-white "
            >
              <Link href="/profile" className="flex flex-row gap-2">
                <User color="gray" size={20} />
                <a>Profile</a>
              </Link>
            </Button>

            <Button
              size={"sm"}
              variant={"ghost"}
              onClick={() => signOut()}
              className="text-gray-400 hover:text-white gap-2 px-0 "
            >
              <LogOutIcon color="gray" size={20} />
              Logout
            </Button>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
