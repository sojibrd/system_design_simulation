import type { Metadata } from "next";
import { Barlow, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Barlow: the slightly condensed, industrial grotesk of equipment labelling.
// JetBrains Mono: every engraved label, spec and readout on the panel is mono.
const sans = Barlow({
  variable: "--font-barlow",
  weight: ["400", "500", "600", "700"],
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
      <body className="h-full bg-chassis text-readout-soft font-sans">{children}</body>
    </html>
  );
}
