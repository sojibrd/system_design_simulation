"use client";

import React, { useState } from "react";
import { Link2, HelpCircle, X, Cpu } from "lucide-react";
import { Badge, Button, IconButton, Panel } from "@/app/components/ui";

const HELP_STEPS: { title: string; body: React.ReactNode }[] = [
  {
    title: "Phase নির্বাচন করুন",
    body: (
      <>
        উপরে তিনটি ফেজ আছে — <strong className="text-readout">Beginner</strong> (৩টি
        কম্পোনেন্ট), <strong className="text-readout">Intermediate</strong> (৭টি কম্পোনেন্ট),
        এবং <strong className="text-readout">Expert</strong> (১২টি কম্পোনেন্ট)।
      </>
    ),
  },
  {
    title: "Simulate বাটনে চাপ দিন",
    body: (
      <>
        নিচের <strong className="text-readout">▶ Simulate</strong> বাটনে ক্লিক করলে ডাটা
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
      <header className="w-full bg-panel border-b border-bezel-strong px-4 py-2 shrink-0 z-40">
        <div className="w-full flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-box border border-bezel-strong bg-well shadow-well flex items-center justify-center text-lamp">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm md:text-base font-bold text-readout tracking-tight">
                  System Design Simulator
                </h1>
                <Badge tone="accent">INTERACTIVE</Badge>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-readout-muted">
                Rack 01 / architecture walkthrough
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-box border border-bezel-strong bg-chassis text-xs text-readout font-medium">
              <Link2 className="w-3.5 h-3.5 text-lamp" />
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
        <div className="fixed inset-0 z-50 bg-chassis/80 flex items-center justify-center p-4">
          <Panel className="max-w-lg w-full p-5 md:p-6 shadow-raised">
            <div className="flex items-center justify-between pb-2 mb-4 border-b border-bezel-strong">
              <div className="min-w-0">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-readout-muted">
                  Operating the console
                </span>
                <h3 className="text-base font-bold text-readout">
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
                  <span className="shrink-0 w-6 h-6 rounded-tick border border-bezel-strong bg-well flex items-center justify-center font-mono text-[11px] font-bold text-readout">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-readout mb-0.5">{step.title}</p>
                    <p className="text-xs text-readout-soft leading-relaxed">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="pt-4 mt-4 border-t border-bezel flex justify-end">
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
