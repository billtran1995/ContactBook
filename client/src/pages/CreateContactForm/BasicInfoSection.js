import React, { useContext } from "react";
import { Form, Col } from "react-bootstrap";

import { CreateContactFormContext } from "./index";

const BasicInfoSection = () => {
  const {
    fName,
    mName,
    lName,
    nName,
    handleFNameChange,
    handleMNameChange,
    handleLNameChange,
    handleNNameChange
  } = useContext(CreateContactFormContext);

  return (
    <section>
      <p className="section-header">
        <strong>Basic Info</strong>
      </p>
      <Form.Row>
        <Form.Group as={Col} controlId="fName">
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            name="fName"
            value={fName}
            onChange={handleFNameChange}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="lName">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            name="lName"
            value={lName}
            onChange={handleLNameChange}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="mName">
          <Form.Label>Middle name</Form.Label>
          <Form.Control
            type="text"
            name="mName"
            value={mName}
            onChange={handleMNameChange}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="nName">
          <Form.Label>Nick name</Form.Label>
          <Form.Control
            type="text"
            name="nName"
            value={nName}
            onChange={handleNNameChange}
          />
        </Form.Group>
      </Form.Row>
    </section>
  );
};

export default BasicInfoSection;
