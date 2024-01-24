"use client";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex flex-row flex-wrap justify-between align-middle">
      <div>
        <Link href={"/api/auth/signin"} >signin</Link>
        {/* <button onClick={() => redirect("/api/auth/sigin")}>signin</button> */}
      </div>
      <div>
        <button
          onClick={() => {
            signOut();
          }}
        >
          signout
        </button>
      </div>
    </div>
  );
}
