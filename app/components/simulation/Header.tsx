"use client";

import React from "react";
import { Link2, Cpu } from "lucide-react";
import { Badge } from "@/app/components/ui";

export const Header: React.FC = () => {
  return (
    /* The rack header plate: ident on the left, the unit under test on the right. */
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
            <p className="t-label">Rack 01 / architecture walkthrough</p>
          </div>
        </div>

        <div className="chip hidden sm:flex px-2.5 py-1 text-xs">
          <Link2 className="w-3.5 h-3.5 t-accent" />
          <span>URL Shortener</span>
        </div>
      </div>
    </header>
  );
};
