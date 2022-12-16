"use client";

import { SessionProvider } from "next-auth/react";
export function Providers({ children }: any) {
  return <SessionProvider>{children}</SessionProvider>;
}
