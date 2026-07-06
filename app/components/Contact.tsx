import { ArrowRight, Mail, Phone } from "lucide-react";
import { profile } from "../data";
import { LinkedinIcon } from "./icons";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-16">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-600/20 via-fuchsia-600/10 to-transparent p-10 text-center backdrop-blur-xl sm:p-16">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Let&apos;s build something great
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-zinc-300">
          Open to new opportunities in retail and e-commerce analytics. Reach
          out and let&apos;s talk about how data can drive your next win.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-fuchsia-500/20 transition-shadow hover:shadow-fuchsia-500/40"
          >
            <Mail className="h-4 w-4" />
            {profile.email}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-400">
          <a
            href={`tel:${profile.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-2 transition-colors hover:text-white"
          >
            <Phone className="h-4 w-4 text-zinc-500" />
            {profile.phone}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-white"
          >
            <LinkedinIcon className="h-4 w-4 text-zinc-500" />
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
