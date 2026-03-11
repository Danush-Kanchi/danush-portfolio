import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AnimatedBackground from "@/components/AnimatedBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Danush Kanchi | SRE & DevOps Engineer",
  description: "Portfolio of Danush Kanchi, SRE/DevOps Engineer specializing in AWS, Terraform, CI/CD, and observability.",
  openGraph: {
    title: "Danush Kanchi | SRE & DevOps Engineer",
    description: "Portfolio of Danush Kanchi, SRE/DevOps Engineer specializing in AWS, Terraform, CI/CD, and observability.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Danush Kanchi | SRE & DevOps Engineer",
    description: "Portfolio of Danush Kanchi, SRE/DevOps Engineer specializing in AWS, Terraform, CI/CD, and observability.",
  },
  other: {
    google: "notranslate",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className="scroll-smooth" translate="no">
      <head>
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="google" content="notranslate" />
        <meta name="googlebot" content="notranslate" />
      </head>
      <body className={`${inter.className} notranslate bg-slate-950 text-slate-200 antialiased selection:bg-cyan-500/30`}>
        <AnimatedBackground />
        {children}
      </body>
    </html>
  );
}