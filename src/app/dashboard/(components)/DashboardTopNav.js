"use client";
import { logout } from "@/actions/auth";
import ModeToggle from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Folder, HomeIcon, LogOut, Menu } from "lucide-react";
import Link from "next/link";

export default function DashboardTopNav({ children }) {
  return (
    <div className="flex flex-col">
      <header className="flex h-[55px] items-center gap-4 border-b px-3">
        <Dialog>
          <SheetTrigger className="min-[1024px]:hidden p-2 transition">
            <Menu />
            <Link href="/dashboard">
              <span className="sr-only">Home</span>
            </Link>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <Link href="/dashboard">
                <SheetTitle>Dashboard</SheetTitle>
              </Link>
            </SheetHeader>
            <div className="flex flex-col space-y-3 mt-[1rem]">
              <DialogClose asChild>
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full">
                    <HomeIcon className="mr-2 h-4 w-4" />
                    Spin Records
                  </Button>
                </Link>
              </DialogClose>

              <DialogClose asChild>
                <Link href="/dashboard/wheel-segments">
                  <Button variant="outline" className="w-full">
                    <Folder className="mr-2 h-4 w-4" />
                    Wheel Segments
                  </Button>
                </Link>
              </DialogClose>

              <Separator />

              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => logout()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </DialogClose>
            </div>
          </SheetContent>
        </Dialog>
        <div className="flex justify-center items-center gap-2 ml-auto">
          <ModeToggle />
        </div>
      </header>
      {children}
    </div>
  );
}
