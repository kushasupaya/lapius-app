"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bot, Mic, Send, Bookmark } from "lucide-react";
import Image from "next/image";
import { IconLink, IconMessage } from "@tabler/icons-react";
import { ChatResponse, CustomChatMessage } from "@/types/chat";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ChatSystemProps {
  chatType?: string;
}

// const testResponse = {
//   response: {
//     text: "Do you want to continue?",
//     metadata: {
//       options: {
//         option_1: "Yes, let's go!",
//         option_2: "No, not right now.",
//       },
//       externalLink: {
//         "More Info": "https://example.com",
//       },
//     },
//   },
// };

const ChatSystem = ({ chatType }: ChatSystemProps) => {
  const [messages, setMessages] = useState<CustomChatMessage[]>([
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
  const [disabledOptions, setDisabledOptions] = useState<Set<string>>(
    new Set()
  );
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState("");
  const [apimessages, setApiMessages] = useState<
    { role: string; content: string }[]
  >([]);
  const [isThinking, setIsThinking] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<{
    [messageId: string]: string | null;
  }>({});

  const handleOptionSelect = (messageId: string, option: string) => {
    if (selectedOptions[messageId]) return;
    setSelectedOptions((prev) => ({ ...prev, [messageId]: option }));
    setDisabledOptions((prev) => new Set(prev).add(messageId)); // Disable options for this message
    setInput(option); // Set input to the selected option
    handleSend(option); // Trigger the send function
    console.log("test");
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (messageInput?: string) => {
    const userInput = messageInput || input;
    if (!userInput.trim()) return;

    // Add the user's message to the chat
    const newUserMessage: CustomChatMessage = {
      id: `user-${Date.now()}-${Math.random()}`,
      content: userInput,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    const updatedApiMessages = [
      ...apimessages,
      { role: "user", content: userInput },
    ];

    setApiMessages(updatedApiMessages);
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setIsThinking(true);

    setDisabledOptions((prev) => {
      const newSet = new Set(prev);
      messages.forEach((message) => {
        if (message.options) {
          newSet.add(message.id);
        }
      });
      return newSet;
    });

    console.log(updatedApiMessages);
    try {
      // Send the user's message to the backend

      const serverResponse = await fetch("/api/get-chat-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedApiMessages }),
      });
      console.log(serverResponse);
      if (serverResponse.ok) {
        const data: ChatResponse = await serverResponse.json(); // Cast response as ChatResponse

        const { response, link, options } = data;
        // const { text, metadata } = response.response;

        // Add the AI's response to the chat
        const aiMessage: CustomChatMessage = {
          id: `ai-${Date.now()}-${Math.random()}`,
          content: response,
          sender: "ai",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          options: options,
          externalLink: link,
        };
        const aiMessages = [
          ...updatedApiMessages,
          { role: "assistant", content: response },
        ];
        setApiMessages(aiMessages);

        setMessages((prev) => [...prev, aiMessage]);
        setIsThinking(false);
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
    <div className="w-full h-screen flex flex-col">
      <Card className="w-full flex flex-col flex-1 overflow-hidden">
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

        <div
          ref={chatContainerRef}
          className="flex-1 overflow-auto p-4 space-y-4 max-h-[calc(100vh-200px)]"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2   ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } `}
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
              <div className={` max-w-[80%] `}>
                {message.sender === "ai" && !message.thinking && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">LapiusAI</span>
                  </div>
                )}

                <div
                  className={`rounded-lg px-4 py-2 ${
                    message.thinking
                  } ? "animate-pulse text-white" : "" 
              ${
                message.sender === "user"
                  ? " text-white bg-primary"
                  : "bg-gray-100 text-black "
              }`}
                >
                  {message.content}
                  <div
                    className={`text-xs mt-1 opacity-70 ${
                      message.sender === "ai" ? "text-black" : "text-white"
                    }`}
                  >
                    {message.timestamp}
                  </div>
                </div>
                {message.options && (
                  <RadioGroup>
                    <div className="grid grid-row gap-2 mt-2 w-fit">
                      {Object.entries(message.options).map(
                        ([key, option]: [string, string]) => {
                          // console.log(key, option);
                          return (
                            <div
                              key={key}
                              className={`  items-center border rounded-full px-3 py-1  space-x-2 cursor-pointer ${
                                selectedOptions[message.id] === option
                                  ? "bg-primary-dashboard text-black"
                                  : "hover:bg-primary-dashboard/60 bg-white text-black hover:shadow-md"
                              } ${
                                disabledOptions.has(message.id)
                                  ? "opacity-50 pointer-events-none"
                                  : ""
                              }`}
                              onClick={() =>
                                handleOptionSelect(message.id, option)
                              }
                            >
                              <Label className="w-full">
                                <RadioGroupItem
                                  id={option}
                                  value={option}
                                  className="sr-only"
                                />
                                {option}
                              </Label>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </RadioGroup>
                )}
                {message.externalLink && (
                  <div className="mt-2 grid grid-row">
                    <div className="flex items-center text-sm border rounded-full px-2 py-1 bg-white text-black gap-2 hover:shadow-md">
                      <IconLink className="h-5 w-5" />
                      <a href={message.externalLink} target="_blank">
                        {message.externalLink}
                      </a>
                    </div>
                  </div>
                )}
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

        <div className="p-4 border-t mt-4">
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
              onClick={() => handleSend()}
              className="bg-primary text-white hover:bg-primary/80"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatSystem;
