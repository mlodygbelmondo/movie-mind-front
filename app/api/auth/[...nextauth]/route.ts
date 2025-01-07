import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        id: { label: "ID", type: "text" },
        accessToken: { label: "Access Token", type: "text" },
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      name: "Credentials",
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }

        const user = {
          ...credentials,
        };

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt", // Enable JWT sessions
  },
  jwt: {
    secret: process.env.JWT_SECRET, // Use an environment variable for security
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && token.id) {
        session.user.accessToken = token.accessToken as string;
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
