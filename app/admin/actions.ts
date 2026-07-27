"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export type LoginResult = { ok: true } | { ok: false; error: string };

export async function login(
  _prevState: LoginResult | null,
  formData: FormData
): Promise<LoginResult> {
  const password = formData.get("password");
  const redirectTo = formData.get("redirectTo");
  try {
    await signIn("credentials", {
      password: typeof password === "string" ? password : "",
      redirectTo: typeof redirectTo === "string" ? redirectTo : "/",
    });
    return { ok: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { ok: false, error: "Incorrect password." };
    }
    throw error;
  }
}
