import React, { useState } from "react";
import { Navigate } from "react-router-dom";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;



const ProtectedRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) setAuthorized(true);
     else {
      alert("Wrong password!");
    }
  };

  if (authorized) return children;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default ProtectedRoute;
