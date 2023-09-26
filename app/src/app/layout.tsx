import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/heading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AWS Cross Account Access",
  description: "Connect your AWS account",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-100`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
