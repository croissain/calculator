import { Link, Outlet } from "react-router-dom";
import "./style.scss"

export default function Layout() {
  return <>
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/history">History</Link>
        </li>
      </ul>
  </nav>
  <Outlet />
  </>
}