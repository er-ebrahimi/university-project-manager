import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateNewUser } from "@/functions/services/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction, useState } from "react";
import { getselectsuborganization } from "@/functions/services/organization";
import Select from "react-select";
import { getprojectList } from "@/functions/services/project";
import { Checkbox } from "../ui/checkbox";
import queryClient from "@/functions/QueryClient";

// Define types

export type CreateUserVariables = {
  username: string;
  first_name: string;
  last_name: string;
  nickname: string;
  social_id_number: string;
  personal_id_number: string;
  education_level: string;
  phone_number: string;
  mobile_phone_number: string;
  // user_permissions: number;
  password: string;
  subOrganizations: number | null;
  projects: number[];
  admin: boolean;
  crud_project: boolean;
};

type CreateUserResponse = {
  success: boolean;
  data: any;
  message?: string;
};

const AddUser = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  // React query mutation for creating a user
  const { mutate } = useMutation<
    CreateUserResponse,
    Error,
    CreateUserVariables
  >({
    mutationFn: CreateNewUser,
    onSuccess: () => {
      toast.success("کاربر با موفقیت اضافه شد");
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["UserData"] });
    },
    onError: (error: any) => {
      toast.error("ساخت کاربر با خطا مواجه شد");
      console.log(error);
      for (const i in error.response.data) {
        toast.error(`${i}: ${error.response.data[i]}`);
      }
    },
  });

  // React query for fetching sub-organization data
  const { data, isPending } = useQuery({
    queryKey: ["selectListsubOrganization"],
    queryFn: getselectsuborganization,
  });

  const { data: ProjectList, isPending: pPending } = useQuery({
    queryKey: ["projectList"],
    queryFn: getprojectList,
  });

  // Component states
  const [educationLevel, setEducationLevel] = useState<string>("");
  const [userSuborganization, setUserSuborganization] = useState<number | null>(
    null
  );
  const [userProjects, setUserProjects] = useState<number[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [crudProject, setCrudProject] = useState<boolean>(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // Constructing the values object with correct types
        const values: CreateUserVariables = {
          username: formData.get("username") as string,
          password: formData.get("password") as string,
          first_name: formData.get("first_name") as string,
          last_name: formData.get("last_name") as string,
          nickname: formData.get("nickname") as string,
          social_id_number: formData.get("social_id_number") as string,
          personal_id_number: formData.get("personal_id_number") as string,
          education_level: educationLevel, // Use state value
          phone_number: formData.get("phone_number") as string,
          mobile_phone_number: formData.get("mobile_phone_number") as string,
          // user_permissions: 0, // Removed unused state
          subOrganizations: userSuborganization ?? null, // Use state value
          projects: userProjects, // Use state value
          admin: isAdmin,
          crud_project: crudProject,
        };

        mutate(values); // Send form data to API via mutation
      }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-1"
      // className=" flex flex-row flex-wrap justify-around"
    >
      <div>
        <Label className="mr-2" htmlFor="username">
          نام کاربری
        </Label>
        <Input className="mt-2 w-full" name="username" id="username" required />
      </div>

      <div>
        <Label className="mr-2" htmlFor="password">
          رمز عبور
        </Label>
        <Input
          type="password"
          className="mt-2 w-full"
          name="password"
          id="password"
          required
        />
      </div>

      <div>
        <Label className="mr-2" htmlFor="first_name">
          نام
        </Label>
        <Input
          className="mt-2 w-full"
          name="first_name"
          id="first_name"
          required
        />
      </div>

      <div>
        <Label className="mr-2" htmlFor="last_name">
          نام خانوادگی
        </Label>
        <Input
          className="mt-2 w-full"
          name="last_name"
          id="last_name"
          required
        />
      </div>

      <div>
        <Label className="mr-2" htmlFor="nickname">
          نام مستعار
        </Label>
        <Input className="mt-2 w-full" name="nickname" id="nickname" required />
      </div>

      <div>
        <Label className="mr-2" htmlFor="social_id_number">
          کد ملی
        </Label>
        <Input
          name="social_id_number"
          id="social_id_number"
          maxLength={10}
          required
          className="mt-2 w-full"
        />
      </div>

      <div>
        <Label className="mr-2" htmlFor="personal_id_number">
          شماره پرسنلی
        </Label>
        <Input
          className="mt-2 w-full"
          name="personal_id_number"
          id="personal_id_number"
          required
        />
      </div>

      <div>
        <Label className="mr-2" htmlFor="education_level">
          سطح تحصیلات
        </Label>
        <Select
          options={[
            { value: "BSc", label: "کارشناسی" },
            { value: "Ms", label: "کارشناسی ارشد" },
            { value: "PhD", label: "دکترا" },
            { value: "Prof", label: "پروفسور" },
          ]}
          placeholder="انتخاب سطح تحصیلات"
          noOptionsMessage={() => "گزینه‌ای موجود نیست"}
          onChange={(option) => setEducationLevel(option?.value || "")}
          className="mt-2 w-full"
        />
      </div>

      <div>
        <Label className="mr-2" htmlFor="phone_number">
          شماره تلفن
        </Label>
        <Input
          className="mt-2 w-full"
          name="phone_number"
          id="phone_number"
          required
        />
      </div>

      <div>
        <Label className="mr-2" htmlFor="mobile_phone_number">
          شماره موبایل
        </Label>
        <Input
          name="mobile_phone_number"
          id="mobile_phone_number"
          defaultValue={"+98"}
          dir="ltr"
          maxLength={13}
          required
          className="mt-2 w-full"
        />
      </div>

      <div className="flex justify-end mr-2 items-center  flex-row-reverse gap-4 mt-6">
        <div className="flex flex-row-reverse gap-2">
          <Checkbox
            id="admin"
            checked={isAdmin}
            onCheckedChange={(checked) => setIsAdmin(checked === true)}
          />
          <label
            htmlFor="admin"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            ادمین
          </label>
        </div>
        <div className="flex flex-row-reverse gap-2">
          <Checkbox
            id="crud_project"
            checked={crudProject}
            onCheckedChange={(checked) => setCrudProject(checked === true)}
          />
          <label
            htmlFor="crud_project"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            کراد پروژه
          </label>
        </div>
      </div>

      <div>
        <Label className="mr-2" htmlFor="subOrganizations">
          مرکز‌ها
        </Label>
        <Select
          options={
            data?.map((item) => ({
              value: item.id,
              label: item.nickname,
            })) || []
          }
          menuPlacement="top"
          isLoading={isPending}
          placeholder="انتخاب مرکز"
          noOptionsMessage={() => "مرکزی موجود نیست"}
          onChange={(option) => setUserSuborganization(option?.value || null)}
          className="mt-2 w-full"
        />
      </div>

      {crudProject && (
        <div>
          <Label className="mr-2" htmlFor="projects">
            پروژه‌ها
          </Label>
          <Select
            options={
              ProjectList?.map((item) => ({
                value: item.id,
                label: item.name,
              })) || []
            }
            menuPlacement="top"
            isLoading={pPending}
            isMulti
            placeholder="انتخاب پروژه"
            noOptionsMessage={() => "پروژه‌ای موجود نیست"}
            onChange={(options) =>
              setUserProjects(options?.map((opt) => opt.value) || [])
            }
            className="mt-2 w-full"
          />
        </div>
      )}

      <div dir="ltr" className="mt-2 md:col-span-2 ml-2">
        <Button
          type="submit"
          dir="ltr"
          className="w-1/5 bg-indigo-500 text-white"
        >
          افزودن
        </Button>
      </div>
    </form>
  );
};

export default AddUser;
