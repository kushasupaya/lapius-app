"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface SignupDialogProps {
  trigger?: React.ReactNode;
}

export default function SignupDialog({ trigger }: SignupDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button variant="default">Sign Up</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] p-6">
        <div className="grid grid-cols-3">
          <div className="relative">
            <Image
              src="/images/aiagent.svg"
              alt="Healthcare interface"
              width={400}
              height={500}
              className="h-full w-full object-cover aspect-square rounded-xl"
            />
          </div>

          {/* Right side with form */}
          <div className="p-6 col-span-2">
            <DialogHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1 text-center">
                  <DialogTitle className="text-2xl font-bold mb-2">
                    Sign up to Lapius
                  </DialogTitle>
                  <p className="text-muted-foreground">
                    Take Control of your Healthcare
                    <br />
                    Costs with the AI
                  </p>
                </div>
              </div>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 ">
                    <Input
                      id="firstName"
                      placeholder="First name"
                      className="bg-white py-6 rounded-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      id="lastName"
                      placeholder="Last name"
                      className="bg-white py-6 rounded-full"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="bg-white py-6 rounded-full"
                  />
                </div>
              </div>
              <Link href="/dashboard">
                <Button className="w-full bg-primary-dashboard py-6 hover:bg-[#a5c596] text-black rounded-full mt-6">
                  Sign Up
                </Button>
              </Link>
              <div className="text-center text-muted-foreground">
                Already have an account?{" "}
                <Link href="/signin" className="text-black font-semibold">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
