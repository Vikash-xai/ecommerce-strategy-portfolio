import { Mail } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-semibold text-white">
            VK
          </span>
          <span className="text-sm font-medium text-zinc-100">Vikash Kumar</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-zinc-400 sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-fuchsia-500/20 transition-shadow hover:shadow-fuchsia-500/40"
        >
          <Mail className="h-4 w-4" />
          <span className="hidden sm:inline">Get in touch</span>
        </a>
      </div>
    </header>
  );
}
