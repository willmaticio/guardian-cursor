import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import { AppProvider } from "../lib/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guardian — Continuous compliance with AI speed and human assurance.",
  description:
    "Hybrid AI + Human compliance platform for Finance, Law, Education, Accounting, and Healthcare.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-bg text-fg`}>
        <AppProvider>
          <div className="min-h-dvh flex pb-14 lg:pb-0">
            {/* Sidebar (desktop) */}
            <Sidebar />
            {/* Main content area */}
            <div className="flex-1 flex min-w-0 flex-col">
              <Topbar />
              <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">{children}</main>
            </div>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
