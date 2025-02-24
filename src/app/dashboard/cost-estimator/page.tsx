import { ComingSoon } from "@/components/sections/dashboard/components";
import {
  ChatSystem,
  CostEstimator,
} from "@/components/sections/dashboard/components/chatbot";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center ">
      <div className="w-full max-w-4xl mx-auto py-0.5 px-24">
        {/* <ComingSoon /> */}
        <CostEstimator />
        {/* <ChatSystem chatType="cost" /> */}
      </div>
    </div>
  );
}
