import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="grid items-center h-[80vh] justify-center">
      <div
        className="animate-bounce grid items-center gap-20"
        style={{ animationDuration: "6s" }}
      >
        <Image
          alt="social animals icon"
          src={"/images/social-animals.png"}
          width={200}
          height={200}
        />
      </div>
      <Button className="gap-3" asChild variant={"secondary"}>
        <Link href={"/dashboard"}>
          Dashboard
          <MoveRight />
        </Link>
      </Button>
    </main>
  );
}
