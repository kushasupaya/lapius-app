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
        className="flex justify-between py-2 px-3 focus-within:scale-110 focus-within:ease-in focus-within:duration-200 w-full md:w-2/6 mx-auto bg-white rounded-full overflow-hidden font-light focus-within:shadow-lg focus:outline-none"
        // className="mx-auto flex justify-between items-center gap-x-4 mt-2 h-full"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Enter your email address"
                  className="px-5 py-2  text-gray-600 border-none focus:outline-none shadow-none focus-visible:ring-0"
                  autoComplete="on"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          size="default"
          variant="secondary"
          type="submit"
          className="bg-[#68B944] text-white px-8 py-2 rounded-full hover:bg-green-600 focus:outline-none transition duration-300"
          disabled={isPending}
        >
          Sign Up
        </Button>
        {/* </div> */}
      </form>
    </Form>
  );
};
export default WaitListForm;
