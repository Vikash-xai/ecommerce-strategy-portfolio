import type { Metadata } from "next";
import { auth, signOut } from "@/auth";
import AdminGate from "../AdminGate";
import { pictures } from "../../pictures/picturesData";
import PicturesManager from "./PicturesManager";

export const metadata: Metadata = {
  title: "Edit Pictures | Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPicturesPage() {
  const session = await auth();

  return (
    <AdminGate redirectTo="/admin/pictures">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">Edit Pictures</h1>
            <p className="text-sm text-slate-400">Signed in as {session?.user?.email}</p>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/pictures" });
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

        <PicturesManager initialPictures={pictures} />
      </div>
    </AdminGate>
  );
}
