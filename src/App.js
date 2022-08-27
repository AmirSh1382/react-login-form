import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { Routes , Route } from "react-router-dom"

import Landing from './components/Landing';
import Signup from './components/Signup';
import Login from "./components/Login"

const App = () => {
  return (
    <div className='text-center'>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Landing />} />
        <Route path='/:name/:password' element={<Landing />} />
      </Routes>
    </div>
  );
};

export default App;