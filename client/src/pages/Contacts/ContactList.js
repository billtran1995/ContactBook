import React from "react";

import ContactGroup from "./ContactGroup";

const ContactList = ({ contactList }) => {
  return (
    <div>
      {contactList.map(contactGroup => {
        let group = Object.keys(contactGroup)[0];

        return (
          <ContactGroup key={group} group={group} contactGroup={contactGroup} />
        );
      })}
    </div>
  );
};

export default ContactList;
