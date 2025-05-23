import { PostgrestError } from "@supabase/supabase-js";
import supabase from "./supabase";
import { FileObject } from "@supabase/storage-js";
import axios from "axios";

// Storage - Upload a file to a bucket
export const uploadFile = async (file: File) => {
	const { error } = await supabase.storage
		.from("files")
		.upload(`document/${encodeURIComponent(file.name)}`, file!);
	if (error) {
		console.error("Error uploading file:", error);
		return error;
	}
};

// Storage - Upload multiple files to a bucket
export const uploadMultipleFiles = async (files: File[]) => {
	for (const file of files) {
		const { error } = await supabase.storage
			.from("files")
			.upload(`document/${encodeURIComponent(file.name)}`, file!);
		if (error) {
			console.error("Error uploading file:", error);
			return error;
		}
	}
};

// Storage - Delete a file from a bucket
export const deleteFile = async (fileName: string) => {
	const { error } = await supabase.storage
		.from("files")
		.remove([`document/${fileName}`]);
	if (error) {
		console.error("Error deleting file:", error);
	}
};

// Storage - Get all files in a bucket
export const getFiles = async (): Promise<FileObject[]> => {
	const { data, error } = await supabase.storage.from("files").list("document");
	if (error) return [];
	return data;
};

// Storage - Get all file names in a bucket
export const getFileNames = async (): Promise<string[]> => {
	const { data } = await supabase.storage.from("files").list("document", {
		limit: 100,
		offset: 0,
		sortBy: { column: "name", order: "asc" },
	});

	return data ? data.map((item) => item.name) : ["No Results"];
};

// Storage - Generate download link of a file
export const getFileDownloadLink = async (
	fileName: string
): Promise<string> => {
	const { data } = supabase.storage
		.from("files")
		.getPublicUrl(`document/${fileName}`, {
			download: true,
		});
	return data ? data.publicUrl : "http://localhost:5173/not-found";
};

// Database - Get one row
export const getRecord = async (
	table: string,
	column: string,
	value: string
): Promise<object[] | null> => {
	const { data } = await supabase.from(table).select("*").eq(column, value);
	return data;
};

// Database - Get all rows
export const getAllRecords = async (
	table: string,
	column: string
): Promise<object[] | null> => {
	const { data: records, error } = await supabase.from(table).select(column);
	if (error) return null;
	return records;
};

// Database - Create a new record
export const createRecord = async (
	table: string,
	attributes: object
): Promise<void> => {
	await supabase.from(table).insert(attributes);
};

// Database - Update records data
export const updateRecord = async (
	table: string,
	recordId: number,
	columnName: string,
	newValue: string
): Promise<void> => {
	await supabase
		.from(table)
		.update({ [columnName]: newValue })
		.eq("id", recordId);
};

// Database - Delete an existing record by attribute
export const deleteRecord = async (
	table: string,
	attribute: string,
	value: string
): Promise<void | PostgrestError> => {
	const { error } = await supabase.from(table).delete().eq(attribute, value);
	if (error) return error;
};

// Auth Admin - Create new user
export const createNewUser = async (
	email: string,
	password: string,
	name: string,
	group: string,
	role: string
) => {
	try {
		const response = await axios.post("http://localhost:3000/api/create-user", {
			email,
			password,
			name,
			group,
			role,
		});

		if (response.status === 200) {
			console.log("User created successfully!");
			return response.data;
		}
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			console.log(error.response.data.error);
		} else {
			console.error(error);
		}
	}
};

// Auth Admin - List all users
export const listAllUsers = async () => {
	try {
		const response = await axios.get("http://localhost:3000/api/users");
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

// Auth Admin - Update user password
export const updateUserPassword = async (
	userId: string,
	userPassword: string
) => {
	try {
		const response = await axios.put(
			"http://localhost:3000/api/update-user-pw",
			{
				userId,
				userPassword,
			}
		);
		const { message, error }: { message: string; error?: string } =
			response.data;
		return { message, error };
	} catch (error) {
		console.error(error);
	}
};

// Auth Admin - Update user metadata
export const updateUserMetadata = async (
	userId: string | null,
	name: string | null,
	email: string | null,
	role: string | null,
	group: string | null
) => {
	try {
		const response = await axios.put(
			"http://localhost:3000/api/update-user-metadata",
			{
				userId,
				name,
				email,
				role,
				group,
			}
		);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

// Auth Admin - Delete existing user
export const deleteUser = async (userId: string) => {
	try {
		const response = await axios.delete(
			"http://localhost:3000/api/delete-user",
			{
				data: {
					userId,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};
