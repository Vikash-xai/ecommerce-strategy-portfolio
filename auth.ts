import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const ADMIN_EMAIL = "kvikash0882@gmail.com";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    signIn: ({ user }) => user.email === ADMIN_EMAIL,
  },
});
