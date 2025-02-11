export type ChatMessage = {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
  options?: { [key: string]: string };
  externalLink?: { [key: string]: string };
  thinking?: boolean;
};
