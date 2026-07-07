"use client";

import { Mail } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/pictures", label: "Pictures" },
  { href: "/articles", label: "Articles" },
  { href: "/contents", label: "Contents" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#060d1f]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime-400 text-sm font-semibold text-[#060d1f]">
            VK
          </span>
          <span className="text-sm font-medium text-white">Vikash Kumar</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm sm:flex">
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

        <Link
          href="/#contact"
          className="flex items-center gap-2 rounded-full bg-lime-400 px-4 py-2 text-sm font-semibold text-[#060d1f] shadow-lg shadow-lime-400/20 transition-shadow hover:shadow-lime-400/40"
        >
          <Mail className="h-4 w-4" />
          <span className="hidden sm:inline">Get in touch</span>
        </Link>
      </div>
    </header>
  );
}
