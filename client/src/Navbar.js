import React, { useState, useEffect } from "react";
import { useAuth0 } from "./auth0-wrapper";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./Navbar.css";

const NavbarWrapper = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [activePage, setActivePage] = useState();

  useEffect(() => {
    setActivePage(window.location.pathname.substr(1));
  }, []);

  const handleLoginClick = () => {
    loginWithRedirect({});
  };

  const handleLogoutClick = () => {
    logout({});
  };

  const handleActivePageChange = e => {
    setActivePage(e.target.name);
  };

  return (
    <div className="nav-bar">
      <h1 className="brand">ContactBook</h1>
      <Nav className="justify-content-center">
        {isAuthenticated && (
          <>
            <Nav.Item>
              <Link
                className={`nav-link ${
                  activePage === "contacts" ? "active" : ""
                }`}
                name="contacts"
                to="/contacts"
                onClick={handleActivePageChange}
              >
                Home
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                className={`nav-link ${
                  activePage === "create-contact" ? "active" : ""
                }`}
                name="create-contact"
                to="/create-contact"
                onClick={handleActivePageChange}
              >
                Create Contact
              </Link>
            </Nav.Item>
          </>
        )}
        <Nav.Item>
          <a
            className="nav-link"
            href="/#logout"
            onClick={!isAuthenticated ? handleLoginClick : handleLogoutClick}
          >
            {!isAuthenticated ? "Login" : "Logout"}
          </a>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default NavbarWrapper;
