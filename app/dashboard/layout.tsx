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
        <DashboardNav />
        <main className="min-h-screen bg-base-300 pb-20 md:pb-0">
          <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-6">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
