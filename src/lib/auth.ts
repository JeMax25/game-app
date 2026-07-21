import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db"; // your drizzle instance
import * as schema from "../db/auth-schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "sqlite",
        schema
    }),

     secret: process.env.BETTER_AUTH_SECRET,

     baseURL: process.env.BETTER_AUTH_URL,

       emailAndPassword: {
       enabled: true,
    },
});