import "./styles.css";
import { Link } from "react-router-dom";

export default function Links() {
  return (
    <div className="links">
      <p>
        <Link to="/login">Login</Link>
      </p>
      <p>
        <Link to="/calendar">Calendar</Link>
      </p>
      <p>
        <Link to="/shifts">Shift Request</Link>
      </p>
    </div>
  );
}
