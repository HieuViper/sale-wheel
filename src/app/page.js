"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency, parseCurrency } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(1, "Họ Tên Bắt buộc"),
  phone: z
    .string()
    .regex(
      /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
      "Số điện thoại không hợp lệ"
    ),
  total_bill: z.coerce
    .number({ message: "Tổng đơn hàng phải là một số" })
    .int({ message: "Tổng đơn hàng phải lớn hơn 0" })
    .gte(399000, { message: "Tổng đơn hàng phải lớn hơn 399.000đ" }),
  store_branch: z.enum(["aeon_binh_tan", "aeon_tan_phu", "aeon_binh_duong"], {
    errorMap: () => ({ message: "Chi nhánh không hợp lệ" }),
  }),
  email: z.union([z.literal(""), z.string().email()]),
  bill_code: z.string().min(1, "Mã hóa đơn này không hợp lệ"),
});

export default function Homepage() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      phone: "",
      total_bill: "",
      store_branch: undefined,
      email: "",
      bill_code: "",
    },
  });

  const [displayValue, setDisplayValue] = useState("");

  const handleInputChange = (e) => {
    const rawValue = e.target.value;

    const sanitizedValue = rawValue.replace(/[^0-9]/g, "");

    const parsedValue = parseCurrency(sanitizedValue);

    form.setValue("total_bill", parsedValue);
    setDisplayValue(formatCurrency(parsedValue));
  };

  //submittion
  async function onSubmit(data) {
    console.log("🚀 ~ onSubmit ~ data:", data);

    localStorage.setItem("spinUser", JSON.stringify(data));
    router.push("/spin");
  }

  return (
    <>
      <div className="hidden lg:block text-center p-10">
        <h1 className="text-2xl font-bold">
          Vui lòng truy cập bằng điện thoại hoặc máy tính bảng
        </h1>
        <p className="mt-4 text-gray-600">
          Trang web này không khả dụng trên thiết bị có màn hình lớn.
        </p>
      </div>
      <div
        className=" lg:hidden bg-cover min-h-dvh flex  items-center flex-col pt-8 pb-20 "
        style={{ backgroundImage: "url('./background_login.webp')" }}
      >
        <Image src="/Logo_ZADEZ.png" width={100} height={50} alt="" />
        <Image
          src={"/logo_login.webp"}
          width={250}
          height={300}
          alt=""
          className="mb-10"
        />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" space-y-6 mt-[1rem] sm:min-w-[500px] mx-auto"
          >
            <div className="flex flex-col justify-center min-w-[360px] items-center w-full gap-3 px-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
                    <FormControl>
                      <Input
                        className="bg-white py-6 border-[#ccc] text-neutral-900"
                        {...field}
                        placeholder="Họ và tên"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
                    <FormControl>
                      <Input
                        className="bg-white py-6 border-[#ccc] text-neutral-900"
                        {...field}
                        placeholder="Số điện thoại"
                        inputMode="numeric"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
                    <FormControl>
                      <Input
                        className="bg-white py-6 border-[#ccc] text-neutral-900"
                        {...field}
                        placeholder="Email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bill_code"
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
                    <FormControl>
                      <Input
                        className="bg-white py-6 border-[#ccc] text-neutral-900"
                        {...field}
                        placeholder="Mã hóa đơn"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="total_bill"
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="bg-white py-6 border-[#ccc] text-neutral-900"
                          {...field}
                          placeholder="Tổng tiền đơn hàng"
                          onChange={handleInputChange}
                          value={displayValue}
                          inputMode="numeric"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2">
                          <span className="text-gray-500">đ</span>
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="store_branch"
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className=" bg-white py-6 w-full border-[#ccc] text-neutral-700">
                          <SelectValue
                            placeholder="Chọn chi nhánh AEON"
                            className=""
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Chọn chi nhánh AEON</SelectLabel>
                            <SelectItem value="aeon_binh_tan">
                              AEON Bình Tân
                            </SelectItem>
                            <SelectItem value="aeon_tan_phu">
                              AEON Tân Phú
                            </SelectItem>
                            <SelectItem value="aeon_binh_duong">
                              AEON Bình Dương
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex justify-center">
              <button
                className="px-8 pt-2 pb-3 rounded-full bg-[#b6001d] text-[#ffeab9] font-avo font-bold text-xl "
                type="submit"
              >
                Quay thưởng ngay
              </button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
