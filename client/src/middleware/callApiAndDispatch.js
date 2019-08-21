import axios from "axios";
import { GET, POST, PATCH, DELETE } from "../constants";

export default ({ dispatch }) => next => action => {
  if (action.type === "CALL_API") {
    const url = action.url;
    let body;

    switch (action.method) {
      case GET:
        axios.get(url).then(({ status, data }) => {
          if (status === 200) {
            return dispatch({
              type: action.reducerActionType,
              payload: data
            });
          }
        });
        break;
      case POST:
        body = action.payload;
        axios.post(url, body).then(({ status, data }) => {
          if (status === 200) {
            return dispatch({
              type: action.reducerActionType,
              payload: body
            });
          }
        });
        break;
      case PATCH:
        body = action.payload;
        axios.patch(url, body).then(({ status, data }) => {
          if (status === 200) {
            return dispatch({
              type: action.reducerActionType,
              payload: body
            });
          }
        });
        break;
      case DELETE:
        let { id } = action.payload;
        axios.delete(url).then(({ status, data }) => {
          if (status === 200) {
            return dispatch({
              type: action.reduceActionType,
              payload: { id }
            });
          }
        });
        break;
      default:
        break;
    }
  }

  next(action);
};
