import React from 'react';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './pages/LandingPage';
import { Editor } from '@monaco-editor/react';

function App() {
  return (
    <>
    
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/landingPage' element={<LandingPage/>} />
        <Route path='/Editor' element={<Editor/>} />
      </Routes>
    </Router>

    </>
  )
}

export default App