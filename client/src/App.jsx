import React from 'react';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <>
    
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/landingPage' element={<LandingPage/>} />
      </Routes>
    </Router>

    </>
  )
}

export default App