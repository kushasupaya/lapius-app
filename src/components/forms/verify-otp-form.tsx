"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useTransition } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

const FormSchema = z.object({
  code: z
    .string()
    .length(8, {
      message: "Please enter a valid code",
    })
    .regex(/^\d+$/, {
      message: "Code must be numeric",
    }),
});

interface Props {
  onSuccess?: () => void;
  userEmail: string;
  session?: string;
  verificationType: string;
}

const VerifyOtpForm = ({
  onSuccess,
  userEmail,
  session,
  verificationType,
}: Props) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const validationResult = await form.trigger();
    if (!validationResult) {
      return;
    }

    startTransition(async () => {
      // TODO: Integrate verify otp API
      console.log(data);
      const otp = data.code;

      // let response = { ok: true };
      try {
        // if (verificationType === "signup") {
        //   response = await fetch("/api/verify-signup", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ email: userEmail, otp }),
        //   });
        // } else {
        const response = await fetch("/api/verify-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userEmail, otp, session }),
        });
        if (response.ok) {
          onSuccess?.();
        } else {
          form.setError("code", {
            type: "manual",
            message: "User does not exist",
          });
        }
      } catch (error) {
        console.error("Error verifying code:", error);
        throw error;
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-4 h-full"
      >
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP
                  maxLength={8}
                  value={field.value}
                  onChange={(value) => field.onChange([...value].join(""))}
                >
                  <InputOTPGroup>
                    {Array.from({ length: 8 }).map((_, index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className="text-white border-tertiary-foreground focus:border-primary"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button size="lg" type="submit" className="w-full" disabled={isPending}>
          Verify
        </Button>
      </form>
    </Form>
  );
};

export default VerifyOtpForm;
