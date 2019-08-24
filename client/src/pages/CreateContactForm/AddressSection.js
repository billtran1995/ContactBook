import React, { useContext } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

import { CreateContactFormContext } from "./index";

const AddressSection = () => {
  const {
    addressGroup,
    addAddress,
    removeAddress,
    handleAddressChange
  } = useContext(CreateContactFormContext);

  return (
    <section>
      <p className="section-header">
        <strong>{"Address(es) "}</strong>
        <Button onClick={addAddress} size="sm">
          <FaPlus />
        </Button>
      </p>
      {addressGroup.map(
        ({ street, city, state, zip, country, type, index }) => {
          return (
            <div key={`address-${index}`}>
              <Form.Row>
                <Form.Group as={Col} controlId="street">
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    type="text"
                    name="street"
                    placeholder="Enter street"
                    value={street}
                    onChange={e => handleAddressChange(e, index)}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    placeholder="Enter city"
                    value={city}
                    onChange={e => handleAddressChange(e, index)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="state">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    placeholder="Enter state"
                    value={state}
                    onChange={e => handleAddressChange(e, index)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="zip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    type="text"
                    name="zip"
                    placeholder="Enter zip"
                    value={zip}
                    onChange={e => handleAddressChange(e, index)}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    placeholder="Enter country"
                    value={country}
                    onChange={e => handleAddressChange(e, index)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="addressType">
                  <Form.Label>Address type</Form.Label>
                  <Form.Control
                    as="select"
                    name="type"
                    value={type}
                    onChange={e => handleAddressChange(e, index)}
                  >
                    <option>Home</option>
                    <option>Work</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Button variant="danger" onClick={() => removeAddress(index)}>
                    <FaTrashAlt />
                  </Button>
                </Form.Group>
              </Form.Row>
            </div>
          );
        }
      )}
    </section>
  );
};

export default AddressSection;
