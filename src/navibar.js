import "./styles.css";
import { NavLink } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

export default function Navibar() {
  return (
    <Navbar id="navibar" bg="dark" variant="dark">
      <Navbar.Brand>NB Scheduler</Navbar.Brand>
      <Nav>
        <NavLink className="navibarLink" to="/dpdisplay">
          DPs
        </NavLink>
        <NavLink className="navibarLink" to="/shifts">
          Shifts
        </NavLink>
        <NavLink className="navibarLink" to="/profile">
          Profile
        </NavLink>
        <NavLink className="navibarLink" to="/calendar">
          Calendar
        </NavLink>
        <NavLink className="navibarLink" to="/login">
          Login
        </NavLink>
        <NavLink className="navibarLink" to="/users">
          Users
        </NavLink>
      </Nav>
    </Navbar>
  );
}
