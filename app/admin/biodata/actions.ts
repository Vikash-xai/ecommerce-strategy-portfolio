"use server";

import { AuthError } from "next-auth";
import { ADMIN_EMAIL, auth, signIn } from "@/auth";
import {
  astrologicalDetails as currentAstrologicalDetails,
  familyDetails as currentFamilyDetails,
  personalDetails as currentPersonalDetails,
  professionalDetails as currentProfessionalDetails,
  type Field,
} from "@/app/biodata/biodataData";

const OWNER = "Vikash-xai";
const REPO = "ecommerce-strategy-portfolio";
const BRANCH = "master";
const FILE_PATH = "app/biodata/biodataData.ts";

export type SaveResult = { ok: true } | { ok: false; error: string };
export type LoginResult = { ok: true } | { ok: false; error: string };

export async function login(
  _prevState: LoginResult | null,
  formData: FormData
): Promise<LoginResult> {
  const password = formData.get("password");
  try {
    await signIn("credentials", {
      password: typeof password === "string" ? password : "",
      redirectTo: "/admin/biodata",
    });
    return { ok: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { ok: false, error: "Incorrect password." };
    }
    throw error;
  }
}

function fieldsFromForm(formData: FormData, prefix: string, schema: Field[]): Field[] {
  return schema.map((f) => {
    const raw = formData.get(`${prefix}__${f.label}`);
    const value = typeof raw === "string" ? raw.trim() : "";
    return { label: f.label, value: value === "" ? null : value };
  });
}

function serializeFields(fields: Field[]): string {
  return fields
    .map(
      (f) =>
        `  { label: ${JSON.stringify(f.label)}, value: ${
          f.value === null ? "null" : JSON.stringify(f.value)
        } },`
    )
    .join("\n");
}

function renderFile(data: {
  personalDetails: Field[];
  familyDetails: Field[];
  astrologicalDetails: Field[];
  professionalDetails: Field[];
  aboutMe: string;
}): string {
  return `export type Field = { label: string; value: string | null };

export const personalDetails: Field[] = [
${serializeFields(data.personalDetails)}
];

export const familyDetails: Field[] = [
${serializeFields(data.familyDetails)}
];

export const astrologicalDetails: Field[] = [
${serializeFields(data.astrologicalDetails)}
];

export const professionalDetails: Field[] = [
${serializeFields(data.professionalDetails)}
];

export const aboutMe = ${JSON.stringify(data.aboutMe)};
`;
}

export async function saveBiodata(
  _prevState: SaveResult | null,
  formData: FormData
): Promise<SaveResult> {
  const session = await auth();
  if (session?.user?.email !== ADMIN_EMAIL) {
    return { ok: false, error: "Not authorized." };
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return { ok: false, error: "GITHUB_TOKEN is not configured on the server." };
  }

  const aboutMeRaw = formData.get("aboutMe");
  const aboutMe = typeof aboutMeRaw === "string" ? aboutMeRaw.trim() : "";

  const fileContent = renderFile({
    personalDetails: fieldsFromForm(formData, "personal", currentPersonalDetails),
    familyDetails: fieldsFromForm(formData, "family", currentFamilyDetails),
    astrologicalDetails: fieldsFromForm(formData, "astro", currentAstrologicalDetails),
    professionalDetails: fieldsFromForm(formData, "professional", currentProfessionalDetails),
    aboutMe,
  });

  const apiBase = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  try {
    const currentRes = await fetch(`${apiBase}?ref=${BRANCH}`, {
      headers,
      cache: "no-store",
    });
    if (!currentRes.ok) {
      return { ok: false, error: `Could not read current file (${currentRes.status}).` };
    }
    const current = (await currentRes.json()) as { sha: string };

    const putRes = await fetch(apiBase, {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Update biodata via admin panel",
        content: Buffer.from(fileContent, "utf-8").toString("base64"),
        sha: current.sha,
        branch: BRANCH,
      }),
    });

    if (!putRes.ok) {
      const errText = await putRes.text();
      return { ok: false, error: `GitHub commit failed (${putRes.status}): ${errText}` };
    }

    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}
