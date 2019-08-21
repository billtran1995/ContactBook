import { GET, POST, PATCH, DELETE, CALL_API } from "../constants";

export const runActionGet = (url, reducerActionType) => ({
  type: CALL_API,
  url,
  method: GET,
  reducerActionType
});

export const runActionPost = (url, reducerActionType, payload) => ({
  type: CALL_API,
  url,
  method: POST,
  reducerActionType,
  payload
});

export const runActionPatch = (url, reducerActionType, payload) => ({
  type: CALL_API,
  url,
  method: PATCH,
  reducerActionType,
  payload
});

export const runActionDelete = (url, reducerActionType, payload) => ({
  type: CALL_API,
  url,
  method: DELETE,
  reducerActionType,
  payload
});
