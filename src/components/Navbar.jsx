import {
  Link,
  NavLink,
} from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar__inner">

        <Link
          to="/"
          className="navbar__logo"
        >
          <span className="navbar__logo-icon">
            ♫
          </span>

          RingBox
        </Link>

        <nav className="navbar__links">

          <NavLink to="/">
            Home
          </NavLink>

          <NavLink to="/ringtones">
            Explore
          </NavLink>

          <NavLink to="/categories">
            Categories
          </NavLink>

            <NavLink to="/favorites">
              Favorites
            </NavLink>
            <NavLink to="/recent">
              Recent
            </NavLink>

            <NavLink to="/about">
              About
            </NavLink>
        </nav>

        <Link
          to="/ringtones"
          className="navbar__cta"
        >
          Browse Sounds
        </Link>

      </div>
    </header>
  );
}

export default Navbar;