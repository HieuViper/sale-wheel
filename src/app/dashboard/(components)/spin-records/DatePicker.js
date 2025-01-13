"use client";

import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DatePicker({ startDate, endDate }) {
  const router = useRouter();
  const [date, setDate] = useState(
    startDate && endDate
      ? {
          from: new Date(startDate),
          to: new Date(endDate),
        }
      : {
          from: new Date(2025, 0, 1),
          to: addDays(new Date(2025, 0, 1), 20),
        }
  );

  function toLocalISO(date) {
    const pad = (num) => num.toString().padStart(2, "0");
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    return `${year}-${month}-${day}T00:00:00.000Z`;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={cn(
            "w-[300px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} -{" "}
                {format(date.to, "LLL dd, y")}
              </>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={(e) => {
            setDate(e);
            console.log(e);
            if (!e) {
            } else if (!e.to) {
              router.replace(
                `/dashboard?startDate=${toLocalISO(
                  e.from
                )}&endDate=${toLocalISO(e.from)}`
              );
            } else {
              router.replace(
                `/dashboard?startDate=${toLocalISO(
                  e.from
                )}&endDate=${toLocalISO(e.to)}`
              );
            }
          }}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
