import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets.js';
import axios from 'axios';
import API_URL from '../../config.js';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  

  const [code, setCode] = useState("");
  const [showInput, setShowInput] = useState(false)
  const navigate = useNavigate();
 
  
  
  const handleJoinRoom = () => setShowInput(true);

  const enteredCode = async(e) => { 
    e.preventDefault();
    
    if (!code.trim()) return;
    try {
      const response = await axios.post(`${API_URL}/Code/landingPage`,
        {code},
        {withCredentials: true},
      );
      console.log("Successfully recieved Code: ", response.data);
      navigate('/Editor');
    } catch(error) {
      console.error("Failed to receive code: ", error.message);
    } 
  };

  const handleLogout = async() => {
    try {
      await axios.put(`${API_URL}/Auth/logout`,{},
        {withCredentials:true},
      )
      console.log("Logout Successfully");
      navigate('/login')
    } catch(error) {
      console.error("Logout Error: ", error.response ? error.response.data : error.message);

    }
  }


  return (
    <> 
    {/* Logout button */}
    <div className="absolute top-4 right-4 z-10">
      <button 
          className="Button px-6 py-3 text-lg font-bold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 focus:ring-2 focus:ring-red-300"
          onClick={handleLogout}
      >
        Logout
      </button>
    </div>
 
    <div className="w-full h-screen relative flex flex-col items-center justify-center px-4 sm:px-0">

      {/* Background Image */}
      <img 
        className="absolute w-full h-full object-cover brightness-50" 
        src={assets.LandingBackground} 
        alt="Background" 
      /> 

      {/* Content Wrapper */}
      <div className="absolute flex flex-col py-20 sm:py-40 items-center text-center gap-8 bg-white/10 backdrop-blur-xl p-8 sm:p-12 rounded-3xl shadow-xl border border-white/20">
        
        {/* Title & Description */}
        <div className="flex flex-col gap-4 text-white">
          <h1 className="Text lg:text-5xl md:text-5xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600 drop-shadow-lg text-center tracking-tight">
            Code Together, Anywhere, Anytime!
          </h1>

          <p className="desc text-lg sm:text-2xl font-medium sm:font-semibold text-gray-200 opacity-90 drop-shadow-md text-center leading-relaxed">
            Collaborate in real-time with <span className="text-blue-400">seamless coding</span> & <span className="text-purple-400">instant updates</span>.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-6">
          <button 
            className="Button px-6 sm:px-8 py-3 sm:py-4 text-lg font-semibold text-white bg-blue-500 rounded-xl shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition-all duration-300 cursor-pointer"
            onClick={handleJoinRoom}
          >
            Create Room
          </button>
          <button 
            className="Button px-6 sm:px-8 py-3 sm:py-4 text-lg font-semibold text-white bg-green-500 rounded-xl shadow-md hover:bg-green-600 focus:ring-2 focus:ring-green-300 transition-all duration-300 cursor-pointer"
            onClick={handleJoinRoom}
          >
            Join Room
          </button>
        </div>

        {/* Create and Join Code */}
        { showInput && 
        <form onSubmit={enteredCode}>
          <div className='items-center mt-4'>
            <label htmlFor="Code" className='text-white lg:text-2xl sm:text-lg md:text-xl mr-3'>Enter the Code: </label>
            <input 
              type="text" 
              name='code'
              className='border-b-2 outline-none text-white text-center px-4 py-1 lg:text-xl md:text-lg ' 
              onChange={(e) => setCode(e.target.value)}
              />
            <button type="submit" className="mt-2 px-3 py-3 w-28 ml-4 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Join
            </button>
          </div> 
        </form>
        }
        
      </div>
    </div>
    </> 
  );
}

export default LandingPage;
