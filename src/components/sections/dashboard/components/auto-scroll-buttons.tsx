"use client";

import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface AutoScrollButtonsProps {
  questions: string[];
  onQuestionClick: (question: string) => void;
}

export default function AutoScrollButtons({
  questions,
  onQuestionClick,
}: AutoScrollButtonsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate the questions array to create a seamless loop
  const duplicatedQuestions = [...questions, ...questions];

  useEffect(() => {
    if (!scrollRef.current) return;

    // Get the width of the scroll container
    const scrollWidth = scrollRef.current.scrollWidth;
    const containerWidth = scrollRef.current.offsetWidth;

    // Only animate if content is wider than container
    if (scrollWidth <= containerWidth) return;

    let animationId: number;
    let scrollPos = 0;

    const scroll = () => {
      if (isPaused || !scrollRef.current) return;

      scrollPos += 0.5; // Adjust speed here

      // Reset position when we've scrolled through the first set of items
      if (scrollPos >= scrollWidth / 2) {
        scrollPos = 0;
      }

      scrollRef.current.scrollLeft = scrollPos;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPaused]);

  return (
    <div className="text-center text-sm text-gray-500 mt-4">
      <p className="underline italic text-xs">Or try one of these questions:</p>
      <div
        className="relative overflow-hidden mt-2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          ref={scrollRef}
          className="flex gap-2 py-2 overflow-x-auto scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {duplicatedQuestions.map((question, index) => (
            <Button
              key={`${question}-${index}`}
              variant="outline"
              size="sm"
              className="flex-shrink-0"
              onClick={() => onQuestionClick(question)}
            >
              {question}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
