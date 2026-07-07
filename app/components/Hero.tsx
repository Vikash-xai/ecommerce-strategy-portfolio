import { ArrowRight, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { profile } from "../data";
import { LinkedinIcon } from "./icons";

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pt-20 pb-16 sm:pt-28">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-slate-300">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-400" />
        </span>
        Open to new opportunities
      </div>

      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
        Hi, I&apos;m{" "}
        <span className="bg-gradient-to-r from-white via-white to-lime-300 bg-clip-text text-transparent">
          {profile.name}
        </span>
      </h1>

      <p className="mt-4 max-w-xl text-lg font-medium text-slate-200 sm:text-xl">
        {profile.title}
      </p>

      <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400">
        {profile.summary}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="#contact"
          className="flex items-center gap-2 rounded-full bg-lime-400 px-5 py-3 text-sm font-semibold text-[#060d1f] shadow-lg shadow-lime-400/20 transition-shadow hover:shadow-lime-400/40"
        >
          Get in touch
          <ArrowRight className="h-4 w-4" />
        </a>
        <Link
          href="/contents"
          className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-slate-200 transition-colors hover:bg-white/5"
        >
          View experience
        </Link>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-400">
        <span className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-slate-500" />
          {profile.location}
        </span>
        <a
          href={`mailto:${profile.email}`}
          className="flex items-center gap-2 transition-colors hover:text-white"
        >
          <Mail className="h-4 w-4 text-slate-500" />
          {profile.email}
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 transition-colors hover:text-white"
        >
          <LinkedinIcon className="h-4 w-4 text-slate-500" />
          LinkedIn
        </a>
      </div>
    </section>
  );
}
