"use client"
import Calendar from "@/components/Calender";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { SessionProvider } from "next-auth/react";

// export const metadata: Metadata = {
//   title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
// };

const CalendarPage = () => {
  return (
    <SessionProvider>
    <DefaultLayout>
      <Calendar />
    </DefaultLayout>
    </SessionProvider>
  );
};

export default CalendarPage;
