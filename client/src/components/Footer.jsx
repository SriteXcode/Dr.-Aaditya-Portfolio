import React from 'react';
import { useAcademicData } from '../context/AcademicDataContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const { data } = useAcademicData();
  const location = useLocation();
  const isAdmin = location.pathname === '/admin01';

  const quickLinks = [
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'research', label: 'Research' },
    { id: 'contact', label: 'Contact' },
  ];

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
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Profile */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">{data.profile.name}</h3>
            <p className="text-gray-400 mb-4">{data.profile.title}</p>
            <p className="text-gray-400 text-sm">
              {data.profile.about.substring(0, 200)}...
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Research Stats */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Research Stats</h4>
            <div className="space-y-2 text-gray-400">
              <div>{data.stats.publications} Publications</div>
              <div>{data.stats.sciIndexed} SCI Indexed</div>
              <div>{data.stats.phdSupervised} PhD Supervised</div>
              <div>{data.stats.citations} Citations</div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} {data.profile.name}. All rights reserved.
          </p>
           {/* Sirf normal pages pe admin button dikhana */}
        {!isAdmin && (
          <Link to="/admin01" className="text-xs text-gray-600 mt-2 hover:text-gray-400 transition-colors inline-block">
  Admin
</Link>
        )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
