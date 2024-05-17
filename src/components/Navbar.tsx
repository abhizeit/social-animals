"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogOutIcon, Settings, Settings2, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-row top-0  backdrop-filter backdrop-blur-sm z-50 sticky items-center px-10 justify-between md:px-20 py-3">
      <div>
        <Link href={"/"}>
          <h1 className="text-sm text-white font-semibold md:font-bold  md:text-3xl ">
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
        <DropdownMenu>
          <DropdownMenuTrigger className="flex flex-row gap-2">
            <User /> <p className="hidden md:block">{session?.user?.email}</p>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col  gap-2 border-gray-700 w-auto mx-2">
            <DropdownMenuItem asChild>
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
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                asChild
                variant={"ghost"}
                size={"sm"}
                className="text-gray-400 hover:text-white "
              >
                <Link href="/settings" className="flex flex-row gap-2">
                  <Settings color="gray" size={20} />
                  <a>settings</a>
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                size={"sm"}
                variant={"ghost"}
                onClick={() => {
                  signOut();
                }}
                className="text-gray-400 hover:text-white gap-2 px-0 "
              >
                <LogOutIcon color="gray" size={20} />
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
