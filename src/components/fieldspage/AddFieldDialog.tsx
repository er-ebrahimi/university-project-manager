import {
  Dialog,
  // DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
// import { Major } from "@/types/university";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  CreateOrganization,
  createUniversityData,
} from "@/functions/services/organization";
import { useMutation, useQuery } from "@tanstack/react-query";
import queryClient from "@/functions/QueryClient";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ClipLoader from "react-spinners/ClipLoader";
import { getUsersSelect, userSelect } from "@/functions/services/users";

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
  const [organization, setOrganization] = useState<number>(1); // Default owner ID
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending } = useMutation<
    ResponseAddmajor,
    Error,
    createUniversityData
  >({
    mutationFn: CreateOrganization,
    onSuccess: () => {
      toast.success("کاربر با موفقیت اضافه شد");
      // Optionally reset the form fields
      queryClient.invalidateQueries({
        queryKey: ["suborganizations"],
      });
      setCollegeName("");
      setNickname("");
      setAddress("");
      setOwner(1); // Reset to default owner ID
      setIsOpen(false);
      setOrganization(1);
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
  });

  const handleAddMajor = () => {
    if (!collegeName.trim()) {
      toast.error("لطفاً نام مرکز را وارد کنید");
      return;
    }

    const data: createUniversityData = {
      name: collegeName,
      nickname: nickname,
      address: address,
      owner: owner,
      organization: organization,
    };

    mutate(data);
  };
  // const[]
  const [users, setUsers] = useState<userSelect[]>();

  const { data: userlist, isPending: userLoading } = useQuery({
    queryKey: ["UserSelect"],
    queryFn: getUsersSelect,
    // enabled: isEditing, // Only fetch when editing mode is enabled
    // onSuccess: (data:userSelect[]) => {
    //   setUsers(data);
    // },
  });
  useEffect(() => {
    if (userlist) {
      setUsers(userlist);
    }
  }, [userlist]);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className="scale-110 text-white w-8 h-8 font-bold text-lg text-center pt-1 rounded-full bg-primary hover:bg-primary/90"
          >
            +
          </button>
        </DialogTrigger>

        <DialogContent className="font-IranSans sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-right">افزودن مرکز</DialogTitle>
            <DialogDescription className="mt-10">
              برای افزودن مرکز اطلاعات آن را وارد کنید
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-6 h-full">
            <div className="grid gap-3">
              {/* College Name Input */}
              <div className="flex flex-col">
                <Label htmlFor="collegeName">نام مرکز</Label>
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
              <div dir="rtl" className="flex flex-col">
                <Label htmlFor="owner">مسئول مرکز</Label>
                {/* <input
                  type="number"
                  id="owner"
                  disabled
                  className="my-2 h-10 w-full border rounded-lg px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={owner}
                  onChange={(e) => setOwner(Number(e.target.value))}
                /> */}
                <Select dir="rtl" onValueChange={(value)=> setOwner(Number(value))}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="انتخاب رئیس سازمان" />
                  </SelectTrigger>
                  <SelectContent>
                    {!userLoading &&
                      users?.map((item) => (
                        <SelectItem
                          className="pr-4 cursor-pointer"
                          key={item.id}
                          value={String(item.id)}
                        >
                          {item.nickname}
                        </SelectItem>
                      ))}
                    {userLoading && (
                      <div className="flex justify-center py-2">
                        <ClipLoader />
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="hidden flex-col">
                <Label htmlFor="organization"> سازمان</Label>
                <input
                  type="number"
                  id="organization"
                  disabled
                  className="my-2 h-10 w-full border rounded-lg px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={organization}
                  onChange={(e) => setOrganization(Number(e.target.value))}
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
