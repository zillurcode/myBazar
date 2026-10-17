export const auth = betterAuth({
    database: mongodbAdapter(db, {
      client: mongoClient,
    }),
    baseURL: process.env.BETTER_AUTH_URL || "https://my-bazar-wrun.vercel.app",
    secret: process.env.BETTER_AUTH_SECRET,
    
    // এই লাইনটি যোগ করুন:
    trustedOrigins: [
      "http://localhost:3000",
      "https://my-bazar-wrun.vercel.app",
    ],
  
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
  });