import { createContext } from "react";

export const UserContext = createContext<object | null>(null);

export const BrandContext = createContext<{ brand: string; setBrand: (brand: string) => void } | null>(null);