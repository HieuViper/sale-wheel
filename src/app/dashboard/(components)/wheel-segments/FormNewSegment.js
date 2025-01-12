"use client";
import {
  createWheelSegment,
  updateWheelSegment,
} from "@/actions/wheelSegmentsAction";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const FormSchema = z.object({
  label: z.string().min(1, { message: "Label is required" }),
  quantity: z.coerce
    .number({ message: "Quantity must be a number" })
    .int({ message: "Quantity must be an integer" })
    .gte(0, { message: "Quantity must be greater than or equal to 0" }),
  order: z.coerce
    .number({ message: "Order must be a number" })
    .int({ message: "Order must be an integer" })
    .gte(1, { message: "Order must be greater than or equal to 1" }),
  percentage: z.coerce
    .number({ message: "Percentage must be a number" })
    .int({ message: "Percentage must be an integer" })
    .gte(0, { message: "Percentage must be greater than or equal to 0" }),
});

export default function FormNewSegment({ editObject }) {
  const isEdit = editObject ? true : false;
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      label: "",
      quantity: "",
      order: "",
      percentage: "",
    },
  });

  async function onSubmit(formData) {
    console.log("🚀 ~ onSubmit ~ formData:", formData);
    let res;
    if (isEdit) {
      // case edit

      res = await updateWheelSegment(editObject._id, formData);
      router.replace("/dashboard/wheel-segments");
    } else {
      // case create
      res = await createWheelSegment(formData);
    }

    if (res?.error) {
      console.log("🚀 ~ onSubmit ~ error:", res.error);
      toast.error(res.error);
    } else {
      console.log("ok");
      form.reset();
      toast.success("Action successfully");
    }
  }

  useEffect(() => {
    if (isEdit) {
      form.setValue("label", editObject.label);
      form.setValue("quantity", editObject.quantity);
      form.setValue("order", editObject.order);
      form.setValue("percentage", editObject.percentage);
    }
  }, [isEdit, editObject]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-[600px] space-y-3 mt-[1rem]"
      >
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input type="number" placeholder="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order</FormLabel>
              <FormControl>
                <Input type="number" placeholder="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="percentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Percentage</FormLabel>
              <FormControl>
                <Input type="number" placeholder="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          variant={isEdit ? "destructive" : "default"}
        >
          {form.formState.isSubmitting
            ? "Working......"
            : isEdit
            ? " Update"
            : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
