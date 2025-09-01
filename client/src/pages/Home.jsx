import React, { useState, useEffect } from "react";
import { useAcademicData } from "../context/AcademicDataContext";
import API from "../Api"; // axios/fetch instance

import hero from "../assets/hero.png";
import About from "./About";
import Education from "./Education";
import Experience from "./Experience";
import Research from "./Research";
import Contact from "./Contact";

const Home = () => {
  const { data } = useAcademicData();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading profile.</p>;
  if (!profileData) return null;

  const stats = data.stats;

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
                {profileData.bio.split(" ").slice(0, 22).join(" ")}...
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">{stats.publications}</div>
                  <div className="text-sm text-gray-600">Publications</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-green-600">{stats.sciIndexed}</div>
                  <div className="text-sm text-gray-600">SCI Indexed</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-purple-600">{stats.hIndex}</div>
                  <div className="text-sm text-gray-600">H-Index</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-orange-600">{stats.phdSupervised}</div>
                  <div className="text-sm text-gray-600">PhD Supervised</div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center"
                >
                  Contact Me
                </button>
                <button
                  onClick={() => scrollToSection("research")}
                  className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-center"
                >
                  View Research
                </button>
              </div>
            </div>

            {/* RIGHT HERO IMAGE */}
            <div className="flex justify-center lg:justify-end">
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