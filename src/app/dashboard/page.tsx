"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { FormEvent } from "react";

export default function Dashboard() {
  const { data: session } = useSession();
  if (!session || !session.user || !session.user.email) {
    redirect("/api/auth/signin");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.append("user", "65b2c603bfed17c98012bf4e");
    const response = await fetch("/api/posts", {
      method: "POST",
      body: formData,
    });
  }
  
  return (
    <>
      <div className="h-screen pt-10 px-20 bg-gray-700">
        <h1>This is DashBoard for {session.user.email}</h1>
        <div>
          <form onSubmit={onSubmit}>
            <input type="text" name="comment" />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
