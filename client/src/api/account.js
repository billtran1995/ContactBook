import axios from "axios";

let accountApis;
const ACCOUNT_URL = "/api/accounts";

export const initAccountApis = token => {
  const headers = { Authorization: `Bearer ${token}` };

  accountApis = axios.create({
    headers
  });
};

export const createUser = body => {
  return accountApis.post(`${ACCOUNT_URL}/create`, body);
};
