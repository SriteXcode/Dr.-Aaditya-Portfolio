// src/components/Loader.jsx
import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-4 border-t-[#5DB7DE] border-b-[#F1E9DB] rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
