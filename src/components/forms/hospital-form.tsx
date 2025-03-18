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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import hospitals from "./data/hospitals_data.json";
import { Hospital } from "@/types/hospital";

const FormSchema = z.object({
  hospital: z.string().min(1, {
    message: "Please enter a valid name, address, city or zip code",
  }),
});

interface Props {
  onFormSubmit: (hospital: Hospital) => void;
}



const getUniqueHospitals = (hospitals: Hospital[]) => {
  const seen = new Set();
  return hospitals.filter((hospital) => {
    const key = JSON.stringify(hospital);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

const HospitalForm = ({ onFormSubmit }: Props) => {
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
      const selected = data.hospital;
      const hospital = hospitals.find(h => h.hospital_name === selected);
      if (hospital) {
        onFormSubmit(hospital);
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
          name="hospital"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="px-4 text-foreground h-14 focus:outline-none shadow-none focus-visible:ring-0 placeholder:text-gray-600 w-full">
                      <SelectValue placeholder="Find my name, address, city or zip code..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      getUniqueHospitals(hospitals).map((hospital, idx) => (
                        <SelectItem key={idx} value={hospital.hospital_name}>{hospital.hospital_name}</SelectItem>
                      ))
                    }
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
            <Image alt="" src="/icons/arrow-top-right.svg" height={24} width={24} className="ml-2 md:ml-4" />
          </div>
        </Button>
      </form>
    </Form>
  );
};

export default HospitalForm;
