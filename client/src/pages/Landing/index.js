import React from "react";
import { Redirect } from "react-router-dom";

import "./Landing.css";
import { useAuth0 } from "../../auth0-wrapper";

const LandingPage = () => {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) return <Redirect to="/contacts" />;

  return <div className="welcome-message">Welcome to ContactBook!</div>;
};

export default LandingPage;
