import React from "react";
import { ListGroup } from "react-bootstrap";
import Contact from "./Contact";

const ContactGroup = ({ contactGroup, group }) => {
  return (
    <>
      <br />
      <ListGroup>
        <ListGroup.Item>
          <h5>{group}</h5>
          <ListGroup variant="flush">
            {contactGroup[group].map(contact => (
              <Contact key={`contact - ${contact.id}`} contact={contact} />
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default ContactGroup;
