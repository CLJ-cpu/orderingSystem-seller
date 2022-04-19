import request from "../request/request.js";
import { stringify } from "querystring";

export const getStore = (params) => {
  return request(`/store?${stringify(params)}`);
};

export const updateStore = (data) => {
  return request(`/store`, {
    method: "PUT",
    body: data,
  });
};
