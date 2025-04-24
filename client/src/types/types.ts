export interface MessageType {
  text: string;
  type: "success" | "error" | null;
}

export   interface IconMap {
  [key: string]: React.ReactNode;
}

export interface User {
  email: string;
  user_metadata: {
    email: string;
    name: string;
    group: string;
    role: string;
  };
}