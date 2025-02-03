"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
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
import { Textarea } from "../ui/textarea";

const phoneNumberRegex = /^\+\d{1,3}\d{10}$/;

const FormSchema = z.object({
  firstName: z.string().min(1, {
    message: "Please enter a valid name",
  }),
  lastName: z.string().min(1, {
    message: "Please enter a valid last name",
  }),
  phoneNumber: z.string().regex(phoneNumberRegex, {
    message:
      "Please enter a valid phone number with country code (e.g., +1234567890)",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  message: z.string({
    message: "Please enter a valid message",
  }),
});

interface Props {
  onSuccess?: () => void;
  setUserEmail: (email: string) => void;
  setVerificationType: (verificationType: string) => void;
  setSession: (session: string) => void;
}

const SignupForm = ({
  onSuccess,
  setUserEmail,
  setVerificationType,
  setSession,
}: Props) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      message: "",
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
        setVerificationType("signin");
        setUserEmail(data.email);
        const response = await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          toast({
            title: "Error",
            description: "Could not create user",
            variant: "destructive",
          });
          throw new Error("User does not exist");
        }
        const result = await response.json();
        console.log(result);
        setSession(result?.result.Session);
        form.reset();
        onSuccess?.();
      } catch (e) {
        console.error(e);
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
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">First Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your first name"
                  className="text-white border-tertiary-foreground"
                  autoComplete="on"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Last Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your last name"
                  className="text-white border-tertiary-foreground"
                  autoComplete="on"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your phone number"
                  className="text-white border-tertiary-foreground"
                  autoComplete="on"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
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

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your message here"
                  className="text-white border-tertiary-foreground"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button size="lg" type="submit" className="w-full" disabled={isPending}>
          Signup
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
