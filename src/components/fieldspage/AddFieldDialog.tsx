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
import { toast } from "@/components/ui/use-toast"; // Assuming you have a toast component
// import toast?
const AddFieldDialog = ({
  majors,
  setMajors,
}: {
  majors: Major[];
  setMajors: Dispatch<SetStateAction<Major[]>>;
}) => {
  const [collegeName, setCollegeName] = useState<string>("");

  // Function to handle adding a new major
  const handleAddMajor = () => {
    if (collegeName.trim() === "") {
      toast({
        title: "خطا",
        description: "نام دانشکده نمی‌تواند خالی باشد.",
        variant: "destructive",
      });
      return; // Prevent empty submissions
    }

    // Check if the major already exists
    const majorExists = majors.some((major) => major.name === collegeName.trim());
    if (majorExists) {
      toast({
        title: "خطا",
        description: "این دانشکده قبلاً اضافه شده است.",
        variant: "destructive",
      });
      return;
    }

    // Add the new major to the state
    setMajors((prevMajors) => [
      ...prevMajors,
      { name: collegeName.trim() }, // Adjust this if Major has more properties
    ]);

    // Clear the input field
    setCollegeName("");

    // Close the dialog
    document.activeElement?.click(); // Simulate a click outside to close the dialog

    // Show success toast
    toast({
      title: "موفقیت",
      description: "دانشکده با موفقیت اضافه شد.",
      variant: "success",
    });
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <button className="scale-110 text-white w-8 h-8 font-bold text-lg text-center pt-1 rounded-full bg-primary hover:bg-primary/90">
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
              <div className="flex items-center">
                <Label htmlFor="collegeName">نام دانشکده</Label>
              </div>
              <input
                type="text"
                id="collegeName"
                className="my-2 h-10 w-full border rounded-lg  px-3 py-2  ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" onClick={handleAddMajor}>
              ثبت
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddFieldDialog;
