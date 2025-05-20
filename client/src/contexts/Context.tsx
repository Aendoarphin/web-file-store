import { User } from "@supabase/supabase-js";
import { createContext } from "react";

export const UserContext = createContext<User | null>(null);

export const BrandContext = createContext<{
  brand: string;
  setBrand: (brand: string) => void;
} | null>(null);
