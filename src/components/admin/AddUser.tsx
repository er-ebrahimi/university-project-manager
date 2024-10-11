import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateNewUser } from "@/functions/services/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction, useState } from "react";
import { getselectsuborganization } from "@/functions/services/organization";
import ClipLoader from "react-spinners/ClipLoader";

type CreateUserVariables = {
  username: string;
  first_name: string;
  last_name: string;
  nickname: string;
  social_id_number: string;
  personal_id_number: string;
  education_level: string;
  phone_number: string;
  mobile_phone_number: string;
  user_permissions: number;
  password: string;
  subOrganization: number | null;
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
  const { mutate } = useMutation<
    CreateUserResponse,
    Error,
    CreateUserVariables
  >({
    mutationFn: CreateNewUser,
    onSuccess: () => {
      toast.success("کاربر با موفقیت اضافه شد");
      setOpen(false);
    },
    onError: (error: any) => {
      toast.error("ساخت کاربر با خطا مواجه شد");
      console.log(error);
      // toast.error(error.responce.data.message);

      for (const i in error.response.data) {
        toast.error(`${i}: ${error.response.data[i]}`);
      }
    },
  });
  const { data, isPending, isError } = useQuery({
    queryKey: ["selectListsubOrganization"],
    queryFn: getselectsuborganization,
  });
  const [educationLevel, setEducationLevel] = useState<string>("");
  const [userPermissions, setUserPermissions] = useState<number | null>(null);
  const [userSuborganization, setUserSuborganization] = useState<number | null>(
    null
  );
  console.log("🚀 ~ AddUser ~ data:", data);
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
          user_permissions: userPermissions ?? 0, // Use state value
          subOrganization: userSuborganization ?? null,
        };

        console.log("🚀 ~ AddUser ~ values:", values);
        mutate(values); // Send form data to API via mutation
      }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
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
        <Select dir="rtl" onValueChange={(value) => setEducationLevel(value)}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="انتخاب سطح تحصیلات" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="BSc">کارشناسی</SelectItem>
            <SelectItem value="Ms">کارشناسی ارشد</SelectItem>
            <SelectItem value="PhD">دکترا</SelectItem>
            <SelectItem value="Prof">پروفسور</SelectItem>
          </SelectContent>
        </Select>
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

      <div>
        <Label className="mr-2" htmlFor="user_permissions">
          نقش
        </Label>
        <Select
          dir="rtl"
          onValueChange={(value) => setUserPermissions(Number(value))}
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="انتخاب نقش" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">سوپرادمین</SelectItem>
            <SelectItem value="2">کاربر</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="mr-2" htmlFor="user_permissions">
          زیرسازمان
        </Label>
        <Select
          dir="rtl"
          onValueChange={(value) => setUserSuborganization(Number(value))}
        >
          <SelectTrigger className="mt-2">
            <SelectValue  />
          </SelectTrigger>
          <SelectContent >
            {isPending && (
              <div className="h-10 flex justify-center">
                <ClipLoader className="h-6 w-6" />
              </div>
            )}
            {!isPending &&
              data?.map((item) => (
                <SelectItem key={item.id} value={String(item.id)}>
                  {item.nickname}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
              
      <div dir="ltr" className="md:col-span-2 ml-2">
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
