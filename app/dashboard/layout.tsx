import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import DashboardNav from "@/app/dashboard/_components/DashboardNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your accounts and settings",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-base-300 flex flex-col md:flex-row">
          <DashboardNav />
          <main className="flex-1 w-full md:overflow-y-auto">
            <div className="p-4">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
