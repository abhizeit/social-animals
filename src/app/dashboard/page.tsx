import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession();
  if (!session || !session.user || !session.user.email) {
    redirect("/api/auth/signin");
  }
  return (
    <>
      <h1>This is DashBoard for {session.user.email}</h1>
    </>
  );
}
