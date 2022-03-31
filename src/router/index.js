import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from '../App.js'
import Home from "../pages/home";
import Login from "../pages/login";
import Todo from "../pages/todo";
import Me from "../pages/me/index.jsx";
import Message from "../pages/message/index.jsx";

const index = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <App>
              <Routes>
                <Route path="/login" exact element={<Login />} />
                <Route path="/home" exact element={<Home />} />
                <Route path="/todo" exact element={<Todo />} />
                <Route path="/message" exact element={<Message />} />
                <Route path="/personalCenter" exact element={<Me />} />
              </Routes>
            </App>
          }
        ></Route>
      </Routes>
    </Router>
  );
};
export default index;
