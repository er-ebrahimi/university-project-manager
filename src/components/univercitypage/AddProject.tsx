import React, { Dispatch, SetStateAction, useState } from "react";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { postAddProject } from "@/functions/services/project";
import { useParams } from "react-router-dom";
import queryClient from "@/functions/QueryClient";
import DatePicker from "react-multi-date-picker"; // Import the date picker
import persian from "react-date-object/calendars/persian"; // Jalali calendar support
import persian_fa from "react-date-object/locales/persian_fa"; // Persian language
import DateObject from "react-date-object";
import toast from "react-hot-toast";

export interface AddProjectData {
  name: string;
  nickname: string;
  start_date: string;
  end_date: string;
  real_start_date: string;
  real_end_date: string;
  external_members: string;
  owner: string;
  subOrganization: string;
}

const AddProject = ({
  ownerName,
  ownerId,
  // open,
  setOpen,
}: {
  ownerName:string;
  ownerId: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { id: organizationId } = useParams(); // Extract organizationId from URL
  const [addFormData, setAddFormData] = useState<AddProjectData>({
    name: "",
    nickname: "",
    start_date: new DateObject({ calendar: persian }).format("YYYY-MM-DD"), // Default to now
    end_date: new DateObject({ calendar: persian }).format("YYYY-MM-DD"), // Default to now
    real_start_date: new DateObject({ calendar: persian }).format("YYYY-MM-DD"), // Default to now
    real_end_date: new DateObject({ calendar: persian }).format("YYYY-MM-DD"), // Default to now
    external_members: "",
    owner: ownerId, // Pre-fill with provided ownerId
    subOrganization: organizationId!, // Assign subOrganization from URL
  });

  const handleAddFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAddFormData({
      ...addFormData,
      [name]: value,
    });
  };

  const handleDateChange = (name: keyof AddProjectData, date: any) => {
    if (date && date.isValid) {
      // Convert Jalali date to Gregorian and then format to ISO string
      const gregorianDate = date.toDate(); // convert to regular JavaScript date
      setAddFormData({
        ...addFormData,
        [name]: gregorianDate.toISOString().split("T")[0], // Only keep YYYY-MM-DD
      });
    } else {
      setAddFormData({
        ...addFormData,
        [name]: "",
      });
    }
  };

  // Mutation for adding a new project
  const mutation = useMutation({
    mutationFn: (addFormData: AddProjectData) => postAddProject(addFormData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`suboorganization${organizationId}`],
      }); // Ensure organization data is refreshed
      setOpen(false);
    },
    onError: (error: any) => {
      console.error("Error adding project:", error);
    },
  });

  const handleSubmit = () => {
    // Convert the date fields into the expected format
    const formattedData = {
      ...addFormData,
      start_date: new Date(addFormData.start_date).toISOString(),
      end_date: new Date(addFormData.end_date).toISOString(),
      real_start_date: new Date(addFormData.real_start_date).toISOString(),
      real_end_date: new Date(addFormData.real_end_date).toISOString(),
    };
    mutation.mutate(formattedData, {
      onSuccess: () => {
        toast.success("پروژه با موفقیت اضافه شد");
        // Optionally handle success (e.g., close dialog, show notification)
      },
      onError: (error: any) => {
        console.error(error.response.data.nickname[0])
        if(error.response.data.nickname[0] === "project with this nickname already exists.")
        {
          toast.error(
            "نام مستعار پروژه تکراریست"
          )
        } else {
            toast.error("خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
          }

        // if (error) {
        //   // Iterate through the error messages and show each in a toast
        //   for (const key in error.response.data) {
        //     // console.log("bitch")
            
        //     if (error.response.data.hasOwnProperty(key)) {
        //       const messages = error.data[key];
        //       if (Array.isArray(messages)) {
        //         messages.forEach((message) => {
        //           toast.error(`${key}: ${message}`);
        //         });
        //       }
        //     }
        //   }
        // } else {
        //   toast.error("خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
        // }
        }
    }
  );
  };

  return (
    <DialogContent className="p-8 bg-white rounded-lg shadow-lg h-[670px] w-[750px]">
      <DialogHeader className="mb-6">
        <DialogTitle className="text-right text-2xl font-semibold text-primary-dark font-IranSans">
          افزودن پروژه جدید
        </DialogTitle>
      </DialogHeader>

      <div className="text-right font-IranSans">
        <div className="grid grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-lg font-medium text-primary-dark mb-2">
              نام پروژه:
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              type="text"
              name="name"
              value={addFormData.name}
              onChange={handleAddFormChange}
            />
          </div>
          <div className="">
            <label className="block text-lg font-medium text-primary-dark mb-2">
              نام مستعار:
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              type="text"
              name="nickname"
              value={addFormData.nickname}
              onChange={handleAddFormChange}
            />
          </div>

          {/* Persian DatePicker for Start Date */}
          <div className="">
            <label className="block text-lg font-medium text-primary-dark mb-2">
              تاریخ شروع:
            </label>
            <DatePicker
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              calendar={persian}
              locale={persian_fa}
              //   value={addFormData.start_date}

              onChange={(date) => handleDateChange("start_date", date)}
              inputClass="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          {/* Persian DatePicker for End Date */}
          <div className="">
            <label className="block text-lg font-medium text-primary-dark mb-2">
              تاریخ پایان:
            </label>
            <DatePicker
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              calendar={persian}
              locale={persian_fa}
              //   value={addFormData.end_date}
              onChange={(date) => handleDateChange("end_date", date)}
              inputClass="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          {/* Persian DatePicker for Real Start Date */}
          <div className="">
            <label className="block text-lg font-medium text-primary-dark mb-2">
              تاریخ واقعی شروع:
            </label>
            <DatePicker
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              calendar={persian}
              locale={persian_fa}
              //   value={addFormData.real_start_date}
              onChange={(date) => handleDateChange("real_start_date", date)}
              inputClass="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          {/* Persian DatePicker for Real End Date */}
          <div className="">
            <label className="block text-lg font-medium text-primary-dark mb-2">
              تاریخ واقعی پایان:
            </label>
            <DatePicker
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              calendar={persian}
              locale={persian_fa}
              //   value={addFormData.real_end_date}
              onChange={(date) => handleDateChange("real_end_date", date)}
              inputClass="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          <div className="">
            <label className="block text-lg font-medium text-primary-dark mb-2">
              اعضای پروژه:
            </label>
            {/* <textarea className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              type="text"
              name="external_members"
              value={addFormData.external_members}
              onChange={handleAddFormChange}>

            </textarea > */}
            <textarea
              className="w-full p-2 border h-24! min-h-14 resize-none max-h-24 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              name="external_members"
              value={addFormData.external_members}
              onChange={handleAddFormChange}
            />
            {/* <input
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              type="text"
              name="external_members"
              value={addFormData.external_members}
              onChange={handleAddFormChange}
            /> */}
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-primary-dark mb-2">
              رئیس پروژه:
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              type="text"
              // name="owner"
              value={ownerName}
              // onChange={handleAddFormChange}
              disabled // Disabling this field since it's provided via props
            />
          </div>
          <div className="mb-4 hidden">
            <label className="block text-lg font-medium text-primary-dark mb-2">
              رئیس پروژه:
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              type="text"
              name="owner"
              value={addFormData.owner}
              onChange={handleAddFormChange}
              disabled // Disabling this field since it's provided via props
            />
          </div>
        </div>
      </div>

      <DialogFooter className="flex justify-end mt-2">
        <button
          className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-md transition duration-300 ease-in-out"
          onClick={handleSubmit}
          disabled={mutation.isPending} // Disable button while loading
        >
          {mutation.isPending ? "در حال افزودن..." : "افزودن پروژه"}
        </button>
      </DialogFooter>
    </DialogContent>
  );
};

export default AddProject;
