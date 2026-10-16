import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URL || process.env.MONGODB_URI || "";

const client = uri ? new MongoClient(uri) : ({} as MongoClient);
const db = uri ? client.db("my-bazar") : ({} as any);

export const auth = betterAuth({
  database: uri ? mongodbAdapter(db, { client }) : ({} as any),
  // 
  baseURL: "https://my-bazar-wrun.vercel.app",
});