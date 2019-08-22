import React from "react";
import { ListGroup } from "react-bootstrap";
import Contact from "./Contact";

const ContactGroup = ({ contactGroup, group }) => {
  return (
    <>
      <br />
      <ListGroup key={group}>
        <ListGroup.Item>
          <h5>{group}</h5>
          <ListGroup variant="flush">
            {contactGroup[group].map(contact => (
              <Contact contact={contact} />
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default ContactGroup;
