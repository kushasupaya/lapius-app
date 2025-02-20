"use client";

import { useState, type FormEvent, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Stethoscope,
  XSquare,
  Bone,
  Heart,
  Baby,
  Send,
  Bot,
} from "lucide-react";
import { IconLink, IconMessage } from "@tabler/icons-react";
import { ChatResponse, CustomChatMessage } from "@/types/chat";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Message {
  text: string;
  isUser: boolean;
}

export default function MedicalCostEstimator() {
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(
    null
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<CustomChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const latestMessageRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState("");
  const [apimessages, setApiMessages] = useState<
    { role: string; content: string }[]
  >([]);
  const [isThinking, setIsThinking] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<{
    [messageId: string]: string | null;
  }>({});
  const [disabledOptions, setDisabledOptions] = useState<Set<string>>(
    new Set()
  );
  const handleOptionSelect = (messageId: string, option: string) => {
    if (selectedOptions[messageId]) return;
    setSelectedOptions((prev) => ({ ...prev, [messageId]: option }));
    setDisabledOptions((prev) => new Set(prev).add(messageId)); // Disable options for this message
    setInput(option); // Set input to the selected option
    handleSend(option); // Trigger the send function
    console.log("test");
  };

  const handleTreatmentSelect = (treatment: string) => {
    setSelectedTreatment(treatment);
    setIsExpanded(true);
    setIsThinking(true);
    handleSend(`Tell me about the cost of ${treatment}`);
  };
  const treatments = [
    { name: "X-Ray", icon: <XSquare className="w-4 h-4" /> },
    { name: "Shoulder Repair", icon: <Bone className="w-4 h-4" /> },
    { name: "Heart Transplant", icon: <Heart className="w-4 h-4" /> },
    { name: "Delivery", icon: <Baby className="w-4 h-4" /> },
    { name: "Knee Repair", icon: <Stethoscope className="w-4 h-4" /> },
  ];

  const handleSend = async (messageInput?: string) => {
    setIsExpanded(true);
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

  useEffect(() => {
    if (latestMessageRef.current) {
      latestMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); //Fixed useEffect dependency

  return (
    <div
      className={`max-w-3xl mx-auto p-2 space-y-2  ${
        !isExpanded ? "md:mt-40 2xl:mt-52" : ""
      }`}
    >
      {!isExpanded && (
        <h1 className="text-2xl md:text-3xl font-semibold text-center leading-tight">
          Understand the costs of
          <br />
          treatments upfront.
        </h1>
      )}
      {isExpanded && (
        <div className="border-b p-0.5 flex items-center  ">
          <div className="text-sm font-medium flex items-center gap-2">
            <IconMessage className="h-8 w-8 text-primary border rounded-full border-black p-2" />
            <span>Understand the costs of treatments upfront</span>
          </div>
        </div>
      )}
      <Card
        className={`border-gray-100 transition-all duration-300 ease-in-out w-full ${
          isExpanded ? "h-[600px] md:h-[750px] 2xl:h-[890px]" : "h-auto"
        }`}
      >
        <CardContent className="p-6 space-y-6 flex flex-col h-full">
          {!isExpanded && (
            <div className="flex flex-wrap gap-2">
              {treatments.map((treatment) => (
                <Button
                  key={treatment.name}
                  variant={
                    selectedTreatment === treatment.name ? "default" : "outline"
                  }
                  className="flex rounded-full text-primary items-center gap-2"
                  onClick={() => handleTreatmentSelect(treatment.name)}
                >
                  {treatment.icon}
                  {treatment.name}
                </Button>
              ))}
            </div>
          )}

          {isExpanded && (
            <ScrollArea className="flex-grow mb-4 pr-4">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`mb-4 ${
                    message.sender === "user" ? "text-right" : "text-left"
                  }`}
                  ref={index === messages.length - 1 ? latestMessageRef : null}
                >
                  <div
                    className={`inline-block p-2 rounded-lg ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }`}
                  >
                    {message.sender === "ai" && !message.thinking && (
                      <div className="flex items-center gap-2 mb-1">
                        <Image
                          src="/logo/lapiusgreen.svg"
                          alt="Lapius Logo"
                          width={30}
                          height={24}
                          className="rounded-sm"
                        />
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

                  {/* <div
                    className={`inline-block p-3 rounded-lg ${
                      message.isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {message.text}
                  </div> */}
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
            </ScrollArea>
          )}
          <div className="mt-auto w-full">
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
        </CardContent>
      </Card>
    </div>
  );
}
