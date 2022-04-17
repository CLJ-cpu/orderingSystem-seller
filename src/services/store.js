import request from "../request/request.js";
import { stringify } from "querystring";
export const getStore = (params) => {
  return request(`/store?${stringify(params)}`);
};
