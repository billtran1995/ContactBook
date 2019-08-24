import React, { useContext } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

import { CreateContactFormContext } from "./index";

const PhoneNumberSection = () => {
  const {
    pNumberGroup,
    addPhoneNumber,
    removePhoneNumber,
    handlePNumberChange
  } = useContext(CreateContactFormContext);

  return (
    <section>
      <p className="section-header">
        <strong>{"Phone Number(s) "}</strong>
        <Button onClick={addPhoneNumber} size="sm">
          <FaPlus />
        </Button>
      </p>
      {pNumberGroup.map(({ number, type, index }) => {
        return (
          <div key={`phoneNumber-${index}`}>
            <Form.Row>
              <Form.Group as={Col} controlId="pNumber">
                <Form.Control
                  type="text"
                  name="number"
                  placeholder="Enter phone number"
                  value={number}
                  onChange={e => handlePNumberChange(e, index)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="pNumberType">
                <Form.Control
                  as="select"
                  name="type"
                  value={type}
                  onChange={e => handlePNumberChange(e, index)}
                >
                  <option>Home</option>
                  <option>Work</option>
                  <option>Cellphone</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Button
                  variant="danger"
                  onClick={() => removePhoneNumber(index)}
                >
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

export default PhoneNumberSection;
