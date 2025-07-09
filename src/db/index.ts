import { createClient } from "@supabase/supabase-js";
import type { Database } from "./supabase.types";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
	throw new Error(
		"Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables in .env",
	);
}

// Create a single supabase client for interacting with your database
export const db = createClient<Database>(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_ANON_KEY,
);
