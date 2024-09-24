// login.tsx
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/functions/authService";
// Updated import path
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

// Define the types for the login mutation response and request
interface LoginResponse {
  // data: {
    access: string;
    refresh: string;
  // };
}

interface LoginRequest {
  username: string;
  password: string;
}

export default function LoginPage() {
  // Renamed component for clarity
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate(); // Initialize navigate function

  // Define mutation using typed request and response
  const mutation = useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("Login successful:", data);
      toast.success("با موفقیت وارد شدید");
      navigate("/app");
    },
    onError: (error) => {
      console.error("Login failed:", error);
      toast.error("ورود ناموفق بود. لطفاً دوباره تلاش کنید.");
    },
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ username, password }); // Pass credentials to the login function
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
              <Input
                id="username"
                type="text"
                placeholder="نام کاربری خود را وارد کنید"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">رمز عبور</Label>
                <a
                  href="/forgot-password"
                  className="mr-auto inline-block text-sm underline"
                >
                  رمز عبور خود را فراموش کردید؟
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="رمز عبور خود را وارد کنید"
                value={password}
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
