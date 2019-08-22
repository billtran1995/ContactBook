import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";

import { useAuth0 } from "../../auth0-wrapper";
import { runActionGet } from "../../actions";
import { GET_CONTACT_LIST } from "../../constants";
import ContactList from "./ContactList";

const ContactsPage = ({ contactList, getContactList }) => {
  const { user } = useAuth0();

  useEffect(() => user && getContactList(user), [getContactList, user]);

  if (!contactList.length)
    return (
      <div style={{ margin: "30% 50%" }}>
        <Spinner animation="border" variant="info" />
      </div>
    );

  return <ContactList contactList={contactList} />;
};

const mapStateToProps = state => ({
  contactList: state.contactList
});

const mapDispatchToProps = dispatch => ({
  getContactList: user =>
    dispatch(
      runActionGet(`/api/contacts/getContacts/${user.id}`, GET_CONTACT_LIST)
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactsPage);
