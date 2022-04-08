import React from "react";
import { ListGroup, Button } from "react-bootstrap";

export default function ListItem(props) {
  const { item, handleUpdate, handleDelete, index } = props;
  return (
    <ListGroup.Item>
      <Button variant="info" className="me-4" onClick={() => handleUpdate(index)}>
        U
      </Button>
      {item.name}{" "}
      <Button variant="danger" className="mx-4" onClick={() => handleDelete(index)}>
        X
      </Button>
    </ListGroup.Item>
  );
}
