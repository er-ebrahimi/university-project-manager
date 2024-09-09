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
  
    const handleAddCollege = () => {
      if (newCollegeName.trim() === "") return;
  
      // Add the new college to the list
      setCollegeNames((prev) => [...prev, newCollegeName]);
  
      // Update majors data with the new college name
      setMajors((prevMajors) => [
        ...prevMajors,
        { name: newCollegeName }, // Assuming Major only has a name property, adjust if needed
      ]);
  
      // Clear input
      setNewCollegeName("");
    };
  
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
                برای افزودن دانشکده و یا ویرایش آن از این قسمت استفاده کنید
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
                      className="border px-2 py-1 rounded flex-1 mr-2"
                    />
                  ) : (
                    // Display college name as label
                    <Label className="flex-1 mr-2">{college}</Label>
                  )}
                  <div className="flex space-x-2 gap-2">
                    {editingIndex === index ? (
                      <Button onClick={() => handleSaveEdit(index)}>ذخیره</Button>
                    ) : (
                      <Button onClick={() => handleEditCollege(index)}>ویرایش</Button>
                    )}
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteCollege(index)}
                    >
                      حذف
                    </Button>
                  </div>
                </div>
              ))}
            </div>
  
            {/* <div className="flex items-center">
              <Label className="mr-2">دانشکده جدید:</Label>
              <input
                type="text"
                value={newCollegeName}
                onChange={(e) => setNewCollegeName(e.target.value)}
                className="border px-2 py-1 rounded flex-1"
              />
              <Button onClick={handleAddCollege} className="ml-2">
                افزودن
              </Button>
            </div> */}
  
            {/* <DialogFooter>
              <Button type="submit">ثبت</Button>
            </DialogFooter> */}
          </DialogContent>
        </Dialog>
      </div>
    );
  };
  
  export default EditFieldDialog;
  