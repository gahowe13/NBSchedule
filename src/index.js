// This is a new line
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Nav from "./nav";
import Login from "./login";
import Calendar from "./calendar";
import UserManagement from "./userManagement";
import ShiftRequest from "./shiftRequest";

const url = "dhbz9m";
export default url;

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Nav />} />
        <Route path="login" element={<Login />} />
        <Route path="shiftRequest" element={<ShiftRequest />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="users" element={<UserManagement />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </Router>
  </StrictMode>,
  rootElement
);
