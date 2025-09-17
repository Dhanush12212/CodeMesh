import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../../config.js';
import { useNavigate, Link } from 'react-router-dom';
import { socket } from '../socket/socket.js';

function LandingPage() {
  const [roomId, setRoomId] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [joinedRoom, setJoinedRoom] = useState("");

  const navigate = useNavigate();

  useEffect(() => { 
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(`${API_URL}/Auth/loginStatus`, { withCredentials: true });
        setIsLogin(response.data.isAuthenticated);
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    socket.on('connect', () => {
      console.log(`Connected: ${socket.id}`);
    }); 

    socket.on('roomJoined', ({ roomId, message }) => {
      console.log(message);
      setJoinedRoom(roomId);
      navigate(`/CodeMesh/${roomId}`);
    });

    socket.on('error', (error) => {
      alert(error.message);  
    });

    return () => {
      socket.off('connect');
      socket.off('roomJoined');
      socket.off('error');
    };
  }, [navigate]);

  const handleJoinRoom = () => { 
    if (!roomId.trim()) {
      alert("Please enter a valid Room ID.");
      return;
    }
    socket.emit('joinRoom', roomId);
  }; 

  const handleCreateRoom = () => {
    if (!roomId.trim()) {
      alert("Please enter a Room ID to create.");
      return;
    }
    socket.emit('joinRoom', roomId); 
  };

  const handleLogout = async () => {
    try {
      await axios.put(`${API_URL}/Auth/logout`, {}, { withCredentials: true });
      setIsLogin(false);
      navigate('/login');
    } catch (error) {
      console.error("Logout Error: ", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 text-white px-6 sm:px-0 relative overflow-hidden">

      {/* Auth Button */}
      {isLogin ? (
        <button
          className="absolute top-6 right-6 bg-gradient-to-r from-red-700 to-red-900 px-8 py-3 rounded-xl font-semibold shadow-lg hover:from-red-600 hover:to-red-800 transition-all duration-300"
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        <Link to='/register'>
          <button 
            className="absolute top-6 right-6 bg-gradient-to-r from-zinc-700 to-zinc-900 px-8 py-3 rounded-xl font-semibold shadow-lg hover:from-zinc-800 hover:to-black transition-all duration-300"
          >
            Sign In
          </button>
        </Link>
      )}

      {/* Main Container */}
      <div className="flex flex-col py-16 sm:py-28 items-center text-center gap-10 bg-white/10 backdrop-blur-2xl p-10 sm:p-14 rounded-3xl shadow-2xl border border-white/20 max-w-4xl w-full">

        {/* Hero Text */}
        <div className="flex flex-col gap-4 text-white">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-700 drop-shadow-xl">
            Code Together, Anywhere, Anytime!
          </h1>
          <p className="text-lg sm:text-xl font-medium text-gray-200 opacity-90 drop-shadow-md leading-relaxed">
            Collaborate in real-time with <span className="text-blue-400 font-semibold">seamless coding</span> 
            & <span className="text-purple-400 font-semibold">instant updates</span>.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-6 flex-wrap justify-center">
          <button 
            className="px-8 py-4 text-lg font-semibold text-white rounded-xl shadow-md bg-gradient-to-r from-blue-500 to-blue-800 hover:from-blue-700 hover:to-blue-900 focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            onClick={handleCreateRoom}
          >
            Create Room
          </button>
          <button 
            className="px-8 py-4 text-lg font-semibold text-white rounded-xl shadow-md bg-gradient-to-r from-green-500 to-green-800 hover:from-green-600 hover:to-green-900 focus:ring-2 focus:ring-green-400 transition-all duration-300"
            onClick={handleJoinRoom}
          >
            Join Room
          </button>
        </div> 

        {/* Input */}
        <div className="flex w-full">
          <input 
            type="text" 
            name="code"
            placeholder="Enter Room Code"
            className="w-full px-5 py-3 rounded-lg text-lg bg-gray-800 text-white border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none transition-all duration-300"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)} 
          />
        </div> 
      </div>
    </div>
  );
}

export default LandingPage;
