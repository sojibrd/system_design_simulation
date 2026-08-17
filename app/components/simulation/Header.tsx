"use client";

import React, { useState } from "react";
import { Link2, HelpCircle, X, Sparkles, Zap } from "lucide-react";

export const Header: React.FC = () => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      <header className="w-full bg-zinc-950/90 border-b border-zinc-800/80 backdrop-blur-md px-4 py-3 sticky top-0 z-40">
        <div className="w-full flex items-center justify-between gap-3">
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-zinc-950 font-black shadow-md shadow-cyan-500/20">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm md:text-base font-extrabold text-zinc-100 tracking-tight">
                  System Design Simulator
                </h1>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
                  Interactive
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 hidden sm:block">
                ইন্টারেক্টিভ আর্কিটেকচার সিমুলেশন ও স্টেপ-বাই-স্টেপ ভিজ্যুয়ালাইজার
              </p>
            </div>
          </div>

          {/* Current Problem & Info Button */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-semibold shadow-inner">
              <Link2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>URL Shortener (লিংক শর্টনার)</span>
            </div>

            <button
              onClick={() => setShowHelp(true)}
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 border border-zinc-800 transition-colors"
              title="কীভাবে ব্যবহার করবেন?"
              aria-label="Help"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Help / Guide Modal */}
      {showHelp && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-lg w-full p-5 md:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-zinc-100">
                  কীভাবে এই সিমুলেটর ব্যবহার করবেন?
                </h3>
              </div>
              <button
                onClick={() => setShowHelp(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs md:text-sm text-zinc-300 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                  ১
                </div>
                <p>
                  <strong>Phase নির্বাচন করুন:</strong> উপরে তিনটি ফেজ আছে —{" "}
                  <span className="text-cyan-300">Beginner</span> (৩টি কম্পোনেন্ট),{" "}
                  <span className="text-cyan-300">Intermediate</span> (৭টি কম্পোনেন্ট), এবং{" "}
                  <span className="text-cyan-300">Expert</span> (১২টি কম্পোনেন্ট)।
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                  ২
                </div>
                <p>
                  <strong>Simulate বাটনে চাপ দিন:</strong> নীল রঙের ▶{" "}
                  <strong>Simulate</strong> বাটনে ক্লিক করলে ডাটা কীভাবে একটি সার্ভার থেকে
                  অন্যটিতে যায় তা অ্যানিমেশন আকারে দেখতে পাবেন।
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                  ৩
                </div>
                <p>
                  <strong>সহজ ভাষায় বুঝে নিন:</strong> ডানদিকের প্যানেলে প্রতি ধাপে সহজ বাস্তব
                  উপমা সহ ব্যাখ্যা দেওয়া আছে যাতে ১৩ বছরের বাচ্চাও সহজে বুঝতে পারে!
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                  ৪
                </div>
                <p>
                  <strong>কম্পোনেন্টে ক্লিক বা হোভার করুন:</strong> আর্কিটেকচারের যেকোনো
                  বক্সে ক্লিক করলে সেটির কাজ ও সহজ উপমা পপআপে ভেসে উঠবে।
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800 flex justify-end">
              <button
                onClick={() => setShowHelp(false)}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs shadow-md transition-colors"
              >
                বুঝেছি, শুরু করি! 🚀
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
