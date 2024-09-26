// import useState from "react";
import { useMutation } from '@tanstack/react-query';
import { CreateNewUser } from '@/functions/services/users';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type CreateUserVariables = {
  username: string;
  first_name: string;
  last_name: string;
  nickname: string;
  id_number: string;
  personal_number: string;
  education_level: string;
  phone_number: string;
  mobile_number: string;
  user_permissions: number;
  password:string;
};

type CreateUserResponse = {
  success: boolean;
  data: any;
  message?: string;
};

const AddUser = () => {
  const { mutate } = useMutation<CreateUserResponse, Error, CreateUserVariables>({
    mutationFn: CreateNewUser,
    onSuccess: () => {
      alert('کاربر با موفقیت اضافه شد');
    },
    onError: () => {
      alert('ساخت کاربر با خطا مواجه شد');
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const values = Object.fromEntries(formData.entries());
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
        <Label className="mr-2" htmlFor="username">
          رمز عبور
        </Label>
        <Input type='password' className="mt-2 w-full" name="password" id="password" required />
      </div>

      <div>
        <Label className="mr-2" htmlFor="first_name">
          نام
        </Label>
        <Input className="mt-2 w-full" name="first_name" id="first_name" required />
      </div>

      <div>
        <Label className="mr-2" htmlFor="last_name">
          نام خانوادگی
        </Label>
        <Input className="mt-2 w-full" name="last_name" id="last_name" required />
      </div>

      <div>
        <Label className="mr-2" htmlFor="nickname">
          نام مستعار
        </Label>
        <Input className="mt-2 w-full" name="nickname" id="nickname" required />
      </div>

      <div>
        <Label className="mr-2" htmlFor="id_number">
          کد ملی
        </Label>
        <Input name="id_number" id="id_number" maxLength={10} required className="mt-2 w-full" />
      </div>

      <div>
        <Label className="mr-2" htmlFor="personal_number">
          شماره پرسنلی
        </Label>
        <Input className="mt-2 w-full" name="personal_number" id="personal_number" required />
      </div>

      <div>
        <Label className="mr-2" htmlFor="education_level">
          سطح تحصیلات
        </Label>
        <select name="education_level" id="education_level" required className="mt-2 flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <option value="BSc">کارشناسی</option>
          <option value="Ms">کارشناسی ارشد</option>
          <option value="PhD">دکترا</option>
          <option value="Prof">پروفسور</option>
        </select>
      </div>

      <div>
        <Label className="mr-2" htmlFor="phone_number">
          شماره تلفن
        </Label>
        <Input className="mt-2 w-full" name="phone_number" id="phone_number" required />
      </div>

      <div>
        <Label className="mr-2" htmlFor="mobile_number">
          شماره موبایل
        </Label>
        <Input name="mobile_number" id="mobile_number" maxLength={10} required className="mt-2 w-full" />
      </div>

      <div>
        <Label className="mr-2" htmlFor="user_permissions">
          نقش
        </Label>
        <select name="user_permissions" id="user_permissions" required className="mt-2 w-full">
          <option value="1">سوپرادمین</option>
          <option value="2">کاربر</option>
        </select>
      </div>

      <div dir="ltr" className="md:col-span-2 ml-2">
        <Button type="submit" dir="ltr" className="w-1/5 bg-indigo-500 text-white">
          افزودن
        </Button>
      </div>
    </form>
  );
};

export default AddUser;
