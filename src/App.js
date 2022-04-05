import "./App.css";
import React from "react";
import { ListGroup, Container, Form, Button, Alert } from "react-bootstrap";
import ListItem from "./ListItem";

class Todos extends React.Component {
  constructor() {
    super();
    this.state = {
      newTodo: "",
      editing: false,
      editingIndex: null,
      notification: null,
      todos: [
        {
          id: 3,
          name: "die in a ditch somewhere",
        },
      ],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.alert = this.alert.bind(this)
  }

  generateTodoId() {
    const lastTodo = this.state.todos[this.state.todos.length - 1];
    if (lastTodo) {
      return lastTodo.id + 1;
    }

    return 1;
  }

  handleSubmit() {
    const newTodo = {
      name: this.state.newTodo,
      id: this.generateTodoId(),
    };

    const todos = this.state.todos;
    todos.push(newTodo);

    this.setState({
      todos: todos,
      newTodo: "",
    });
    this.alert("New todo created!")
  }

  handleDelete(index) {
    const newTodos = this.state.todos;
    delete newTodos[index];
    this.setState({
      ...this.state,
      todos: newTodos,
    });
    this.alert('Todo deleted successfully!')
  }

  handleUpdate(index) {
    this.setState({
      ...this.state,
      editing: true,
      newTodo: this.state.todos[index].name,
      editingIndex: index,
    });
  }

  editTodo() {
    const todo = this.state.todos[this.state.editingIndex];
    todo.name = this.state.newTodo;
    const todos = this.state.todos;
    todos[this.state.editingIndex] = todo;
    this.setState({
      ...this.state,
      todos,
      editing: false,
      newTodo: "",
      editingIndex: null,
    });
    this.alert('Todo updated successfully!')
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      newTodo: event.target.value,
    });
  }

  alert(notification) {
    this.setState({
      ...this.state,
      notification,
    });

    setTimeout(() => {
      this.setState({
        ...this.state,
        notification: null,
      });
    }, 2000);
  }

  render() {
    return (
      <div>
        {this.state.notification && (
          <Alert variant="success">
            <Alert.Heading>{this.state.notification}</Alert.Heading>
          </Alert>
        )}
        <Form.Group className="mb-3">
          <Form.Control
            name="todo"
            type="text"
            placeholder="Write a todo"
            value={this.state.newTodo}
            onChange={(event) => this.handleChange(event)}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={() =>
            this.state.editing ? this.editTodo() : this.handleSubmit()
          }
          disabled={this.state.newTodo.length < 2}
        >
          {this.state.editing ? "Update" : "Add"}
        </Button>
        <ListGroup className="mt-4">
          {this.state.todos.map((todo, index) => (
            <ListItem
              key={index}
              item={todo}
              handleUpdate={this.handleUpdate}
              handleDelete={this.handleDelete}
              index={index}
            />
          ))}
        </ListGroup>
      </div>
    );
  }
}

function App() {
  return (
    <Container className="m-5">
      <h1>Todo List</h1>

      <Todos />
    </Container>
  );
}

export default App;
