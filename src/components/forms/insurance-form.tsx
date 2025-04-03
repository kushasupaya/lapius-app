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
import { Button } from "../ui/button";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import insurances from "./data/insurance_data.json";
import { Insurance } from "@/types/hospital";

const FormSchema = z.object({
  insurance: z.string().min(1, {
    message: "Please enter a valid name, address, city or zip code",
  }),
});

interface Props {
  onFormSubmit: (insurance: Insurance) => void;
}

function getUniqueHospitals(data: Insurance[]): Insurance[] {
  const seen = new Map<string, boolean>();

  return data.reduce<Insurance[]>((unique, insurance) => {
    if (!seen.has(insurance.insurance_name)) {
      seen.set(insurance.insurance_name, true);
      unique.push(insurance);
    }
    return unique;
  }, []);
}

const InsuranceForm = ({ onFormSubmit }: Props) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      insurance: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const validationResult = await form.trigger();
    if (!validationResult) {
      return;
    }

    startTransition(async () => {
      const selected = data.insurance;
      const insurance = insurances.find((h) => h.insurance_name === selected);
      if (insurance) {
        onFormSubmit(insurance);
      }
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
          name="insurance"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="px-4 text-foreground h-14 focus:outline-none shadow-none focus-visible:ring-0 placeholder:text-gray-600 w-full">
                      <SelectValue placeholder="Select an insurance..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {getUniqueHospitals(insurances).map((insurance, idx) => (
                      <SelectItem key={idx} value={insurance.insurance_name}>
                        {insurance.insurance_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
            <Image
              alt=""
              src="/icons/arrow-top-right.svg"
              height={24}
              width={24}
              className="ml-2 md:ml-4"
            />
          </div>
        </Button>
      </form>
    </Form>
  );
};

export default InsuranceForm;
