import React from "react";
import { BrowserRouter } from "react-router-dom";

import NavBar from "./Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    </div>
  );
}

export default App;
