export interface MessageType {
  text: string;
  type: "success" | "error" | null;
}

export interface IconMap {
  [key: string]: React.ReactNode;
}

export type File = {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
};

export type SortField = "name" | "type" | "uploadedAt" | null;
export type SortDirection = "asc" | "desc";

export interface FormErrors {
  email?: string;
  password?: string;
  name?: string;
}

export interface FormData {
  email: string;
  password: string;
  name: string;
  role: "admin" | "user";
  group: "collections" | "accounting" | "operations" | "information technology" | "compliance";
}
