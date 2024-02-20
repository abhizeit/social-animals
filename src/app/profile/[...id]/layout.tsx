import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-[80vh] flex max-h-screen  items-center justify-center">
      {children}
    </div>
  );
}
