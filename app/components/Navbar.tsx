"use client";

import { Mail, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/pictures", label: "Pictures" },
  { href: "/articles", label: "Articles" },
  { href: "/contents", label: "Contents" },
  { href: "/visualizer", label: "Visualizer" },
  { href: "/biodata", label: "Biodata" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="print:hidden sticky top-0 z-50 border-b border-white/10 bg-[#060d1f]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime-400 text-sm font-semibold text-[#060d1f]">
            VK
          </span>
          <span className="text-sm font-medium text-white">Vikash Kumar</span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm lg:flex">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 transition-colors ${
                  isActive
                    ? "text-lime-300"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {link.label}
                {isActive ? (
                  <span className="absolute -bottom-[17px] left-0 h-[2px] w-full bg-lime-400" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-full bg-lime-400 px-4 py-2 text-sm font-semibold text-[#060d1f] shadow-lg shadow-lime-400/20 transition-shadow hover:shadow-lime-400/40"
          >
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Get in touch</span>
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-colors hover:text-white lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out lg:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 border-t border-white/10 px-6 py-4 text-sm">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2 transition-colors ${
                  isActive
                    ? "bg-lime-400/10 text-lime-300"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
