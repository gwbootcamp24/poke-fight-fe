import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <ul className="border- flex justify-evenly border-b-2 border-gray-700 bg-gray-100 p-4 text-blue-950">
      <li>
        <NavLink to="">Home</NavLink>
      </li>
      <li>
        <NavLink to="pokemon">Pokemon</NavLink>
      </li>
    </ul>
  );
}

export default Navbar;
