import React from "react";
import { Form, Button } from "react-bootstrap";

import BasicInfoSection from "./BasicInfoSection";
import PhoneNumberSection from "./PhoneNumberSection";
import AddressSection from "./AddressSection";
import EmailSection from "./EmailSection";

const CreateContactForm = () => {
  return (
    <Form>
      <BasicInfoSection />
      <PhoneNumberSection />
      <AddressSection />
      <EmailSection />
      <div className="col-md-12 text-center">
        <Button variant="success" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default CreateContactForm;
