import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getUsersSelect, userSelect } from "@/functions/services/users";
import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";

const AddProfessor = () => {
  const [selectedProfessor, setSelectedProfessor] = useState<string | null>(null);
  const [users, setUsers] = useState<userSelect[] | undefined>([]);
    const [open,setOpen]=useState(false)
  // Fetch professors or users
  const { data: userlist, isPending: userLoading } = useQuery({
    queryKey: ["UserSelect"],
    queryFn: getUsersSelect,
  });

  useEffect(() => {
    if (userlist) {
      setUsers(userlist);
    }
  }, [userlist]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <button className="bg-white border-2 border-orange-500 text-orange-500 py-1 px-2 rounded-sm hover:bg-orange-500 hover:text-white">
          افزودن استاد
        </button>
      </DialogTrigger>

      <DialogContent dir="rtl">
        <DialogHeader dir="rtl" className="!text-right">
          انتخاب استاد
        </DialogHeader>
        <DialogDescription className="!text-right">
          برای افزودن استاد استاد مورد نظر را انتخاب کنید
        </DialogDescription>

        {/* Select Professor */}
        <div className="my-4">
          <Select
            dir="rtl"
            onValueChange={(value) => setSelectedProfessor(value)}
            value={selectedProfessor ?? ""}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="انتخاب استاد" />
            </SelectTrigger>
            <SelectContent>
              {!userLoading && users?.map((item) => (
                <SelectItem key={item.id} value={String(item.id)}>
                  {item.username}
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

        <DialogFooter className="gap-2 justify-start">
          <button onClick={()=>{setOpen(false)}} className="bg-red-500 text-white py-1 px-3 rounded">
            لغو
          </button>
          <button className="bg-green-500 text-white py-1 px-3 rounded">
            تأیید
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProfessor;
