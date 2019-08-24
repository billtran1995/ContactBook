import { GET_CONTACT_LIST } from "../constants";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTACT_LIST:
      let contactList = action.payload;
      let groupedContactList = new Map();

      contactList.forEach(contact => {
        let firstLetterOfFirstName = contact.firstName.substr(0, 1);

        if (!groupedContactList.has(firstLetterOfFirstName)) {
          groupedContactList.set(firstLetterOfFirstName, [contact]);
        } else {
          groupedContactList.set(firstLetterOfFirstName, [
            ...groupedContactList.get(firstLetterOfFirstName),
            contact
          ]);
        }
      });

      groupedContactList = Array.from(groupedContactList).map(group => ({
        [group[0]]: group[1]
      }));
      return groupedContactList;
    default:
      return state;
  }
};
