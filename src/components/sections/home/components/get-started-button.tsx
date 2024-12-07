"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CustomerAuth } from "@/components/common";
import { useRouter } from "next/navigation";

const GetStartedButton = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();


  return (
    <>
      <Button
        variant="primary"
        size="primary"
        className="mt-6"
        // onClick={() => setOpen((open) => !open)}
        onClick={() => router.push("#wait-list-section")}
      >
        Join the Waitlist
      </Button>
      <CustomerAuth
        initialState="sign-up"
        open={open}
        onOpenChange={() => setOpen((open) => !open)}
      />
    </>
  );
};

export default GetStartedButton;
