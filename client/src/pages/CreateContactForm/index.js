import React, { createContext } from "react";

import useInputState from "./states/InputState";
import useInputsGroupState from "./states/InputsGroupState";
import CreateContactForm from "./CreateContactForm";
import "./CreateContactForm.css";

export const CreateContactFormContext = createContext();

const CreateContactPage = () => {
  const [fName, setFName] = useInputState();
  const [mName, setMName] = useInputState();
  const [lName, setLName] = useInputState();
  const [nName, setNName] = useInputState();

  const [
    pNumberGroup,
    addPhoneNumber,
    removePhoneNumber,
    handlePNumberChange
  ] = useInputsGroupState({ number: "", type: "Home" });

  const [
    addressGroup,
    addAddress,
    removeAddress,
    handleAddressChange
  ] = useInputsGroupState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    type: ""
  });

  const [
    emailGroup,
    addEmail,
    removeEmail,
    handleEmailChange
  ] = useInputsGroupState({ email: "", type: "Home" });

  const handleFNameChange = e => setFName(e.target.value);
  const handleMNameChange = e => setMName(e.target.value);
  const handleLNameChange = e => setLName(e.target.value);
  const handleNNameChange = e => setNName(e.target.value);

  return (
    <CreateContactFormContext.Provider
      value={{
        fName,
        mName,
        lName,
        nName,
        pNumberGroup,
        addressGroup,
        emailGroup,
        addPhoneNumber,
        removePhoneNumber,
        addAddress,
        removeAddress,
        addEmail,
        removeEmail,
        handleFNameChange,
        handleMNameChange,
        handleLNameChange,
        handleNNameChange,
        handlePNumberChange,
        handleAddressChange,
        handleEmailChange
      }}
    >
      <div>
        <CreateContactForm />
      </div>
    </CreateContactFormContext.Provider>
  );
};

export default CreateContactPage;
