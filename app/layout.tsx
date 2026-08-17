import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="dark h-full">
      <body className="h-full bg-zinc-950 text-zinc-100">{children}</body>
    </html>
  );
}

