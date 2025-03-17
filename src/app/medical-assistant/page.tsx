import { Suspense } from "react";
import MedicalAssistantPage from "./medical-assistant";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MedicalAssistantPage />
    </Suspense>
  );
}
