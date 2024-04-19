// import a from "next/link";
import * as Router from "react-router-dom";
import Dashboard from "./pages/final";
import Universities from "./pages/universities";
import routers from "./global/rooters";
import Majors from "./pages/majors";
// import Router
export default function App() {
  return (
    <Dashboard>
      <Router.BrowserRouter>
        <Router.Routes>
          <Router.Route
            path="/"
            element={<Universities></Universities>}
          ></Router.Route>
          <Router.Route
            path={routers.professors(":major")}
            element={<Majors></Majors>}
          ></Router.Route>
        </Router.Routes>
      </Router.BrowserRouter>
    </Dashboard>
  );
}
