import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from './schema';  // Ensure your schema file is correctly set up

// Check if the environment variable is defined
const dbUrl = process.env.NEXT_PUBLIC_DATABASE_URL;
if (!dbUrl) {
    throw new Error("NEXT_PUBLIC_DATABASE_URL is not defined in .env file");
}

// Initialize the Neon database connection
const sql = neon(dbUrl);

// Create and export the Drizzle ORM instance
export const db = drizzle(sql, { schema });
