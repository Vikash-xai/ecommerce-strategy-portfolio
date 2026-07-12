import type { Metadata } from "next";
import { ADMIN_EMAIL, auth, signIn, signOut } from "@/auth";
import {
  aboutMe,
  astrologicalDetails,
  familyDetails,
  personalDetails,
  professionalDetails,
} from "../../biodata/biodataData";
import EditBiodataForm from "./EditBiodataForm";

export const metadata: Metadata = {
  title: "Edit Biodata | Admin",
  robots: { index: false, follow: false },
};

export default async function AdminBiodataPage() {
  const session = await auth();

  if (!session) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold text-white">Sign in required</h1>
        <p className="text-sm text-slate-400">
          Sign in with the account authorized to edit this site.
        </p>
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/admin/biodata" });
          }}
        >
          <button
            type="submit"
            className="rounded-full bg-lime-400 px-5 py-2.5 text-sm font-semibold text-[#060d1f]"
          >
            Sign in with Google
          </button>
        </form>
      </div>
    );
  }

  if (session.user?.email !== ADMIN_EMAIL) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold text-white">Not authorized</h1>
        <p className="text-sm text-slate-400">
          Signed in as {session.user?.email}. This account doesn&apos;t have edit access.
        </p>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/admin/biodata" });
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

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Edit Biodata</h1>
          <p className="text-sm text-slate-400">Signed in as {session.user.email}</p>
        </div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/biodata" });
          }}
        >
          <button
            type="submit"
            className="rounded-full border border-white/15 px-4 py-2 text-sm text-slate-300 hover:text-white"
          >
            Sign out
          </button>
        </form>
      </div>

      <EditBiodataForm
        personalDetails={personalDetails}
        familyDetails={familyDetails}
        astrologicalDetails={astrologicalDetails}
        professionalDetails={professionalDetails}
        aboutMe={aboutMe}
      />
    </div>
  );
}
