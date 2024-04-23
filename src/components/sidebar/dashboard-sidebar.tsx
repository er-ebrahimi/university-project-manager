import {
  Bell,
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import routes from "@/global/routes";
import { useLocation } from "react-router-dom";
export default function SidebarDashboard() {
  const pathname = useLocation().pathname;
  const selectButton = (router: string) => {
    if (router === pathname)
      return "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary";
    else
      return "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";
  };
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <a href="/" className="flex items-center gap-2 ">
            <Package2 className="h-6 w-6" />
            <span className="pl-1">مدیریت</span>
          </a>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">تغییر پیام</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <a
              href={routes.dashboard}
              className={selectButton(routes.dashboard)}
            >
              <Home className="h-4 w-4" />
              میزکار
            </a>
            <a
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <ShoppingCart className="h-4 w-4" />
              سفارشات
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Package className="h-4 w-4" />
              محصولات{" "}
            </a>
            <a
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Users className="h-4 w-4" />
              کاربران
            </a>
            <a
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <LineChart className="h-4 w-4" />
              آنالیز
            </a>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4 font-medium">
              <CardTitle>مدیریت پروژه</CardTitle>
              <CardDescription>چگونه پروژه خود را مدیریت کنی؟</CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                آموزش
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
