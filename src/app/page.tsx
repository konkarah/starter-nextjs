"use client"

import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { SessionProvider } from "next-auth/react";

// export const metadata: Metadata = {
//   title:
//     "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
//   description: "This is Next.js Home for TailAdmin Dashboard Template",
// };

export default function Home() {
  return (
    <>
    <SessionProvider>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </SessionProvider>
    </>
  );
}
