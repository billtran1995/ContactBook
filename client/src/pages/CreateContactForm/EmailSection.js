import React, { useContext } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

import { CreateContactFormContext } from "./index";

const EmailSection = () => {
  const { emailGroup, addEmail, removeEmail, handleEmailChange } = useContext(
    CreateContactFormContext
  );

  return (
    <section>
      <p className="section-header">
        <strong>{"Email(s) "}</strong>
        <Button onClick={addEmail} size="sm">
          <FaPlus />
        </Button>
      </p>
      {emailGroup.map(({ email, type, index }) => {
        return (
          <div key={`email-${index}`}>
            <Form.Row>
              <Form.Group as={Col} controlId="email">
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={e => handleEmailChange(e, index)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="emailType">
                <Form.Control
                  as="select"
                  name="type"
                  value={type}
                  onChange={e => handleEmailChange(e, index)}
                >
                  <option>Home</option>
                  <option>Work</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Button variant="danger" onClick={() => removeEmail(index)}>
                  <FaTrashAlt />
                </Button>
              </Form.Group>
            </Form.Row>
          </div>
        );
      })}
    </section>
  );
};

export default EmailSection;
