"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export default function FormSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type="submit"
      variant={"secondary"}
      className="w-full"
    >
      {pending ? "submitting" : "add comment"}
    </Button>
  );
}
