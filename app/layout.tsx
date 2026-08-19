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
  // Levels are PROMISES the architecture keeps (functional -> scalable ->
  // reliable), not difficulty ratings — see `LevelId` in lib/types.ts. The
  // old "Beginner / Intermediate / Expert" wording said the opposite.
  description:
    "URL Shortener-এর আর্কিটেকচার ধাপে ধাপে অ্যানিমেটেড ডায়াগ্রামে — functional, scalable ও reliable, প্রতিটি স্তরের ব্যাখ্যা বাংলায়।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /* Every explanation on this page is Bangla; only the terminology and the
       UI chrome are English. Declaring `en` had screen readers pronouncing the
       whole walkthrough with an English voice — unintelligible. Individual
       English strings carry their own `lang`. */
    <html
      lang="bn"
      className={`${grotesk.variable} ${display.variable} ${condensed.variable} ${mono.variable} h-full`}
    >
      <body className="h-full surface-app">{children}</body>
    </html>
  );
}
