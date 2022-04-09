import React from "react";
import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";
import App from "../App.js";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Todo from "../pages/todo";
import Me from "../pages/me";
import Message from "../pages/message/index.jsx";
const routes = [
  {
    path: "/login/*",
    element: <Login />,
  },
  {
    path: "/register/*",
    element: <Register />,
  },
  {
    path: "/home/*",
    element: <Home />,
    requireLogin: true,
  },
  {
    path: "/todo/*",
    element: <Todo />,
    requireLogin: true,
  },
  {
    path: "/message/*",
    element: <Message />,
    requireLogin: true,
  },
  {
    path: "/personalCenter/*",
    element: <Me />,
    requireLogin: true,
  },
];
const index = (props) => {
  const token = localStorage.getItem("token");
  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <App>
              <Routes>
                {routes.map((item) => {
                  return !item.requireLogin ? (
                    <Route path={item.path} key={item.path} exact element={item.element} />
                  ) : token ? (
                    <Route path={item.path} key={item.path} exact element={item.element} />
                  ) : (
                    <Route path="*" key={item.path} element={<Navigate to="/login" />} />
                  );
                })}
              </Routes>
            </App>
          }
        ></Route>
      </Routes>
    </Router>
  );
};
export default index;
