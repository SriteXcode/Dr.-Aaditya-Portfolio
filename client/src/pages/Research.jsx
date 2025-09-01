import React, { useState } from 'react';
import { BookOpen, Star, Users, Globe, GraduationCap, Presentation } from 'lucide-react';
import { useAcademicData } from '../context/AcademicDataContext';

const Research = () => {
  const { data } = useAcademicData();
  const [selectedWorkType, setSelectedWorkType] = useState('all');

  const allWorks = [
    ...data.books.map(item => ({ ...item, type: 'book' })),
    ...data.researchPapers.map(item => ({ ...item, type: 'paper' }))
  ];

  const filteredWorks = selectedWorkType === 'all' 
    ? allWorks 
    : allWorks.filter(work => work.type === selectedWorkType);

  return (
    <section className="min-h-screen bg-gray-50 py-20 pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Research & Publications</h2>
          <p className="text-xl text-gray-600">Academic contributions and scholarly works</p>
        </div>

        {/* Research Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg text-white">
            <BookOpen className="w-10 h-10 mb-4" />
            <h3 className="text-xl font-bold mb-2">Total Publications</h3>
            <div className="text-3xl font-bold">{data.stats.publications}</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-lg text-white">
            <Star className="w-10 h-10 mb-4" />
            <h3 className="text-xl font-bold mb-2">SCI Indexed</h3>
            <div className="text-3xl font-bold">{data.stats.sciIndexed}</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-lg text-white">
            <Users className="w-10 h-10 mb-4" />
            <h3 className="text-xl font-bold mb-2">PhD Supervised</h3>
            <div className="text-3xl font-bold">{data.stats.phdSupervised}</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-lg text-white">
            <Globe className="w-10 h-10 mb-4" />
            <h3 className="text-xl font-bold mb-2">Citations</h3>
            <div className="text-3xl font-bold">{data.stats.citations}</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-4 bg-gray-100 p-2 rounded-lg">
            <button 
              onClick={() => setSelectedWorkType('all')} 
              className={`px-6 py-2 rounded-md transition-colors ${
                selectedWorkType === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Works
            </button>
            <button 
              onClick={() => setSelectedWorkType('paper')} 
              className={`px-6 py-2 rounded-md transition-colors ${
                selectedWorkType === 'paper' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              Research Papers
            </button>
            <button 
              onClick={() => setSelectedWorkType('book')} 
              className={`px-6 py-2 rounded-md transition-colors ${
                selectedWorkType === 'book' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              Books
            </button>
          </div>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredWorks.slice(0, 6).map((item) => (
            <div 
              key={`${item.type}-${item.id}`} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className={`text-sm font-medium mb-2 ${
                  item.type === 'book' ? 'text-blue-600' : 'text-purple-600'
                }`}>
                  {item.category} • {item.type === 'book' ? 'Book' : 'Research Paper'}
                  {item.impactFactor && (
                    <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      IF: {item.impactFactor}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
                <div className="text-sm text-gray-500 mb-4">
                  {item.publishedYear} • {item.publisher || item.journal}
                  {item.indexed && (
                    <span className="ml-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                      {item.indexed}
                    </span>
                  )}
                </div>
                <a 
                  href={item.document} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full block text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                >
                  View Document
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* PhD Supervision Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">PhD Supervision</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.supervision.map((sup) => (
              <div key={sup.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <GraduationCap className="w-8 h-8 text-blue-600 mr-3" />
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    sup.status === 'Degree Awarded' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {sup.status}
                  </div>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{sup.scholar}</h4>
                <p className="text-gray-600 mb-2">{sup.title}</p>
                <p className="text-sm text-blue-600">{sup.institution}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Research Projects */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Major Research Projects</h3>
          <div className="space-y-6">
            {data.projects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mr-6">
                    <Presentation className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h4>
                    <div className="flex flex-wrap items-center mb-4 gap-2">
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {project.role}
                      </span>
                      <span className="text-gray-600">{project.duration}</span>
                    </div>
                    <p className="text-blue-600 font-semibold mb-4">{project.fundingAgency}</p>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-gray-900 mb-2">Impact:</h5>
                      <p className="text-gray-600">{project.impact}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Research;