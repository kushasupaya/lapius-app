"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Textarea } from "../ui/textarea";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
const phoneNumberRegex = /^\+\d{1,3}\d{10}$/;

const formSchema = z.object({
  firstName: z.string().min(2, "Name must be at least 2 characters"),
  lastName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(phoneNumberRegex, {
    message:
      "Please enter a valid phone number with country code (e.g., +1234567890)",
  }),
  message: z.string({
    message: "Please enter a valid message",
  }),
});

export default function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        toast({
          title: "Error",
          description: "Could not create user",
          variant: "destructive",
        });
        throw new Error("User does not exist");
      } else {
        toast({
          title: "Success",
          description:
            "Thank you for reaching out! We will get back to you soon.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium mb-2">
                    First name <sup>*</sup>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your first name"
                      {...field}
                      className="h-14 flex-grow w-full p-[18px] rounded-lg text-sm"
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
                  <FormLabel className="text-sm font-medium mb-2">
                    Last name <sup>*</sup>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your last name"
                      {...field}
                      className="h-14 flex-grow w-full p-[18px] rounded-lg text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium mb-2">
                  Email <sup>*</sup>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email address"
                    {...field}
                    type="email"
                    className="h-14 flex-grow w-full p-[18px] rounded-lg text-sm"
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
                <FormLabel className="text-sm font-medium mb-2">
                  Phone Number <sup>*</sup>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your phone number"
                    {...field}
                    type="tel"
                    className="h-14 flex-grow w-full p-[18px] rounded-lg text-sm"
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
                <FormLabel className="text-sm font-medium mb-2">
                  Message <sup>*</sup>
                </FormLabel>
                <FormControl>
                  <Textarea {...field} rows={5} placeholder="Write your message" className="p-[18px] rounded-lg text-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-2">
            <Button
              size="default"
              variant="default"
              type="submit"
              className="bg-tertiary text-tertiary-foreground text-base w-max p-4 h-14 rounded-lg hover:bg-primary focus:outline-none transition duration-300"
            >
              <div className="flex items-center w-full justify-between">
                Send Message
                <Image alt="" src="/icons/arrow-top-right.svg" height={24} width={24} className="ml-2 md:ml-4" />
              </div>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
