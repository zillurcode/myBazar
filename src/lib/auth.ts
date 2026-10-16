import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const uri = process.env.MONGODB_URL || process.env.MONGODB_URI || "";

const client = uri ? new MongoClient(uri) : ({} as MongoClient);
const db = uri ? client.db("my-bazar") : ({} as any);

// Automatically detect Vercel production URL if BETTER_AUTH_URL is missing
const getBaseURL = () => {
  if (process.env.BETTER_AUTH_URL) return process.env.BETTER_AUTH_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://my-bazar-wrun.vercel.app";
};

export const auth = betterAuth({
  database: uri ? mongodbAdapter(db, { client }) : ({} as any),
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
  },
  secret: process.env.BETTER_AUTH_SECRET || "dummy-secret-for-build",
  baseURL: getBaseURL(),
});