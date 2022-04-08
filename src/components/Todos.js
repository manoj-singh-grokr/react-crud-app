import React from "react";
import { ListGroup, Form, Button, Alert } from "react-bootstrap";
import ListItem from "./ListItem";
import axios from "axios";

class Todos extends React.Component {
    constructor() {
      super();
      this.state = {
        newTodo: "",
        editing: false,
        editingIndex: null,
        notification: null,
        todos: [],
      };
      this.apiUrl = "https://624c0b7171e21eebbcf93a9b.mockapi.io";
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleUpdate = this.handleUpdate.bind(this);
      this.editTodo = this.editTodo.bind(this)
      this.alert = this.alert.bind(this);
    }
  
    async componentDidMount() {
      const todos = await axios.get(this.apiUrl + "/todos");
      this.setState({
        ...this.state,
        todos: todos.data,
      });
    }
  
    async handleSubmit() {
      const newTodo = {
        name: this.state.newTodo,
      };
  
      const response = await axios.post(this.apiUrl + "/todos", newTodo);
      console.log(response);
  
      const todos = this.state.todos;
      todos.push(response.data);
  
      this.setState({
        todos: todos,
        newTodo: "",
      });
  
      this.alert("New todo created!");
    }
  
    async handleDelete(index) {
      const newTodos = this.state.todos;
      const todo = this.state.todos[index]
      delete newTodos[index];
      
      await axios.delete(`${this.apiUrl}/todos/${todo.id}`);
      this.setState({
        ...this.state,
        todos: newTodos,
      });
      this.alert("Todo deleted successfully!");
    }
  
    handleUpdate(index) {
      this.setState({
        ...this.state,
        editing: true,
        newTodo: this.state.todos[index].name,
        editingIndex: index,
      });
    }
  
    async editTodo() {
      const todo = this.state.todos[this.state.editingIndex];
      todo.name = this.state.newTodo;
      const todos = this.state.todos;
      todos[this.state.editingIndex] = todo;
      await axios.put(`${this.apiUrl}/todos/${todo.id}`, todo);
      this.setState({
        ...this.state,
        todos,
        editing: false,
        newTodo: "",
        editingIndex: null,
      });
      this.alert("Todo updated successfully!");
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

  export default Todos;