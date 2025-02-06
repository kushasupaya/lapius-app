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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { toast } from "@/hooks/use-toast";
const phoneNumberRegex = /^\+\d{1,3}\d{10}$/;

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(phoneNumberRegex, {
    message:
      "Please enter a valid phone number with country code (e.g., +1234567890)",
  }),
  country: z.string().min(1, "Please select a country"),
  message: z.string({
    message: "Please enter a valid message",
  }),
});

export default function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      country: "",
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
    <div className="w-[80%] mx-auto h-fit py-6 px-6 md:px-10 rounded-xl border bg-card text-card-foreground shadow">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm md:text-base font-bold">
                  Full name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    {...field}
                    className="h-10 md:h-12 flex-grow w-full md:text-base"
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
                <FormLabel className="text-sm md:text-base font-bold">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    {...field}
                    type="email"
                    className="h-10 md:h-12 md:text-base"
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
                <FormLabel className="text-sm md:text-base font-bold">
                  Phone
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    {...field}
                    type="tel"
                    className="h-10 md:h-12 md:text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm md:text-base font-bold">
                  Country
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-10 md:h-12 text-base">
                      <SelectValue placeholder="Select a Country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    {/* Add more countries as needed */}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm md:text-base font-bold">
                  Message
                </FormLabel>
                <FormControl>
                  <Textarea {...field} rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full h-10 md:h-12 text-base bg-primary-dashboard font-bold"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
