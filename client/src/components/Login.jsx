import React, { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";  
import { assets } from "../assets/assets";
import Navbar from "./Navbar";
import axios from "axios";
import { Mail, Lock } from "lucide-react";  
import API_URL from "../../config";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try { 
      const response = await axios.post(
        `${API_URL}/Auth/login`,
        { email: user, password },
        { withCredentials: true }
      );   
      console.log("Login successful:", response.data);

      // Show success message
      setMessage({ text: "🎉 Login Successful!", type: "success" });
 
      setTimeout(() => {
        navigate("/blog");
      }, 1000);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);

      // Show error message
      setMessage({ text: "Login Failed. Check your credentials.", type: "error" });
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

        {/* Login Form */}
        <form 
          onSubmit={handleSubmit} 
          className="relative z-20 w-full max-w-[440px] bg-transparent border-2 border-white/50 rounded-3xl flex flex-col items-center text-blue-300 p-6 sm:p-10 md:h-[450px] sm:h-[400px] justify-center"
          style={{ backdropFilter: "blur(20px)", boxShadow: "0 0 30px rgba(0,0,0,.5)" }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">Login</h1>

          {/* Success/Error Message */}
          {message.text && (
            <p className={`text-lg font-semibold mb-4 ${message.type === "success" ? "text-green-400" : "text-red-400"}`}>
              {message.text}
            </p>
          )}

          {/* Email */}
          <div className="w-full mb-4 flex items-center border border-white/30 rounded-md p-3 sm:p-4">
            <Mail className="text-white mr-3" size={20} />
            <input 
              type="text" 
              value={user} 
              onChange={(e) => setUser(e.target.value)} 
              required 
              className="w-full bg-transparent placeholder-white text-white outline-none text-base sm:text-lg"
              placeholder="Email"
            />
          </div>
          
          {/* Password */}
          <div className="w-full mb-4 flex items-center border border-white/30 rounded-md p-3 sm:p-4">
            <Lock className="text-white mr-3" size={20} />
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full bg-transparent placeholder-white text-white outline-none text-base sm:text-lg"
              placeholder="Password"
            />
          </div> 

          {/* Submit */}
          <button type="submit" className="w-[60%] mt-4 py-3 sm:py-4 border cursor-pointer bg-[#027ED1ff] text-white font-semibold rounded-full hover:bg-blue-500 transition duration-200 text-base sm:text-lg my-4">
            Login
          </button>

          {/* Forgot Password */}
          <div>   
            <a href="#" className="text-blue-300 hover:text-blue-200 text-sm sm:text-base">Forgot Password?</a>
          </div>

          {/* Register Link */}
          <p className="text-center mt-4 sm:mt-6 text-sm sm:text-lg">
            Don't have an account?{" "}
            <Link to="/register" className="text-white hover:underline">Register</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
