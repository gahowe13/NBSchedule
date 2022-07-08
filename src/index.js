import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Switch, Routes, Route } from "react-router-dom";

import Navibar from "./Navbar/navibar";
import Login from "./SignIn/login";
import DPDisplay from "./DPRequests/dpDisplay";
import DPManagement from "./DPRequests/dpManagement/dpManagement";
import Calendar from "./DPRequests/calendar";
import Schedule from "./Schedule/schedule";
import Profile from "./UserSettings/profile";
import UserManagement from "./UserManagement/userManagement";
import ShiftSelection from "./Shifts/shiftSelection";

const url = "https://clcrz5.sse.codesandbox.io";
export default url;

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <main>
      <Switch>
        <Navibar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="dpdisplay" element={<DPDisplay />} />
          <Route path="dpManagement" element={<DPManagement />} />
          <Route path="shifts" element={<ShiftSelection />} />
          <Route path="calendar/:dp" element={<Calendar />} />
          <Route path="schedule/:dp" element={<Schedule />} />
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
