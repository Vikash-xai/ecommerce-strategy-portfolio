"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="print:hidden mx-auto flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-white/30 hover:text-white"
    >
      <Printer className="h-4 w-4" />
      Save / Print
    </button>
  );
}
