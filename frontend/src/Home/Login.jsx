import React, { useState } from "react";
import axios from "axios";
import Moderator from '../Moderator'; 

function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await Moderator.login(userId, password);
  
      if (response && !response.error) {
        localStorage.setItem('userId', userId);
        localStorage.setItem('password', password);
  
        
        Moderator.redirectTo('/dashboard')
      } else {
        console.error("Invalid credentials or server error");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen  text-emerald-400">
      <h1 className="pt-16 text-8xl font-bold text-emerald-400  ">Login</h1>
      <div className="w-80  p-6 mt-8 ">
        <div className="mb-4 ">
          <p className=" text-3xl mb-2">University ID</p>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="rounded-full text-3xl px-4 py-3 border border-red-400 w-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>
        <div className="mb-4">
          <p className=" text-3xl mb-2">Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-full text-3xl px-4 py-3 border border-red-400 w-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>
        <button
          className="bg-red-400 text-white text-3xl rounded-full px-5 py-3 w-full font-semibold focus:outline-none font-right  "
          onClick={handleLogin}
        >
          Log In
        </button>
      </div>
    </div>
  );
}

export default Login;
