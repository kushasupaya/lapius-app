"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

const FormSchema = z.object({
  username: z.string().email({
    message: "Please enter a valid email address",
  }),
})

interface Props {
  onSuccess?: () => void;
}

const LoginForm = ({ onSuccess }: Props) => {
  const [isPending, startTransition] = useTransition();
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
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
      const result = { error: false };

      if (result?.error) {
        form.setError("username", {
          type: "manual",
          message: "User does not exist",
        });
      } else {
        form.reset();
        onSuccess?.();
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 h-full">
        <FormField
          control={form.control}
          name="username"
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

        <Button size="lg" variant="primary" type="submit" className="w-full" disabled={isPending}>Login</Button>
      </form>
    </Form>
  )
}

export default LoginForm;
