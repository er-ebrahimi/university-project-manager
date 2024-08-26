import React, { useEffect, useState } from "react";
import professorsData from "@/data/data.json";
import { Professor } from "@/types/university";
import ForceGraph from "@/components/tree/Majors";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
export default function Universities() {
  const [professors, setProfessors] = useState<Professor[]>([]);

  useEffect(() => {
    setProfessors(professorsData.professors as Professor[]);
  }, []);
  return (
    <>
      <div className="flex  items-center ">
        <h1 className="text-lg font-semibold md:text-2xl">دانشگاه‌ها</h1>
      </div>
      <div
        className="flex flex-1 flex-col items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <ForceGraph professors={professors}></ForceGraph>
        <div className="flex flex-row justify-end w-[75vw] ml-1">
          <Dialog>
            <DialogTrigger>
              <button className="text-white w-8 h-8 font-bold text-lg text-center pt-1 rounded-full bg-primary hover:bg-primary/90">
                +
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-right">افزودن دانشکده</DialogTitle>
                <DialogDescription className="mt-10">
                  برای افزودن یک دانشکده نام دانشگاه و آن دانشکده را وارد کنید
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-6 h-full">
                <div className="grid gap-3">
                  <Label htmlFor="univercityName">نام دانشگاه</Label>
                  <Input
                    id="univercityName"
                    type="text"
                    placeholder="نام کاربری خود را وارد کنید"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="collegeName">نام دانشکده</Label>
                  </div>
                  <Input id="collegeName" type="text" required />
                </div>
              </div>

              <DialogFooter>
                <Button type="submit">ثبت</Button>
                {/* <Button>لغو</Button> */}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}
