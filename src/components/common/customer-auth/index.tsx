"use client";

import { useState } from "react";

import Logo from "../logo";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "@/components/ui/side-dialog";
import { redirect } from "next/navigation";

import LoginForm from "@/components/forms/login-form";
import SignupForm from "@/components/forms/signup-form";
import VerifyOtpForm from "@/components/forms/verify-otp-form";

interface Props {
  open: boolean;
  onOpenChange: () => void;
  initialState: "sign-in" | "sign-up" | "verify-otp";
}

const CustomerAuth = ({ open, onOpenChange, initialState }: Props) => {
  const [uiState, setUiState] = useState(initialState);
  const [userEmail, setUserEmail] = useState("");
  const [session, setSession] = useState("");
  const [verificationType, setVerificationType] = useState("");
  const onLoginSuccess = () => {
    setUiState("verify-otp");
  };

  const onSignupSuccess = () => {
    setUiState("verify-otp");
  };

  const onVerifyOtpSuccess = () => {
    redirect("/app");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="absolute top-0 left-0 w-full">
          <div className="bg-[url('/images/pattern.svg')] h-40 w-full bg-no-repeat bg-cover bg-center"></div>
        </div>
        <div className="w-20 mb-6 mt-0 absolute z-10 top-6 left-6">
          <Logo variant="default" />
        </div>
        {uiState === "sign-in" && (
          <div>
            <DialogHeader className="mb-6 mt-28">
              <DialogTitle className="text-lg font-semibold cursor-default">
                Welcome Back
              </DialogTitle>
              <DialogDescription className="text-sm cursor-default">
                Please enter your details to login.
              </DialogDescription>
            </DialogHeader>
            <LoginForm
              onSuccess={onLoginSuccess}
              setUserEmail={setUserEmail}
              setSession={setSession}
              setVerificationType={setVerificationType}
            />
            <div className="text-center mt-3">
              <span className="text-sm text-gray-300">
                Don&apos;t have an account?
              </span>
              &nbsp;
              <span
                className="text-sm text-primary cursor-pointer hover:primary"
                onClick={() => setUiState("sign-up")}
              >
                Sign up
              </span>
            </div>
          </div>
        )}
        {uiState === "sign-up" && (
          <div>
            <DialogHeader className="mb-6 mt-28">
              <DialogTitle className="text-lg font-semibold cursor-default">
                Create an Account
              </DialogTitle>
              <DialogDescription className="text-sm cursor-default">
                Please enter your details to signup.
              </DialogDescription>
            </DialogHeader>
            <SignupForm
              onSuccess={onSignupSuccess}
              setUserEmail={setUserEmail}
              setSession={setSession}
              setVerificationType={setVerificationType}
            />
            <div className="text-center mt-3">
              <span className="text-sm text-gray-300">
                Already have an account?
              </span>
              &nbsp;
              <span
                className="text-sm text-primary cursor-pointer hover:primary"
                onClick={() => setUiState("sign-in")}
              >
                Sign In
              </span>
            </div>
          </div>
        )}
        {uiState === "verify-otp" && (
          <div>
            <DialogHeader className="mb-6 mt-28">
              <DialogTitle className="text-lg font-semibold cursor-default">
                Verify OTP
              </DialogTitle>
              <DialogDescription className="text-sm cursor-default">
                Please enter the 8 digit code sent to your email.
              </DialogDescription>
            </DialogHeader>
            <VerifyOtpForm
              onSuccess={onVerifyOtpSuccess}
              userEmail={userEmail}
              session={session}
              verificationType={verificationType}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CustomerAuth;
