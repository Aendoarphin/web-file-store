import { PostgrestError } from "@supabase/supabase-js";
import supabase from "./supabase";
import supabaseAdmin from "./supabase-admin";

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

// Auth - Create new user
export const createNewUser = async (
  email: string,
  password: string,
  { name, group, role }: { name: string; group: string; role: string }
): Promise<void> => {
  await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name, email, role, group },
  });
};
