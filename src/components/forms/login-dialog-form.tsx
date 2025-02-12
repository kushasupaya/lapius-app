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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Label } from "../ui/label";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { fetchLoginCode, userLogin } from "@/api/apiClient";
import { useAuthRedirect } from "@/utils/authRedirect";

interface SignupDialogProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  onSignUpChange?: (isSignupOpen: boolean) => void;
}

const loginSchema = z.object({
  loginCode: z.string(),
  email: z.string().email("Invalid email address"),
});
export type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginDialog({
  trigger,
  open,
  onOpenChange,
  onSignUpChange,
}: SignupDialogProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const [showLoginCode, setShowLoginCode] = useState(false);
  const isAuthenticated = useAuthRedirect(false);

  useEffect(() => {
    if (open && isAuthenticated) {
      router.push("/dashboard");
      toast({
        title: "Welcome back!",
        description: "You are already signed in.",
      });
    }
  }, [isAuthenticated, open, router]);

  const getLoginCode = async () => {
    const email = watch("email");
    if (!email) {
      toast({ title: "Error", description: "Email is required" });
      return;
    }
    try {
      const response = await fetchLoginCode(email);
      //   console.log(response);

      if (response.success) {
        toast({
          title: "Success",
          description:
            "Check your email for the code! Make sure to check your spam folder.",
        });
        setShowLoginCode(true);
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
  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await userLogin(data);
      //   console.log(response);
      if (response.success) {
        toast({
          title: "Success",
          description: "You have successfully signed in!",
        });
        const userDetails = response.userDetails;
        // console.log(userDetails);
        localStorage.setItem("user", JSON.stringify(userDetails));
        if (response.token) {
          localStorage.setItem("authToken", response.token);
        }
        router.push("/dashboard");
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger || <Button variant="default">Login</Button>}
      </DialogTrigger>
      <DialogContent
        aria-describedby="login-dialog"
        className="sm:max-w-[800px] p-6"
      >
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
                    aria-describedby="login-dialog"
                    className="text-2xl font-bold mb-2"
                  >
                    Welcome Back
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
                <div className="space-y-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="bg-white py-6 rounded-full"
                    {...register("email")}
                  />
                </div>
                {showLoginCode && (
                  <div className="items-center space-y-2">
                    <Label>Enter your 6 digit login code</Label>
                    <InputOTP
                      maxLength={6}
                      // value={field.value}
                      // onChange={(value) => field.onChange([...value].join(""))}
                      value={watch("loginCode") || ""}
                      onChange={(value) =>
                        setValue("loginCode", [...value].join(""))
                      }
                    >
                      <InputOTPGroup>
                        {Array.from({ length: 6 }).map((_, index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className="text-black  focus:border-primary"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                    <span className="text-sm text-muted-foreground">
                      Didn&apos;t receive the code?{" "}
                      <span
                        className="underline hover:text-primary-dashboard text-primary"
                        onClick={() => getLoginCode()}
                      >
                        click here
                      </span>{" "}
                      to get another
                    </span>
                  </div>
                )}
              </div>
              {!showLoginCode ? (
                <Button
                  type="button"
                  onClick={() => getLoginCode()}
                  className="w-full bg-primary-dashboard py-6 hover:bg-[#a5c596] text-black rounded-full mt-6"
                >
                  Get Login Code
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-primary-dashboard py-6 hover:bg-[#a5c596] text-black rounded-full mt-6"
                >
                  Sign In
                </Button>
              )}
              <div className="text-center text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Button
                  className="text-black px-0 font-semibold"
                  variant="link"
                  onClick={() => {
                    if (onSignUpChange) {
                      onSignUpChange(true);
                    }
                    if (onOpenChange) {
                      onOpenChange(false);
                    }
                  }}
                >
                  Sign Up
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
