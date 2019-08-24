import { combineReducers } from "redux";
import contactListReducer from "./contactList.reducer";

export default combineReducers({
  contactList: contactListReducer
});
