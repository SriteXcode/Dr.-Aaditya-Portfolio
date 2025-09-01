import React, { lazy, Suspense, useState } from "react";
import Navbar from "../components/Navbar"; // main site navbar
import Loader from "../components/Loader"; // Tailwind spinner

const AdminMessages = lazy(() => import("./AdminMessage"));
const ManageContent = lazy(() => import("./AdminContentManagement"));

const Admin = () => {
  const [adminPage, setAdminPage] = useState("messages");

  const handleExit = () => {
    // Example: redirect to home
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Admin Top Bar */}
      <div className="pt-0 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-md">
          {/* Admin Name */}
          <div className="text-3xl font-bold text-gray-800">Dr. Aaditya Khamparia</div>

          {/* Tabs */}
          <div className="flex space-x-4">
            <button
              onClick={() => setAdminPage("messages")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors shadow 
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
              className={`px-4 py-2 rounded-lg font-medium transition-colors shadow 
                ${
                  adminPage === "manage"
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-700 border hover:bg-gray-100"
                }`}
            >
              Manage Content
            </button>
          </div>

          {/* Exit Button */}
          <button
            onClick={handleExit}
            className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Exit
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-6 min-h-[400px] flex justify-center items-start">
          <Suspense fallback={<Loader />}>
            {adminPage === "messages" ? <AdminMessages /> : <ManageContent />}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Admin;
