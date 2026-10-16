import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const uri = process.env.MONGODB_URL || process.env.MONGODB_URI || "";

// Safe client initialization that won't crash the build if env vars aren't read yet
const client = uri ? new MongoClient(uri) : ({} as MongoClient);
const db = uri ? client.db("my-bazar") : ({} as any);

export const auth = betterAuth({
  // Pass { client } here because MongoDB Atlas requires a replica set adapter configuration
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
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
});