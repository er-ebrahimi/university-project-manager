// import a from "next/link";
import * as Router from "react-router-dom";
import Dashboard from "./pages/final";
import Universities from "./pages/universities";
import routes from "./global/routes";
import Majors from "./pages/majors";
import ProfessorProfile from "./pages/professor-profile";
// import Router
export default function App() {
  return (
    <Router.BrowserRouter>
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
            element={<ProfessorProfile></ProfessorProfile>}
          ></Router.Route>
        </Router.Routes>
      </Dashboard>
    </Router.BrowserRouter>
  );
}
