import { PostgrestError } from "@supabase/supabase-js";
import supabase from "./supabase";

// Storage - Get all files in a bucket
export const getFiles = async (): Promise<string[]> => {
	const { data } = await supabase.storage.from("files").list("document", {
		limit: 100,
		offset: 0,
		sortBy: { column: "name", order: "asc" },
	});

	return data ? data.map((item) => item.name) : ["No Results"];
};

// Storage - Generate download link of a file
export const getDownloadLink = async (fileName: string): Promise<string> => {
	const { data } = supabase.storage
		.from("files")
		.getPublicUrl(`document/${fileName}`, {
			download: true,
		});
	return data ? data.publicUrl : "http://localhost:5173/not-found";
};

// Database - Get one user by email
export const getUser = async (userEmail: string): Promise<object[] | null> => {
	const { data } = await supabase
		.from("users")
		.select("*")
		.eq("email", userEmail);
	return data;
};

// Database - Get all users
export const getAllUsers = async (): Promise<object[] | null> => {
	const { data: users, error } = await supabase.from("users").select("*");
	if (error) return null;
	return users;
};

// Database - Create a new user
export const createUser = async (
	email: string,
	username: string,
	role_id: number,
	group_id?: number
): Promise<void> => {
	await supabase.from("users").insert({ email, username, group_id, role_id });
};

// Database - Update user data
export const updateUser = async (
	userId: number,
	columnName: string,
	newValue: string
): Promise<void> => {
	await supabase
		.from("users")
		.update({ [columnName]: newValue })
		.eq("id", userId);
};

// Database - Delete an existing user by email
export const deleteUser = async (
	email: string
): Promise<void | PostgrestError> => {
	const { error } = await supabase.from("users").delete().eq("email", email);
	if (error) return error;
};
