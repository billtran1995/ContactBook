import React, { useEffect } from "react";
import { connect } from "react-redux";
import { FadeLoader } from "react-spinners";

import { useAuth0 } from "../../auth0-wrapper";
import { runActionGet } from "../../actions";
import { GET_CONTACT_LIST } from "../../constants";
import ContactList from "./ContactList";
import "./Contacts.css";

const ContactsPage = ({ contactList, getContactList }) => {
  const { user } = useAuth0();

  useEffect(() => user && getContactList(user), [getContactList, user]);

  if (!contactList.length)
    return (
      <div className="contact-list-loader">
        <FadeLoader color="#26A65B" />
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
