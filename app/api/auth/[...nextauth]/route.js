import User from "@/model/userModel";
import NextAuth from "next-auth/next";
import connectDB from "@/utils/db";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

connectDB();

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@gmail.com", required: true }, 
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        console.log(credentials);

        const user = await signInWithCredentials({ email, password });
        return user;

      }
    }),
  ],
  pages: {
    signIn: "/auth/signin/",
    error: "/errors/",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account.type === "oauth") {
        await signInWithOauth({ account, profile });
        return true;
      } else if (account.type === "credentials") {
        return true;
      }
    },
    async jwt({ token, trigger, session }) {
      if (trigger === "update") {
        token.user.name = session.name;
        token.user.image = session.image;
      } else {
        const user = await getUserByEmail({ email: token.email });
        token.user = user;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

async function signInWithOauth({ account, profile }) {
  const user = await User.findOne({ email: profile.email });
  if (user) return true;

  const newUser = new User({
    name: profile.name,
    email: profile.email,
    image: profile.picture,
    provider: account.provider,
  });

  await newUser.save();

  return true;
}

async function getUserByEmail({ email }) {
  const user = await User.findOne({ email: email }).select("-password");
  if (!user) throw new Error("User not found");
  return { ...user._doc, id: user._id.toString() };
}

async function signInWithCredentials({email, password}){
  const user = await User.findOne({email});
  if(!user) throw new Error('User not found');
  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch);
  if(!isMatch) throw new Error('Password not match');
  return { ...user._doc, id: user._id.toString()} 
}
