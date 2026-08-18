"use client";

import React, { useState } from "react";
import { Link2, HelpCircle, X, Cpu } from "lucide-react";
import { Badge, Button, IconButton, Panel } from "@/app/components/ui";

const HELP_STEPS: { title: string; body: React.ReactNode }[] = [
  {
    title: "Phase নির্বাচন করুন",
    body: (
      <>
        উপরে তিনটি ফেজ আছে — <strong className="t-strong">Beginner</strong> (৩টি
        কম্পোনেন্ট), <strong className="t-strong">Intermediate</strong> (৭টি কম্পোনেন্ট),
        এবং <strong className="t-strong">Expert</strong> (১২টি কম্পোনেন্ট)।
      </>
    ),
  },
  {
    title: "Simulate বাটনে চাপ দিন",
    body: (
      <>
        নিচের <strong className="t-strong">▶ Simulate</strong> বাটনে ক্লিক করলে ডাটা
        কীভাবে একটি সার্ভার থেকে অন্যটিতে যায় তা অ্যানিমেশন আকারে দেখতে পাবেন।
      </>
    ),
  },
  {
    title: "সহজ ভাষায় বুঝে নিন",
    body: (
      <>
        ডানদিকের প্যানেলে প্রতি ধাপে সহজ বাস্তব উপমা সহ ব্যাখ্যা দেওয়া আছে যাতে ১৩
        বছরের বাচ্চাও সহজে বুঝতে পারে।
      </>
    ),
  },
  {
    title: "কম্পোনেন্টে ক্লিক করুন",
    body: (
      <>
        আর্কিটেকচারের যেকোনো বক্সের ⓘ আইকনে ক্লিক করলে সেটির কাজ ও সহজ উপমা নোট
        আকারে ভেসে উঠবে।
      </>
    ),
  },
];

export const Header: React.FC = () => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      {/* The rack header plate: ident on the left, the unit under test on the right. */}
      <header className="surface-panel w-full seam-b-heavy px-4 py-2 shrink-0 z-40">
        <div className="w-full flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="surface-well t-accent w-8 h-8 flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="t-title text-sm md:text-base">
                  System Design Simulator
                </h1>
                <Badge tone="accent">INTERACTIVE</Badge>
              </div>
              <p className="t-label">
                Rack 01 / architecture walkthrough
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="chip hidden sm:flex px-2.5 py-1 text-xs">
              <Link2 className="w-3.5 h-3.5 t-accent" />
              <span>URL Shortener (লিংক শর্টনার)</span>
            </div>

            <IconButton
              onClick={() => setShowHelp(true)}
              title="কীভাবে ব্যবহার করবেন?"
              aria-label="Help"
            >
              <HelpCircle className="w-4 h-4" />
            </IconButton>
          </div>
        </div>
      </header>

      {showHelp && (
        <div className="overlay fixed inset-0 z-50 flex items-center justify-center p-4">
          <Panel className="max-w-lg w-full p-5 md:p-6">
            <div className="flex items-center justify-between pb-2 mb-4 seam-b-heavy">
              <div className="min-w-0">
                <span className="t-label">
                  Operating the console
                </span>
                <h3 className="t-title text-base">
                  কীভাবে এই সিমুলেটর ব্যবহার করবেন?
                </h3>
              </div>
              <IconButton variant="ghost" onClick={() => setShowHelp(false)} aria-label="Close">
                <X className="w-5 h-5" />
              </IconButton>
            </div>

            <ol className="space-y-3">
              {HELP_STEPS.map((step, i) => (
                <li key={step.title} className="flex items-start gap-3">
                  <span className="surface-well t-mono t-strong shrink-0 w-6 h-6 flex items-center justify-center text-[11px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="t-title text-xs mb-0.5">{step.title}</p>
                    <p className="t-body text-xs">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="pt-4 mt-4 seam-t flex justify-end">
              <Button variant="primary" onClick={() => setShowHelp(false)}>
                বুঝেছি, শুরু করি
              </Button>
            </div>
          </Panel>
        </div>
      )}
    </>
  );
};
