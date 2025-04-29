export interface MessageType {
  text: string;
  type: "success" | "error" | null;
}

export   interface IconMap {
  [key: string]: React.ReactNode;
}

export type File = {
  id: string
  name: string
  type: string
  size: string
  uploadedAt: string
}

export type SortField = "name" | "type" | "size" | "uploadedAt" | null
export type SortDirection = "asc" | "desc"
