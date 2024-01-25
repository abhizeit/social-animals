import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession();
  if (!session || !session.user || !session.user.email) {
    redirect("/api/auth/signin");
  }
  return (
    <>
      <div className="h-screen pt-10 px-20 bg-gray-700">
        <h1>This is DashBoard for {session.user.email}</h1>
      </div>
    </>
  );
}
