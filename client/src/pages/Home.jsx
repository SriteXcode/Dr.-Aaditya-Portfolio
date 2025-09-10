// Home.jsx
import React, { useState, useEffect, useRef } from "react";
import { useAcademicData } from "../context/AcademicDataContext";
import API from "../Api"; // axios/fetch instance

import hero from "../assets/hero.png";
import About from "./About";
import Education from "./Education";
import Experience from "./Experience";
import Research from "./Research";
import Contact from "./Contact";
import Portfolio from "../assets/Brief_Portfolio_Dr_Aditya.pdf";
import CV from "../assets/Aditya_Khamparia_CV.pdf";

// Icons
import { FaGraduationCap, FaRegFolderOpen, FaFileDownload, FaSpinner } from "react-icons/fa";
import { SiOrcid, SiScopus } from "react-icons/si";
import Loader from "../components/Loader";

const Home = () => {
  const { data } = useAcademicData();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dropdown state + ref
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/profile");
        setProfileData(res.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // click outside & ESC to close dropdown
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    function handleEsc(e) {
      if (e.key === "Escape") setDropdownOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

   // Show Loader while fetching
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  // Show error message
  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500 text-lg">
        Error loading messages.
      </div>
    );
  }
  if (error) return <p>Error loading profile.</p>;
  if (!profileData) return null;

  const stats = data.stats || {
    publications: 0,
    sciIndexed: 0,
    hIndex: 0,
    phdSupervised: 0,
  };

  // smooth scroll function
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <section
        id="home"
        className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT CONTENT */}
            <div className="flex flex-col space-y-6">
              <h1 className="text-5xl font-bold text-gray-900">
                {profileData.name}
              </h1>
              <p className="text-2xl text-blue-600 font-semibold">
                {profileData.title}
              </p>
              <p className="text-lg text-gray-600">
                {profileData.bio?.split(" ").slice(0, 22).join(" ")}...
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-2xl font-bold text-blue-600">
                    {stats.publications}
                  </div>
                  <div className="text-sm text-gray-600">Publications</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-2xl font-bold text-green-600">
                    {stats.sciIndexed}
                  </div>
                  <div className="text-sm text-gray-600">SCI Indexed</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-2xl font-bold text-purple-600">
                    {stats.hIndex}
                  </div>
                  <div className="text-sm text-gray-600">H-Index</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-2xl font-bold text-orange-600">
                    {stats.phdSupervised}
                  </div>
                  <div className="text-sm text-gray-600">PhD Supervised</div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-start">
                {/* Contact */}
                <button
                  onClick={() => scrollToSection("contact")}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg flex items-center gap-2 transform transition-all duration-300 hover:bg-blue-700 hover:scale-105"
                >
                  Contact Me
                </button>

                {/* Research */}
                <button
                  onClick={() => scrollToSection("research")}
                  className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg flex items-center gap-2 transform transition-all duration-300 hover:bg-blue-600 hover:text-white hover:scale-105"
                >
                  View Research
                </button>

                {/* Google Scholar (use Graduation cap as icon) */}
                <a
                  href="https://scholar.google.com/citations?hl=en&user=zCalDU8AAAAJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-gray-600 text-gray-700 px-8 py-3 rounded-lg flex items-center gap-2 transform transition-all duration-300 hover:bg-gray-700 hover:text-white hover:scale-105"
                >
                  <FaGraduationCap size={18} className="transition-transform duration-300" />
                  Google Scholar
                </a>

                {/* ORCID */}
                <a
                  href="https://orcid.org/0000-0001-9019-8230"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-green-600 text-green-700 px-8 py-3 rounded-lg flex items-center gap-2 transform transition-all duration-300 hover:bg-green-700 hover:text-white hover:scale-105"
                >
                  <SiOrcid size={18} className="transition-transform duration-300" />
                  ORCID
                </a>
                <a
                  href="https://www.scopus.com/authid/detail.uri?authorId=55811315600"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-green-600 text-green-700 px-8 py-3 rounded-lg flex items-center gap-2 transform transition-all duration-300 hover:bg-green-700 hover:text-white hover:scale-105"
                >
                  <SiScopus size={18} className="transition-transform duration-300 group-hover:rotate-6" />
                  Scopusid
                </a>

                {/* Resources dropdown (Portfolio + CV) */}
                <div ref={dropdownRef} className="relative inline-block text-left">
                  <button
                    onTouchMove={() => setDropdownOpen((v) => !v)}
                    onMouseEnter={() => setDropdownOpen(true)}
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen}
                    className="border-2 border-purple-600 text-purple-700 px-8 py-3 rounded-lg flex items-center gap-2 transform transition-all duration-300 hover:bg-purple-700 hover:text-white hover:scale-105"
                  >
                    <FaRegFolderOpen size={18} className="transition-transform duration-300" />
                    Resources
                    {/* small chevron */}
                    {/* <svg
                      className="w-4 h-4 ml-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    > */}
                      {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg> */}
                  </button>

                  {/* Dropdown menu */}
                  <div
    onMouseLeave={() => setDropdownOpen(false)}
                    className={`border-2 border-red-800 origin-top-right absolute right-0 -mt-34 w-48 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 ${
                      dropdownOpen ? "block" : "hidden"
                    }`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                  >
                    <div className="py-1 bg-white rounded-md border border-gray-100">
                      <a
                        href={Portfolio}
                        download="Brief_Portfolio_Dr_Aditya.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 transition-colors"
                        role="menuitem"
                      >
                        <FaRegFolderOpen size={16} className="text-purple-600" />
                        View Portfolio
                      </a>

                      <a
                        href={CV}
                        // add download attribute to suggest browser to download (works best when same-origin)
                        download="Aditya_Khamparia_CV.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 transition-colors"
                        role="menuitem"
                      >
                        <FaFileDownload size={16} className="text-red-600" />
                        Download CV
                      </a>
                    </div>
                  </div>
                </div>
                {/* end resources dropdown */}
              </div>
            </div>

            {/* RIGHT HERO IMAGE */}
            <div className="flex justify-center lg:justify-center">
              <div className="w-80 h-96 overflow-hidden rounded-b-full shadow-2xl">
                <img
                  src={hero}
                  alt={data.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section id="about"><About /></section>
      <section id="education"><Education /></section>
      <section id="experience"><Experience /></section>
      <section id="research"><Research /></section>
      <section id="contact"><Contact /></section>
    </>
  );
};

export default Home;