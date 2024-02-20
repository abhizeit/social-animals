import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="px-10 md:px-20">{children}</div>;
}
