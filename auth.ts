import { createHash, timingSafeEqual } from "crypto";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const ADMIN_EMAIL = "kvikash0882@gmail.com";

function safeCompare(a: string, b: string): boolean {
  const ah = createHash("sha256").update(a).digest();
  const bh = createHash("sha256").update(b).digest();
  return timingSafeEqual(ah, bh);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const adminPassword = process.env.ADMIN_PASSWORD;
        const password = credentials?.password;
        if (
          !adminPassword ||
          typeof password !== "string" ||
          !safeCompare(password, adminPassword)
        ) {
          return null;
        }
        return { id: "admin", email: ADMIN_EMAIL, name: "Admin" };
      },
    }),
  ],
  callbacks: {
    signIn: ({ user }) => user.email === ADMIN_EMAIL,
  },
});
