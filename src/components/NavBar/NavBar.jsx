import { NavLink } from "react-router-dom"

export const NavBar = () => {
  return (
    <nav className="w-full p-4">
      <ul>
        <li><NavLink to="/">Forside</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
      </ul>
    </nav>
  )
}