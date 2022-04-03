import "./styles.css";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div className="nav">
      <p>
        <Link to="/login">Login</Link>
      </p>
      <p>
        <Link to="/calendar">Calendar</Link>
      </p>
      <p>
        <Link to="/shiftRequest">Shift Request</Link>
      </p>
    </div>
  );
}
