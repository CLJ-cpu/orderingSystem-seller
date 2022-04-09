import request from "../request/request.js";

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