import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const uri = process.env.MONGODB_URL || process.env.MONGODB_URI || "";


const client = uri ? new MongoClient(uri) : ({} as MongoClient);
const db = uri ? client.db("my-bazar") : ({} as any);

export const auth = betterAuth({
  database: uri ? mongodbAdapter(db) : undefined,
  
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
});