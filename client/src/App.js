import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import NavBar from "./Navbar";
import PrivateRoute from "./PrivateRoute";
import LandingPage from "./pages/Landing";
import ContactsPage from "./pages/Contacts";
import CreateContactPage from "./pages/CreateContactForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Container>
          <Switch>
            <PrivateRoute path="/contacts" component={ContactsPage} />
            <PrivateRoute
              path="/create-contact"
              component={CreateContactPage}
            />
            <Route path="/" component={LandingPage} />
          </Switch>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
