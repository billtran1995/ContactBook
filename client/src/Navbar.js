import React from "react";
import { useAuth0 } from "./auth0-wrapper";
import { Link } from "react-router-dom";

const NavbarWrapper = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  function handleLoginClick() {
    loginWithRedirect({});
  }

  function handleLogoutClick() {
    logout({});
  }

  return (
    <nav>
      <div className="nav-wrapper container">
        <Link to="/" className="brand-logo">
          ContactBook
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            {/* eslint-disable-next-line */}
            <a
              className="waves-effect waves-light btn"
              href="#"
              onClick={!isAuthenticated ? handleLoginClick : handleLogoutClick}
            >
              {!isAuthenticated ? "Login" : "Logout"}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarWrapper;
