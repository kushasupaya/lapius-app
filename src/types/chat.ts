export type CustomChatMessage = {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
  options?: { [key: string]: string };
  externalLink?: string;
  thinking?: boolean;
};

export type ChatResponse = {
  response: string;
  links: string;
  options?: { [key: string]: string };
};
