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
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";

const FormSchema = z.object({
  hospital: z.string().min(1, {
    message: "Please enter a valid name, address, city or zip code",
  }),
});

const UploadBillForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      hospital: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const validationResult = await form.trigger();
    if (!validationResult) {
      return;
    }

    startTransition(async () => {
      console.log(data);
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col sm:flex-row justify-between items-center gap-3 w-full max-w-md"
      >
        <FormField
          control={form.control}
          name="hospital"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Find by name, address, city or zip code..."
                  className="px-4 text-foreground h-14 focus:outline-none shadow-none focus-visible:ring-0 placeholder:text-gray-600 w-full"
                  autoComplete="on"
                  {...field}
                />
              </FormControl>
              <div className="absolute text-xs">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button
          size="default"
          variant="default"
          type="submit"
          className="bg-tertiary text-tertiary-foreground text-base w-max p-4 h-14 rounded-lg hover:bg-primary focus:outline-none transition duration-300"
          disabled={isPending}
        >
          <div className="flex items-center w-full justify-between md:mr-5">
            Continue
            <Image alt="" src="/icons/arrow-top-right.svg" height={24} width={24} className="ml-2 md:ml-4" />
          </div>
        </Button>
      </form>
    </Form>
  );
};

export default UploadBillForm;
