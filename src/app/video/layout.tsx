"use client";
import { ReactNode, useEffect } from "react";

export default function VideoLayout({ children }: { children: ReactNode }) {
  useEffect(() => {}, []);
  return <div className="p-10 md:p-20">{children}</div>;
}
