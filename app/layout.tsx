import "./globals.css";
import { Inter } from "next/font/google";


export const metadata ={
  title: "WORTHIT - Subscription Reality Checker",
  description: "Track subscriptions, compare cost vs usage, and decide what's actually worth keeping.",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans cursor-pointer`}>{children}</body>
    </html>
  );
}
