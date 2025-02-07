"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bot, Mic, Send, Bookmark } from "lucide-react";
import Image from "next/image";
import { IconMessage } from "@tabler/icons-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
  thinking?: boolean;
}
interface ChatSystemProps {
  chatType?: string;
}
const ChatSystem = ({ chatType }: ChatSystemProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello, I'm LapiusAI! 👋 I'm your personal medical assistant. How can I help you?",
      sender: "ai",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add the user's message to the chat
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setIsThinking(true);

    try {
      // Send the user's message to the backend
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      if (response.ok) {
        const data = await response.json();

        // Add the AI's response to the chat
        const aiMessage: Message = {
          id: Date.now().toString(),
          content: data.reply,
          sender: "ai",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setMessages((prev) => [...prev, aiMessage]);
      } else {
        console.error("Error fetching response from backend");
      }
    } catch (error) {
      console.error("Error sending message to backend:", error);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <Card className="w-full mx-auto min-h-screen flex flex-col ">
      {chatType === "cost" ? (
        <div className="p-4 border-b flex items-center  ">
          <div className="text-sm font-medium flex items-center gap-2">
            <IconMessage className="h-8 w-8 text-primary border rounded-full border-black p-2" />
            <span>Understand the costs of treatments upfront</span>
          </div>
        </div>
      ) : (
        <div className="p-4 border-b flex items-center gap-2">
          <div className="text-sm font-medium">Medical_bill_02/09.pdf</div>
          <div className="text-xs text-muted-foreground">8:21 AM</div>
          <Button variant="ghost" size="icon" className="ml-auto">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-2  ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.sender === "user" ? null : (
              <div>
                <Image
                  src="/logo/lapiusgreen.svg"
                  alt="Lapius Logo"
                  width={30}
                  height={24}
                  className="rounded-sm"
                />
              </div>
            )}
            <div
              className={`rounded-lg px-4 py-2 max-w-[80%] ${
                message.sender === "user"
                  ? " text-white bg-primary"
                  : "bg-gray-100 text-black "
              }`}
            >
              {message.sender === "ai" && !message.thinking && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">LapiusAI</span>
                </div>
              )}
              <p className={message.thinking ? "animate-pulse text-white" : ""}>
                {message.content}
              </p>
              <div className="text-xs mt-1 opacity-70 text-white">
                {message.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex justify-start">
            <div className="rounded-lg px-4 py-2 max-w-[80%] bg-gray-100 text-black">
              <div className="flex items-center gap-2 mb-1">
                <Bot className="h-4 w-4" />
                <span className="font-medium">LapiusAI</span>
              </div>
              <p className="animate-pulse">Thinking...</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />

          <Button
            size="icon"
            onClick={handleSend}
            className="bg-primary text-white hover:bg-primary/80"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatSystem;
