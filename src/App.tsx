// import a from "next/link";
import * as Router from "react-router-dom";
import Dashboard from "./pages/final";
import Universities from "./pages/universities";
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
        </Router.Routes>
      </Router.BrowserRouter>
    </Dashboard>
  );
}
