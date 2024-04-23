// import a from "next/link";
import * as Router from "react-router-dom";
import Dashboard from "./pages/final";
import Universities from "./pages/universities";
import routes from "./global/routes";
import Majors from "./pages/majors";
import ProfessorProfile from "./pages/professor-profile";
import MoreInfo from "./pages/more-info";
// import Router
import { DirectionProvider } from "@radix-ui/react-direction";

export default function App() {
  return (
    <Router.BrowserRouter>
      <DirectionProvider dir="rtl">
        <Dashboard>
          <Router.Routes>
            <Router.Route
              path="/"
              element={<Universities></Universities>}
            ></Router.Route>
            <Router.Route
              path={routes.professors(":major")}
              element={<Majors></Majors>}
            ></Router.Route>
            <Router.Route
              path={routes.professor(":name")}
              element={<ProfessorProfile></ProfessorProfile>}
            ></Router.Route>
            <Router.Route
              path={routes.moreInfo(":name")}
              element={<MoreInfo></MoreInfo>}
            ></Router.Route>
          </Router.Routes>
        </Dashboard>
      </DirectionProvider>
    </Router.BrowserRouter>
  );
}
