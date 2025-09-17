import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import axios from "axios";
import API_URL from '../../config.js';

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
        navigate("/");
      }, 500);
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      setMessage({ text: "Registration Failed. Try again.", type: "error" });
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-4 sm:px-0 bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="relative z-20 w-full md:w-[450px] lg:w-[500px] lg:h-[500px] max-w-[550px] max-h-[550px] min-h-[400px] bg-slate-800 border border-slate-700 rounded-3xl flex flex-col items-center text-green-300 md:px-20 p-6 justify-center shadow-2xl shadow-black/60 backdrop-blur-md"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-white">
          Register
        </h1>

        {message.text && (
          <p
            className={`text-lg font-semibold mb-4 ${
              message.type === "success" ? "text-green-400" : "text-red-400"
            }`}
          >
            {message.text}
          </p>
        )}

        {/* Username Field */}
        <div className="w-full mb-4 flex items-center border border-slate-600 rounded-lg p-3 sm:p-4 bg-slate-700">
          <User className="text-white mr-3" size={20} />
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full bg-transparent placeholder-slate-400 text-white outline-none text-base sm:text-lg"
            placeholder="Username"
          />
        </div>

        {/* Email Field */}
        <div className="w-full mb-4 flex items-center border border-slate-600 rounded-lg p-3 sm:p-4 bg-slate-700">
          <Mail className="text-white mr-3" size={20} />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-transparent placeholder-slate-400 text-white outline-none text-base sm:text-lg"
            placeholder="Email"
          />
        </div>

        {/* Password Field */}
        <div className="w-full mb-4 flex items-center border border-slate-600 rounded-lg p-3 sm:p-4 bg-slate-700">
          <Lock className="text-white mr-3" size={20} />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-transparent placeholder-slate-400 text-white outline-none text-base sm:text-lg"
            placeholder="Password"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 w-[60%] py-3 sm:py-4 text-white font-semibold rounded-full 
          bg-gradient-to-r from-green-600 to-emerald-700 
          hover:from-green-700 hover:to-emerald-800 
          transition duration-300 text-base sm:text-lg cursor-pointer 
          focus:ring-2 focus:ring-green-400 shadow-md"
        >
          Register
        </button>

        {/* Login Link */}
        <p className="text-center mt-4 sm:mt-6 text-sm sm:text-lg text-slate-300">
          Already have an account?{" "}
          <Link to="/login" className="text-green-400 hover:text-green-300 transition-colors">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
