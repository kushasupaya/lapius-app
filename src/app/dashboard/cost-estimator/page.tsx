import { ComingSoon } from "@/components/sections/dashboard/components";
import { ChatSystem } from "@/components/sections/dashboard/components/chatbot";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center ">
      <div className="w-full max-w-4xl mx-auto py-4 px-24">
        {/* <ComingSoon /> */}
        <ChatSystem chatType="cost" />
      </div>
    </div>
  );
}
