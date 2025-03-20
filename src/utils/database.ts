import supabase from "./supabase";

// Get one user record
export const getUser = async () => {
  const { data } = await supabase.from("users").select("*").eq("email", "");
  return data;
}