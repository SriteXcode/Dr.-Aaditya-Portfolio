import React from 'react';
import { GraduationCap } from 'lucide-react';
import { useAcademicData } from '../context/AcademicDataContext';

const Education = () => {
  const { data } = useAcademicData();

  return (
    <section className="min-h-screen bg-gray-50 py-20 pt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Educational Background</h2>
          <p className="text-xl text-gray-600">Academic journey and qualifications</p>
        </div>

        <div className="space-y-8">
          {data.qualifications.map((qual) => (
            <div 
              key={qual.id} 
              className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-6">
                  <GraduationCap className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900">{qual.title}</h3>
                      <p className="text-blue-600 font-semibold text-lg">{qual.institution}</p>
                      <p className="text-gray-600 mt-2">{qual.description}</p>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-4">
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {qual.year}
                      </div>
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

export default Education;