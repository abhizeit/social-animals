import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Page({ params }: { params: { id: string } }) {
  async function addComment(formData: FormData) {
    "use server";
    await db.comment.create({
      data: {
        comment: formData.get("comment") as string,
        postedOn: new Date(),
        user: {
          connect: {
            id: `${params.id}`,
          },
        },
      },
    });
    revalidatePath("/profile");
  }

  return (
    <form action={addComment}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Input name="comment" className="col-span-3" />
        </div>
      </div>

      <Button type="submit" variant={"secondary"}>
        Post Comment
      </Button>
    </form>
  );
}
