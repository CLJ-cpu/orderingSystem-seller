import './App.css';
import axios from 'axios'
import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home'
import Login from './pages/login'
function App() {
  // useEffect(() => {
  //   fetch()
  // }, [])
  // const fetch = () => {
  //   axios.get('http://localhost:5000/api/dishes/list')
  //     .then(res => console.log(res))
  // }
  return (
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
  );
}

export default App;
