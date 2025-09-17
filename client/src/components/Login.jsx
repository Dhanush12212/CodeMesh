import React, { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";  
import { Mail, Lock } from "lucide-react";  
import axios from "axios";
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

      setMessage({ text: "🎉 Login Successful!", type: "success" });

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);

      setMessage({ text: "Login Failed. Check your credentials.", type: "error" });
    }
  };

  return (
    <>  
      <div className="w-full h-screen flex flex-col items-center justify-center px-4 sm:px-0 bg-slate-900">
        <form 
          onSubmit={handleSubmit} 
          className="relative z-20 w-full md:w-[450px] lg:w-[500px] lg:h-[500px] min-h-[380px] md:h-[450px] sm:h-[400px] bg-slate-800 border border-slate-600 rounded-3xl flex flex-col items-center text-green-300 p-6 md:px-20 justify-center shadow-2xl shadow-black/60 backdrop-blur-md"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-white">Login</h1>

          {message.text && (
            <p className={`text-lg font-semibold mb-4 ${message.type === "success" ? "text-green-400" : "text-red-400"}`}>
              {message.text}
            </p>
          )}

          <div className="w-full mb-4 flex items-center border border-slate-500 rounded-md p-3 sm:p-4 bg-slate-700">
            <Mail className="text-white mr-3" size={20} />
            <input 
              type="text" 
              value={user} 
              onChange={(e) => setUser(e.target.value)} 
              required 
              className="w-full bg-transparent placeholder-slate-300 text-white outline-none text-base sm:text-lg"
              placeholder="Email"
            />
          </div>

          <div className="w-full mb-4 flex items-center border border-slate-500 rounded-md p-3 sm:p-4 bg-slate-700">
            <Lock className="text-white mr-3" size={20} />
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full bg-transparent placeholder-slate-300 text-white outline-none text-base sm:text-lg"
              placeholder="Password"
            />
          </div> 

          <button type="submit" className="w-[60%] mt-4 py-3 sm:py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition duration-300 text-base sm:text-lg my-4 focus:ring-2 focus:ring-green-300">
            Login
          </button>

          <div>   
            <a href="#" className="text-green-300 hover:text-green-200 text-sm sm:text-base">Forgot Password?</a>
          </div>

          <p className="text-center mt-4 sm:mt-6 text-sm sm:text-lg text-slate-300">
            Don't have an account?{" "}
            <Link to="/register" className="text-white hover:underline">Register</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
