import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/functions/authService";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/functions/Usercontext";
import "../global/css/login.css";

interface LoginResponse {
  access: string;
  refresh: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const { loginSuccess } = useUser();

  const mutation = useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async (credentials: LoginRequest) => {
      return await login(credentials, loginSuccess); // Return the login response
    },
    onSuccess: (data) => {
      console.log("Login successful:", data);
      toast.success("با موفقیت وارد شدید");
      navigate("/app"); // Navigate to the protected route
    },
    onError: (error) => {
      console.error("Login failed:", error);
      toast.error("ورود ناموفق بود. لطفاً دوباره تلاش کنید.");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ username, password });
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <form onSubmit={handleSubmit} className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">ورود</h1>
            <p className="text-balance text-muted-foreground">
              نام کاربری و رمز عبور خود را برای ورود به سایت وارد کنید
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">نام کاربری</Label>
              <input
                id="username"
                type="text"
                dir="ltr"
                placeholder="نام کاربری خود را وارد کنید"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">رمز عبور</Label>
              </div>
              <input
                id="password"
                type="password"
                dir="ltr"
                placeholder="رمز عبور خود را وارد کنید"
                value={password}
                className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {mutation.isPending ? "در حال ورود..." : "ورود"}
            </Button>
          </div>
        </form>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/cube.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
