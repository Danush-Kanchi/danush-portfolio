import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AnimatedBackground from "@/components/AnimatedBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Danush Kanchi | SRE & DevOps Engineer",
  description: "Futuristic portfolio for Danush Kanchi",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-950 text-slate-200 antialiased selection:bg-cyan-500/30`}>
        <AnimatedBackground />
        {children}
      </body>
    </html>
  );
}