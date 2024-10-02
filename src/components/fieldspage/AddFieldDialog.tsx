import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Major } from "@/types/university";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-hot-toast";
import {
  CreateOrganization,
  createUniversityData,
} from "@/functions/services/organization";
import { useMutation } from "@tanstack/react-query";

interface ResponseAddmajor {
  success: boolean;
  data: any;
  message?: string;
}

const AddFieldDialog = () => {
  const [collegeName, setCollegeName] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [owner, setOwner] = useState<number>(1); // Default owner ID
  const [isOpen,setIsOpen]=useState(false);
  const { mutate ,isPending} = useMutation<ResponseAddmajor, Error, createUniversityData>(
    {
      mutationFn: CreateOrganization,
      onSuccess: () => {
        toast.success("کاربر با موفقیت اضافه شد");
        // Optionally reset the form fields
        setCollegeName("");
        setNickname("");
        setAddress("");
        setOwner(1); // Reset to default owner ID
        setIsOpen(false);
      },
      onError: (error: any) => {
        toast.error("ساخت کاربر با خطا مواجه شد");
        console.log(error);

        if (error.response && error.response.data) {
          for (const i in error.response.data) {
            toast.error(`${i}: ${error.response.data[i]}`);
          }
        } else {
          toast.error("An unexpected error occurred.");
        }
      },
    }
  );

  const handleAddMajor = () => {
    if (!collegeName.trim()) {
      toast.error("لطفاً نام زیرسازمان را وارد کنید");
      return;
    }

    const data: createUniversityData = {
      name: collegeName,
      nickname: nickname,
      address: address,
      owner: owner,
    };

    mutate(data);
  };

  return (
    <div>
      <Dialog open={isOpen}>
        <DialogTrigger>
          <button onClick={()=>{setIsOpen(true)}} className="scale-110 text-white w-8 h-8 font-bold text-lg text-center pt-1 rounded-full bg-primary hover:bg-primary/90">
            +
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-right">افزودن زیرسازمان</DialogTitle>
            <DialogDescription className="mt-10">
              برای افزودن زیر سازمان اطلاعات آن را وارد کنید
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-6 h-full">
            <div className="grid gap-3">
              {/* College Name Input */}
              <div className="flex flex-col">
                <Label htmlFor="collegeName">نام زیر‌‌سازمان</Label>
                <input
                  type="text"
                  id="collegeName"
                  className="my-2 h-10 w-full border rounded-lg px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  required
                />
              </div>

              {/* Nickname Input */}
              <div className="flex flex-col">
                <Label htmlFor="nickname">نام مستعار</Label>
                <input
                  type="text"
                  id="nickname"
                  className="my-2 h-10 w-full border rounded-lg px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </div>

              {/* Address Input */}
              <div className="flex flex-col">
                <Label htmlFor="address">آدرس</Label>
                <input
                  type="text"
                  id="address"
                  className="my-2 h-10 w-full border rounded-lg px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              {/* Owner Input */}
              <div className="flex flex-col">
                <Label htmlFor="owner">شناسه مالک</Label>
                <input
                  type="number"
                  id="owner"
                  disabled
                  className="my-2 h-10 w-full border rounded-lg px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={owner}
                  onChange={(e) => setOwner(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" onClick={handleAddMajor}>
              {isPending ? "در حال ارسال..." : "ثبت"}
              {/* ثبت */}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddFieldDialog;
