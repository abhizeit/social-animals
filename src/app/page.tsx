import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="grid items-center h-[80vh] justify-center">
      <div
        className="animate-bounce grid items-center gap-20"
        style={{ animationDuration: "6s", justifyContent: "center" }}
      >
        <Image
          alt="social animals icon"
          src={"/images/social-animals.png"}
          width={200}
          height={200}
        />
      </div>

      <div className="flex flex-row gap-5 justify-center items-center">
        <Button className="gap-3" asChild variant={"secondary"}>
          <Link href={"/dashboard"}>
            Dashboard
            <MoveRight />
          </Link>
        </Button>
        <Button className="gap-3" asChild variant={"secondary"}>
          <Link href={"/chat"}>
            Chat Room
            <MoveRight />
          </Link>
        </Button>
      </div>
    </main>
  );
}
