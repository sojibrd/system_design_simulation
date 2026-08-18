import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Archivo: a grotesk with the squared-off terminals of engineering lettering.
// JetBrains Mono: every label, spec and payload on a drafting sheet is mono.
const sans = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "System Design Simulator — Interactive URL Shortener",
  description:
    "Interactive architecture simulation and visual walkthrough of URL Shortener across Beginner, Intermediate, and Expert tiers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} h-full`}>
      <body className="h-full bg-paper text-ink-soft font-sans">{children}</body>
    </html>
  );
}
