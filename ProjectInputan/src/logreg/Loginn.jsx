import React from 'react';
import "../dist/output.css";
import { Link, useNavigate}  from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

const Loginn = ({setAmbilToken}) => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const login = async(e) => {
        e.preventDefault();
        try{
            //1.Kirim permintaan post untuk login
            const res = await axios.post("http://localhost:3001/reg/login",{email,password});
            const token = res.data.token
            // console.log("token : ",token);

            //2.Simpan token di local Storage
            localStorage.setItem("nama-token",token)
            // localStorage.setItem("isLoggedIn",true);
            navigate("/input")
            setAmbilToken(token);
        }catch(err){
            console.log("Error : ",err.response.data.message)
        }
    }

    

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
             onChange={e => setEmail(e.target.value)}/>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300" onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={login}
            >
              Login
            </button>
            <Link to="/register">Register</Link> 
          
          </div>
        </form>
      </div>
    </div>
  );
}

export default Loginn;
