import { Suspense } from "react";
import AppHome from "./app-home";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppHome />
    </Suspense>
  );
}
