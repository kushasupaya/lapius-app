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
import { toast } from "@/hooks/use-toast";
import Image from "next/image";

const FormSchema = z.object({
  username: z.string().email({
    message: "Please enter a valid email address",
  }),
});

const SubscribeForm = () => {
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
    <div>
      <Button
        size="default"
        variant="default"
        type="button"
        className="bg-tertiary text-tertiary-foreground text-base w-full sm:w-max p-4 h-14 rounded-lg hover:bg-primary focus:outline-none transition duration-300"
        onClick={() =>
          window.open(
            "https://docs.google.com/forms/d/e/1FAIpQLSd-OLTQ07hoTw9GLCrSidrDjfTyfNhXXp-l-psge6Jq9YNhaA/viewform?usp=dialog",
            "_blank"
          )
        }
      >
        <div className="flex items-center w-full justify-between sm:mr-5">
          Request Early Access
          <Image
            alt=""
            src="/icons/arrow-top-right.svg"
            height={24}
            width={24}
            className="ml-2 md:ml-4"
          />
        </div>
      </Button>
    </div>
    // <Form {...form}>
    //   <form
    //     onSubmit={form.handleSubmit(onSubmit)}
    //     className="flex flex-col sm:flex-row justify-between items-center gap-3"
    //     // className="mx-auto flex justify-between items-center gap-x-4 mt-2 h-full"
    //   >
    //     <FormField
    //       control={form.control}
    //       name="username"
    //       render={({ field }) => (
    //         <FormItem className="w-full">
    //           <FormControl>
    //             <Input
    //               placeholder="Enter your email address"
    //               className="px-4 text-foreground h-14 focus:outline-none shadow-none focus-visible:ring-0 placeholder:text-gray-600"
    //               autoComplete="on"
    //               {...field}
    //             />
    //           </FormControl>
    //           <div className="absolute text-xs">
    //             <FormMessage />
    //           </div>
    //         </FormItem>
    //       )}
    //     />
    //     <Button
    //       size="default"
    //       variant="default"
    //       type="submit"
    //       className="bg-tertiary text-tertiary-foreground text-base w-full sm:w-max p-4 h-14 rounded-lg hover:bg-primary focus:outline-none transition duration-300"
    //       disabled={isPending}
    //     >
    //       <div className="flex items-center w-full justify-between sm:mr-5">
    //         Join the Beta Testing
    //         <Image alt="" src="/icons/arrow-top-right.svg" height={24} width={24} className="ml-2 md:ml-4" />
    //       </div>
    //     </Button>
    //     {/* </div> */}
    //   </form>
    // </Form>
  );
};
export default SubscribeForm;
