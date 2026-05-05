import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Toast from "@/components/Toast";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Premium Cold-Pressed Strawberry Juice",
  description: "Pure Fresh Premium",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden no-scrollbar">
        <Navbar />
        {children}
        <Toast />
      </body>
    </html>
  );
}
