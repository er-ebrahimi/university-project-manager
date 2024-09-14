import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Major } from "@/types/university";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { FiEdit2 } from "react-icons/fi";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoSaveOutline } from "react-icons/io5";

const EditFieldDialog = ({
  majors,
  setMajors,
}: {
  majors: Major[];
  setMajors: Dispatch<SetStateAction<Major[]>>;
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [collegeNames, setCollegeNames] = useState<string[]>([]);
  const [newCollegeName, setNewCollegeName] = useState("");

  // Update collegeNames whenever majors change
  useEffect(() => {
    setCollegeNames(Array.from(new Set(majors.map((major) => major.name))));
  }, [majors]);

  const handleEditCollege = (index: number) => {
    setEditingIndex(index); // Enable editing mode for the selected college
    setNewCollegeName(collegeNames[index]); // Prepopulate the input with the current college name
  };

  const handleSaveEdit = (index: number) => {
    const updatedCollegeNames = [...collegeNames];
    const oldName = collegeNames[index];

    if (newCollegeName.trim() !== "") {
      updatedCollegeNames[index] = newCollegeName;
      setCollegeNames(updatedCollegeNames);

      // Update majors' name with the new college name
      setMajors((prevMajors) =>
        prevMajors.map((major) =>
          major.name === oldName ? { ...major, name: newCollegeName } : major
        )
      );
    }

    setEditingIndex(null); // Exit editing mode
    setNewCollegeName(""); // Clear input
  };

  const handleDeleteCollege = (index: number) => {
    const deletedCollege = collegeNames[index];
    const updatedCollegeNames = collegeNames.filter((_, i) => i !== index);
    setCollegeNames(updatedCollegeNames);

    // Update majors by removing the deleted college
    setMajors((prevMajors) =>
      prevMajors.filter((major) => major.name !== deletedCollege)
    );
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="scale-110 h-8 w-8 px-2 py-2 font-bold text-lg text-center pt-1 rounded-full bg-primary hover:bg-primary/90">
            <FiEdit2 className="w-4 h-6 text-white" />
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-right">ویرایش دانشکده ها</DialogTitle>
            <DialogDescription className="mt-10">
              برای ویرایش دانشکده‌ها از این قسمت استفاده کنید
            </DialogDescription>
          </DialogHeader>

          <div className="mb-4 space-y-4">
            {collegeNames.map((college, index) => (
              <div key={index} className="flex items-center justify-between">
                {editingIndex === index ? (
                  // Input for editing
                  <input
                    type="text"
                    value={newCollegeName}
                    onChange={(e) => setNewCollegeName(e.target.value)}
                    className=" px-2 py-1 rounded flex-1 mx-2 border-b shadow"
                  />
                ) : (
                  // Display college name as label
                  <Label className="flex-1 mr-2 font-bold text-md">
                    {college}
                  </Label>
                )}
                <div className="flex space-x-2 gap-2 mt-1">
                  {editingIndex === index ? (
                    <Button
                      className="rounded-[4px] p-0 h-8 w-20 flex flex-row justify-center gap-1 text-black hover:text-black border border-green-600 bg-green-500 hover:bg-white"
                      onClick={() => handleSaveEdit(index)}
                    >
                      ذخیره
                      <IoSaveOutline className="w-4 h-4 mr-1 mt-1" />
                    </Button>
                  ) : (
                    <Button
                      className="rounded-[4px] p-0 h-8 w-20 flex flex-row justify-center gap-1 bg-white text-black hover:text-white border border-purple-600 hover:bg-purple-500"
                      onClick={() => handleEditCollege(index)}
                    >
                      ویرایش
                      <CiEdit className="w-4 h-4 mr-1 mt-1" />
                    </Button>
                  )}
                  <Button
                    className={`rounded-[4px] p-0 h-8 w-20 flex flex-row justify-center gap-1 ${
                      editingIndex === index
                        ? "bg-gray-100 text-gray-800 border  border-red-700 cursor-not-allowed hover:bg-gray-300" // Disabled state
                        : "bg-white text-black hover:text-white border border-red-700 hover:bg-red-600"
                    }`}
                    onClick={() => handleDeleteCollege(index)}
                    disabled={editingIndex === index}
                    // title={
                    //   editingIndex === index
                    //     ? "Cannot delete while editing"
                    //     : "Delete college"
                    // } // Tooltip text
                  >
                    حذف
                    <MdDeleteOutline className="w-4 h-4 mr-1 mt-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditFieldDialog;
