import type { Database } from "./db/supabase.types";

export type Task = Database["public"]["Tables"]["tasks"]["Row"];
