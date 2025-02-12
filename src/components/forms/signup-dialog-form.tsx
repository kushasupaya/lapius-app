"use client";
import { useRouter } from "next/navigation";
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
import { userSignup } from "@/api/apiClient";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useAuthRedirect } from "@/utils/authRedirect";

interface SignupDialogProps {
  trigger?: React.ReactNode;
  onOpenChange: (isOpen: boolean) => void;
  open?: boolean;
  onSignupChange: (isSignupOpen: boolean) => void;
}

const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
});
export type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupDialog({
  trigger,
  onOpenChange,
  open,
  onSignupChange,
}: SignupDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const isAuthenticated = useAuthRedirect(false);
  const router = useRouter();

  useEffect(() => {
    if (open && isAuthenticated) {
      router.push("/dashboard");
      toast({
        title: "Welcome back!",
        description: "You are already signed in.",
      });
    }
  }, [isAuthenticated, open, router]);

  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await userSignup(data);
      // console.log(response);
      if (response.success) {
        toast({
          title: "Success",
          description: "You have successfully signed up!",
        });
        onOpenChange(true);
        onSignupChange(false);
      } else {
        throw new Error(response.error || "Unexpected error");
      }
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Error",
        description: error.message || "Email already exists",
        variant: "default",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onSignupChange}>
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
                  <DialogTitle
                    className="text-2xl font-bold mb-2"
                    aria-describedby="signup-dialog"
                  >
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 ">
                    <Input
                      id="firstName"
                      placeholder="First name"
                      className="bg-white py-6 rounded-full"
                      {...register("firstName")}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Input
                      id="lastName"
                      placeholder="Last name"
                      className="bg-white py-6 rounded-full"
                      {...register("lastName")}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="bg-white py-6 rounded-full"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              {/* <Link href="/dashboard"> */}
              <Button
                type="submit"
                className="w-full bg-primary-dashboard py-6 hover:bg-[#a5c596] text-black rounded-full mt-6"
              >
                Sign Up
              </Button>
              {/* </Link> */}
              <div className="text-center text-muted-foreground">
                Already have an account?{" "}
                <Button
                  className="text-black font-semibold px-0"
                  variant="link"
                  onClick={() => {
                    onOpenChange(true);
                    onSignupChange(false);
                  }}
                >
                  Sign In
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
