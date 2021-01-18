import "./App.css";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import ListView from "./components/ListView";
function App() {
  return (
    <div className="App">
      <Navbar className="navbar" bg="light">
        <Navbar.Brand>The Shoppies</Navbar.Brand>
      </Navbar>
      <ListView />
    </div>
  );
}

export default App;
