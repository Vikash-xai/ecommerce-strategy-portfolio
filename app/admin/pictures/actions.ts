"use server";

import { del, put } from "@vercel/blob";
import { ADMIN_EMAIL, auth } from "@/auth";
import { readJsonFile, writeJsonFile, type CommitResult } from "@/app/lib/githubData";
import type { Picture } from "@/app/pictures/picturesData";

const FILE_PATH = "app/pictures/pictures.json";
const MAX_SIZE = 8 * 1024 * 1024;

export type UploadResult =
  | { ok: true; picture: Picture }
  | { ok: false; error: string };

export async function uploadPicture(
  _prevState: UploadResult | null,
  formData: FormData
): Promise<UploadResult> {
  const session = await auth();
  if (session?.user?.email !== ADMIN_EMAIL) {
    return { ok: false, error: "Not authorized." };
  }

  const file = formData.get("photo");
  const captionRaw = formData.get("caption");
  const caption = typeof captionRaw === "string" ? captionRaw.trim() : "";

  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Choose an image to upload." };
  }
  if (!file.type.startsWith("image/")) {
    return { ok: false, error: "Only image files are allowed." };
  }
  if (file.size > MAX_SIZE) {
    return { ok: false, error: "Image must be under 8MB." };
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return { ok: false, error: "BLOB_READ_WRITE_TOKEN is not configured on the server." };
  }

  try {
    const blob = await put(`pictures/${file.name}`, file, {
      access: "public",
      token,
      addRandomSuffix: true,
    });

    const picture: Picture = { url: blob.url, caption, uploadedAt: new Date().toISOString() };
    const { data: current, sha } = await readJsonFile<Picture[]>(FILE_PATH, []);
    const next: Picture[] = [...current, picture];
    const result = await writeJsonFile(FILE_PATH, next, "Add picture via admin panel", sha);
    return result.ok ? { ok: true, picture } : result;
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Upload failed." };
  }
}

export async function deletePicture(url: string): Promise<CommitResult> {
  const session = await auth();
  if (session?.user?.email !== ADMIN_EMAIL) {
    return { ok: false, error: "Not authorized." };
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  try {
    if (token) {
      await del(url, { token });
    }
  } catch (err) {
    console.error("deletePicture: blob delete failed", err);
  }

  try {
    const { data: current, sha } = await readJsonFile<Picture[]>(FILE_PATH, []);
    const next = current.filter((p) => p.url !== url);
    return await writeJsonFile(FILE_PATH, next, "Remove picture via admin panel", sha);
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}
