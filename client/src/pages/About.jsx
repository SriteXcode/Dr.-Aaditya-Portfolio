import React from 'react';
import { Mail, Phone, MapPin, Award } from 'lucide-react';
import { useAcademicData } from '../context/AcademicDataContext';
import hero2 from '../assets/hero2.jpg';

const About = () => {
  const { data } = useAcademicData();

  return (
    <section className="min-h-screen bg-white py-20 pt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Dr. Khamparia</h2>
          <p className="text-xl text-gray-600">Academic Excellence & Research Leadership</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <img 
              src={hero2} 
              alt="Dr. Aditya Khamparia" 
              className="w-full h-96 object-cover rounded-lg shadow-lg mb-6" 
            />
            
            {/* Research Areas */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Research Areas</h3>
              <div className="flex flex-wrap gap-2">
                {data.researchAreas.map((area, index) => (
                  <span 
                    key={index} 
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              {data.profile.about}
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-blue-600 mr-3" />
                <span>{data.profile.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-blue-600 mr-3" />
                <span>{data.profile.phone}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                <span>{data.profile.location}</span>
              </div>
            </div>

            {/* Professional Memberships */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Professional Memberships</h3>
              <div className="flex flex-wrap gap-2">
                {data.professionalBodies.map((body, index) => (
                  <span 
                    key={index} 
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    {body}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Achievements */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                {data.achievements.slice(0, 3).map((achievement) => (
                  <div key={achievement.id} className="flex items-start">
                    <Award className="w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">
                        {achievement.title} ({achievement.year})
                      </div>
                      <div className="text-sm text-gray-600">{achievement.institution}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;