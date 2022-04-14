import request from "../request/request.js";
import { stringify } from 'querystring';

export const login = (data) => {
  return request("/users/login", {
    method: "POST",
    body: data,
  });
};
export const register = (data) => {
  return request("/users", {
    method: "POST",
    body: data,
  })
}
export const getUser=(params)=>{
  return request(`/user?${stringify(params)}`)
}