import { GET_CONTACT_LIST } from "../constants";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTACT_LIST:
      return [...action.payload];
    default:
      return state;
  }
};
