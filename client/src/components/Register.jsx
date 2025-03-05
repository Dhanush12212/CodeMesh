import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { User, Mail, Lock } from "lucide-react";  
import API_URL from "../../config";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/Auth/register`,
        { username, email, password },
        { withCredentials: true }
      );

      console.log("Registration successful:", response.data);
      setMessage({ text: "🎉 Registration Successful! Redirecting...", type: "success" });

      setTimeout(() => {
        navigate("/blog");
      }, 1500);
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      setMessage({ text: " Registration Failed. Try again.", type: "error" });
    }
  };

  return (
    <>  
      <div className="w-full h-screen relative flex flex-col items-center justify-center px-4 sm:px-0">
        {/* Background Image */}
        <img className="absolute w-full h-full object-cover brightness-50" src={assets.LoginBackground} alt="Background" />

        {/* Navbar */}
        <div className="absolute top-0 left-0 w-full z-10">
          <Navbar />
        </div>

        {/* Register Form */}
        <form 
          onSubmit={handleSubmit} 
          
          className="relative z-20 w-full max-w-[440px] bg-transparent border-2 border-white/50 rounded-3xl flex flex-col items-center text-blue-300 p-6 sm:p-10 h-[480px] justify-center  "
          style={{ backdropFilter: "blur(20px)", boxShadow: "0 0 30px rgba(0,0,0,.5)" }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">Register</h1>

          {/* Success/Error Message */}
          {message.text && (
            <p className={`text-lg font-semibold mb-4 ${message.type === "success" ? "text-green-400" : "text-red-400"}`}>
              {message.text}
            </p>
          )}

          {/* Username Field */}
          <div className="w-full mb-4 flex items-center border border-white/30 rounded-md p-3 sm:p-4">
            <User className="text-white mr-3" size={20} />
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-transparent placeholder-white text-white outline-none text-base sm:text-lg"
              placeholder="Username"
            />
          </div>

          {/* Email Field */}
          <div className="w-full mb-4 flex items-center border border-white/30 rounded-md p-3 sm:p-4">
            <Mail className="text-white mr-3" size={20} />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent placeholder-white text-white outline-none text-base sm:text-lg"
              placeholder="Email"
            />
          </div>

          {/* Password Field */}
          <div className="w-full mb-4 flex items-center border border-white/30 rounded-md p-3 sm:p-4">
            <Lock className="text-white mr-3" size={20} />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent placeholder-white text-white outline-none text-base sm:text-lg"
              placeholder="Password"
            />
          </div>

          {/* Submit */}
          <button 
            type="submit" 
            className="mt-6 w-[60%] py-3 sm:py-4 border bg-[#027ED1ff] text-white font-semibold rounded-full hover:bg-blue-500 transition duration-200 text-base sm:text-lg cursor-pointer"
          >
            Register
          </button>

          {/* Login Link */}
          <p className="text-center mt-4 sm:mt-6 text-sm sm:text-lg">
            Already have an account?{" "}
            <Link to="/login" className="text-white hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;
