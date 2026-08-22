import {
  Link,
  NavLink,
} from "react-router-dom";

import {
  useState,
} from "react";

import "./Navbar.css";

function Navbar() {
  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container navbar__inner">

        <Link
          to="/"
          className="navbar__logo"
          onClick={closeMenu}
        >
          <span className="navbar__logo-icon">
            ♫
          </span>

          RingBox
        </Link>

        <nav
          className={`navbar__links ${
            menuOpen
              ? "navbar__links--open"
              : ""
          }`}
        >
          <NavLink
            to="/"
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/ringtones"
            onClick={closeMenu}
          >
            Explore
          </NavLink>

          <NavLink
            to="/categories"
            onClick={closeMenu}
          >
            Categories
          </NavLink>

          <NavLink
            to="/favorites"
            onClick={closeMenu}
          >
            Favorites
          </NavLink>

          <NavLink
            to="/recent"
            onClick={closeMenu}
          >
            Recent
          </NavLink>

          <NavLink
            to="/about"
            onClick={closeMenu}
          >
            About
          </NavLink>
        </nav>

        <Link
          to="/ringtones"
          className="navbar__cta"
        >
          Browse Sounds
        </Link>

        <button
          type="button"
          className={`navbar__menu-button ${
            menuOpen
              ? "navbar__menu-button--open"
              : ""
          }`}
          onClick={() =>
            setMenuOpen(
              (current) =>
                !current
            )
          }
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={
            menuOpen
          }
        >
          <span />
          <span />
          <span />
        </button>

      </div>
    </header>
  );
}

export default Navbar;