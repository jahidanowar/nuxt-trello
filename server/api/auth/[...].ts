import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "~/server/models/User";

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    // @ts-expect-error
    CredentialsProvider.default({
      name: "credentials",
      origin: process.env.AUTH_ORIGIN,
      async authorize(credential: { email: string; password: string }) {
        // Authorize the user

        const user = await User.findOne({ email: credential.email });

        if (!user) {
          return null;
        }

        const isValid = await user.comparePassword(credential.password);

        if (!isValid) {
          return null;
        }

        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          ...user,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...token,
        ...session.user,
      };

      return session;
    },
  },
});
