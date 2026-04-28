import "./globals.css";
import { Inter } from "next/font/google";


export const metadata ={
  title: "WORTH'IT - Subscription Reality Checker",
  description: "Track subscriptions, compare cost vs usage, and decide what's actually worth keeping.",
  icons:{
    icon: "/favicon.ico",
    apple: "/icon-192.png"
  }
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${inter.variable} font-sans cursor-pointer`}>{children}</body>
    </html>
  );
}
