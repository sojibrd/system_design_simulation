import type { Metadata } from "next";
import {
  Archivo,
  Archivo_Black,
  Barlow_Semi_Condensed,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

/**
 * The font shelf. Four families are declared once, each on its own variable;
 * a theme picks which role gets which family via `--t-font-sans` / `--t-font-mono`.
 *
 * Declaring them costs nothing at runtime — next/font self-hosts and preloads
 * only what the active theme actually renders with. Adding a family that no
 * theme uses yet is the ONLY reason to edit this file.
 */
const grotesk = Archivo({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const display = Archivo_Black({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const condensed = Barlow_Semi_Condensed({
  variable: "--font-condensed",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-family",
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
    <html
      lang="en"
      className={`${grotesk.variable} ${display.variable} ${condensed.variable} ${mono.variable} h-full`}
    >
      <body className="h-full surface-app">{children}</body>
    </html>
  );
}
