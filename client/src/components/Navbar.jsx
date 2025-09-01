import React from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAcademicData } from "../context/AcademicDataContext";

const Navbar = () => {
  const { data } = useAcademicData();
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = location.pathname === '/api/admin01';

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "research", label: "Research" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <span className="text-2xl font-bold text-blue-900">
            {data.profile.name}
          </span>

          <div className="hidden md:flex space-x-8">
            {!isAdmin && (
    <div className="hidden md:flex space-x-8">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          className="transition-colors text-gray-700 hover:text-blue-600"
        >
          {item.label}
        </button>
      ))}
    </div>
  )}
          </div>
          {isAdmin && (
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Exit Admin
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


