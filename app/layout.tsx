import React from 'react';
import type { Metadata } from "next";
import { AppProvider } from "@/lib/context";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "MedCare Connect",
  description: "A comprehensive medical appointment booking system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
        <footer className="fixed bottom-0 w-full text-center py-2 text-[10px] text-slate-400 pointer-events-none bg-gradient-to-t from-white via-white to-transparent z-50">
          created by nidhi and kashish
        </footer>
      </body>
    </html>
  );
}