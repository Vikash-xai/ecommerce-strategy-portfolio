import type { ReactNode } from "react";
import { ADMIN_EMAIL, auth, signOut } from "@/auth";
import LoginForm from "./LoginForm";

export default async function AdminGate({
  redirectTo,
  children,
}: {
  redirectTo: string;
  children: ReactNode;
}) {
  const session = await auth();

  if (!session) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold text-white">Sign in required</h1>
        <p className="text-sm text-slate-400">
          Enter the password to edit this site.
        </p>
        <LoginForm redirectTo={redirectTo} />
      </div>
    );
  }

  if (session.user?.email !== ADMIN_EMAIL) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold text-white">Not authorized</h1>
        <p className="text-sm text-slate-400">
          Signed in as {session.user?.email}. This account doesn&apos;t have edit
          access.
        </p>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo });
          }}
        >
          <button
            type="submit"
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-slate-300 hover:text-white"
          >
            Sign out
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}
