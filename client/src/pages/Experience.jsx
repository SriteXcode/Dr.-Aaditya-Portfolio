import React from 'react';
import { Briefcase } from 'lucide-react';
import { useAcademicData } from '../context/AcademicDataContext';

const Experience = () => {
  const { data } = useAcademicData();

  return (
    <section className="min-h-screen bg-white py-20 pt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Experience</h2>
          <p className="text-xl text-gray-600">Academic and research positions</p>
        </div>

        <div className="space-y-8">
          {data.experience.map((exp) => (
            <div 
              key={exp.id} 
              className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg shadow-md p-8"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mr-6">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900">{exp.title}</h3>
                      <p className="text-blue-600 font-semibold text-lg">{exp.institution}</p>
                      <p className="text-gray-600 mb-4">{exp.description}</p>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-4">
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {exp.duration}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Courses Taught:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.courses.map((course, index) => (
                        <span 
                          key={index} 
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;