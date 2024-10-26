import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InternalServerError() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      navigate("/");
    }

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">500 - خطای داخلی سرور</h1>
      <p className="text-lg mb-4">مشکلی در سرور رخ داده است. لطفاً بعداً دوباره امتحان کنید.</p>
      <p className="text-sm">
        {countdown} ثانیه دیگر به صفحه اصلی هدایت می‌شوید...
      </p>
    </div>
  );
}
