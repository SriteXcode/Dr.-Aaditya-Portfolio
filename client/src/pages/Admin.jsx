import React, { useState } from "react";
import Navbar from "../components/Navbar"; // adjust path
import AdminMessages from "./AdminMessage"; // adjust path
import ManageContent from "./AdminContentManagement";

const Admin = () => {
  const [adminPage, setAdminPage] = useState("messages");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Toggle Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setAdminPage("messages")}
            className={`px-6 py-2 rounded-lg font-medium transition-colors shadow 
              ${
                adminPage === "messages"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border hover:bg-gray-100"
              }`}
          >
            Messages
          </button>
          <button
            onClick={() => setAdminPage("manage")}
            className={`px-6 py-2 rounded-lg font-medium transition-colors shadow 
              ${
                adminPage === "manage"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-700 border hover:bg-gray-100"
              }`}
          >
            Manage Content
          </button>
        </div>

        {/* Conditional Rendering */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {adminPage === "messages" ? <AdminMessages /> : <ManageContent />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
