import React from "react";
import { ListGroup } from "react-bootstrap";

const Contact = ({ contact }) => {
  return (
    <ListGroup.Item className="contact-item">
      {contact.firstName + " " + contact.lastName}
    </ListGroup.Item>
  );
};

export default Contact;
