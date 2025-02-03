"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";

const FormSchema = z.object({
  username: z.string().email({
    message: "Please enter a valid email address",
  }),
});

interface Props {
  onSuccess?: () => void;
  setUserEmail: (email: string) => void;
  setSession: (session: string) => void;
  setVerificationType: (verificationType: string) => void;
}

const LoginForm = ({
  onSuccess,
  setUserEmail,
  setSession,
  setVerificationType,
}: Props) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const validationResult = await form.trigger();
    if (!validationResult) {
      return;
    }

    startTransition(async () => {
      // TODO: Integrate login API
      console.log(data);
      try {
        setUserEmail(data.username);
        setVerificationType("signin");

        const email = data.username;
        const response = await fetch("/api/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        if (!response.ok) {
          form.setError("username", {
            type: "manual",
            message: "User does not exist",
          });
          throw new Error("User does not exist");
        }
        const result = await response.json();
        setSession(result?.session);
        form.reset();
        onSuccess?.();
      } catch (error) {
        console.error(error);
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email address"
                  className="text-white border-tertiary-foreground"
                  autoComplete="on"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          size="lg"
          variant="default"
          type="submit"
          className="w-full"
          disabled={isPending}
        >
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
