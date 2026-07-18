"use client";

import { useActionState } from "react";
import { login, type LoginResult } from "./actions";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginResult | null, FormData>(
    login,
    null
  );

  return (
    <form action={formAction} className="flex flex-col items-center gap-4">
      <input
        type="password"
        name="password"
        required
        autoFocus
        placeholder="Password"
        className="w-64 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-center text-white placeholder:text-slate-500 focus:border-lime-400/50 focus:outline-none"
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-lime-400 px-5 py-2.5 text-sm font-semibold text-[#060d1f] disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
      {state?.ok === false ? (
        <span className="text-sm text-red-400">{state.error}</span>
      ) : null}
    </form>
  );
}
