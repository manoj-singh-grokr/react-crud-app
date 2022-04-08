import "./App.css";
import React from "react";
import Todos from "./components/Todos";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container className="m-5">
      <h1>Todo List</h1>
      <Todos />
    </Container>
  );
}

export default App;
