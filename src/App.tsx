// import a from "next/link";
import * as Router from "react-router-dom";
import Dashboard from "./pages/final";
import Universities from "./pages/universities";
import routes from "./global/routes";
import Majors from "./pages/majors";
// import ProfessorProfile from "./pages/professor-profile";
import MoreInfo from "./pages/more-info";
// import Router
import { DirectionProvider } from "@radix-ui/react-direction";
import Login from "./pages/login";
import Colleges from "./pages/colleges";
import AdminUsers from "./pages/admin/users";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./functions/Usercontext";
import RequirePermission from "./functions/Requrepermision";
function AppRoute() {
  // const userPermissionsName = useUserPermissionsName();
  // console.log("🚀 ~ AppRoute ~ userPermissionsName:", userPermissionsName)
  return (
    <DirectionProvider dir="rtl">
      <Dashboard>
        <Router.Routes>
          <Router.Route
            path="/"
            element={<Universities></Universities>}
          ></Router.Route>
          <Router.Route
          
            path="/admin/users"
            // element={<AdminUsers />}
            element={
              <RequirePermission permissionName="SuperAdmin">
                <AdminUsers />
              </RequirePermission>
            }
          ></Router.Route>
          <Router.Route
            path={"/Colleges/:id"}
            element={<Colleges />}
          ></Router.Route>
          <Router.Route
            path={"/professors/:major"}
            element={<Majors></Majors>}
          ></Router.Route>
          {/* <Router.Route
            path={routes.professor(":name")}
            element={<ProfessorProfile></ProfessorProfile>}
          ></Router.Route> */}
          <Router.Route
            path={routes.Project(":id")}
            element={<MoreInfo></MoreInfo>}
          ></Router.Route>
        </Router.Routes>
      </Dashboard>
    </DirectionProvider>
  );
}

export default function App() {
  return (
    <Router.BrowserRouter>
      <DirectionProvider dir="rtl">
        <Toaster position="top-center" />
        <UserProvider>
          {" "}
          <div dir="rtl" className="font-custom">
            <Router.Routes>
              <Router.Route
                path="app/*"
                element={<AppRoute></AppRoute>}
              ></Router.Route>
              <Router.Route
                path={"/"}
                element={<Router.Navigate to={"app/"} />}
              ></Router.Route>
              <Router.Route
                path={routes.login}
                element={<Login></Login>}
              ></Router.Route>
            </Router.Routes>
          </div>
        </UserProvider>
      </DirectionProvider>
    </Router.BrowserRouter>
  );
}
