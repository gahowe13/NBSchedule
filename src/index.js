// This is a new line
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Switch, Routes, Route } from "react-router-dom";

import Navibar from "./navibar";
import Links from "./links";
import Login from "./login";
import Nav from "./nav";
import DPDisplay from "./dpDisplay";
import Calendar from "./calendar";
import Profile from "./profile";
import UserManagement from "./userManagement";
import ShiftSelection from "./shiftSelection";

const url = "dhbz9m";
export default url;

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <main>
      <Switch>
        <Navibar />
        <Routes>
          <Route path="/" element={<Links />} />
          <Route path="login" element={<Login />} />
          <Route path="nav" element={<Nav />} />
          <Route path="dpdisplay" element={<DPDisplay />} />
          <Route path="shifts" element={<ShiftSelection />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="profile" element={<Profile />} />
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
      </Switch>
    </main>
  </StrictMode>,
  rootElement
);
