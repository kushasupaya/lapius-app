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
import { useTransition } from "react"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp"

const FormSchema = z.object({
  code: z.string().length(6, {
    message: "Please enter a valid code",
  }).regex(/^\d+$/, {
    message: "Code must be numeric",
  }),
})

interface Props {
  onSuccess?: () => void;
}

const VerifyOtpForm = ({ onSuccess }: Props) => {
  const [isPending, startTransition] = useTransition();
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: "",
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
        form.setError("code", {
          type: "manual",
          message: "User does not exist",
        });
      } else {
        onSuccess?.();
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 h-full">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  value={field.value}
                  onChange={(value) => field.onChange([...value].join(""))}
                >
                  <InputOTPGroup>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <InputOTPSlot key={index} index={index} className="text-white border-tertiary-foreground focus:border-primary" />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button size="lg" variant="primary" type="submit" className="w-full" disabled={isPending}>Verify</Button>
      </form>
    </Form>
  )
}

export default VerifyOtpForm;
