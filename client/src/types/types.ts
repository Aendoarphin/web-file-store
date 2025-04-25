export interface MessageType {
  text: string;
  type: "success" | "error" | null;
}

export   interface IconMap {
  [key: string]: React.ReactNode;
}
