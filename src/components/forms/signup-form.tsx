"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useTransition } from "react"
import { Textarea } from "../ui/textarea"

const FormSchema = z.object({
  firstName: z.string().min(1, {
    message: "Please enter a valid name",
  }),
  lastName: z.string().min(1, {
    message: "Please enter a valid last name",
  }),
  phoneNumber: z.string().min(10, {
    message: "Please enter a valid phone number",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  message: z.string({
    message: "Please enter a valid message",
  }),
})

interface Props {
  onSuccess?: () => void;
}

const SignupForm = ({ onSuccess }: Props) => {
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
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const validationResult = await form.trigger()
    if (!validationResult) {
      return;
    }

    startTransition(async () => {
      // TODO: Integrate login API
      console.log(data);
      const result = { success: true, message: "success" };

      if (result && result.success) {
        form.reset();

        onSuccess?.();
      } else {
        toast({
          title: "Error",
          description: result?.message ?? "",
          variant: "destructive"
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 h-full">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your first name" className="text-white border-tertiary-foreground" autoComplete="on" {...field} />
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
                <Input placeholder="Enter your last name" className="text-white border-tertiary-foreground" autoComplete="on" {...field} />
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
                <Input placeholder="Enter your phone number" className="text-white border-tertiary-foreground" autoComplete="on" {...field} />
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
                <Input placeholder="Enter your email address" className="text-white border-tertiary-foreground" autoComplete="on" {...field} />
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
                <Textarea placeholder="Enter your message here" className="text-white border-tertiary-foreground" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button size="lg" variant="primary" type="submit" className="w-full" disabled={isPending}>Signup</Button>
      </form>
    </Form>
  )
}

export default SignupForm;
