"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";

const FormSchema = z.object({
  username: z.string().email({
    message: "Please enter a valid email address",
  }),
});

const WaitListForm = () => {
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
      console.log(data);
      try {
        const response = await fetch("/api/waitlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          console.log("error");
        }
        form.reset();
        toast({
          title: "Success!",
          description: "Thank you for joining the waitlist!",
          //   variant: "destructive",
        });
      } catch (error) {
        console.error("Failed to submit form:", error);
      }
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex justify-between items-center gap-x-4 mt-2 h-full"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter your email address"
                  className="text-white border-tertiary-foreground w-72 rounded-full"
                  autoComplete="on"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="block items-center">
          <Button
            size="default"
            variant="primary"
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default WaitListForm;
