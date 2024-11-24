"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CustomerAuth } from "@/components/common";

const GetStartedButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" size="primary" className="mt-6" onClick={() => setOpen(open => !open)}>Get Started</Button>
      <CustomerAuth initialState="sign-up" open={open} onOpenChange={() => setOpen(open =>!open)} />
    </>
  );
};

export default GetStartedButton;
