// import React, { useState, useEffect } from 'react';
// import {
//   ChevronDown, Mail, Phone, MapPin, Github, Linkedin, Twitter, Book, FileText,
//   Search, Plus, Edit, Trash2, Send, User, Calendar, Award, Briefcase, Eye
// } from 'lucide-react';
// import API from "../src/Api";

// // Mock Database - In a real app, this would be connected to a backend
// // useEffect(() => {
// //     const fetchProfile = async () => {
// //       try {
// //         const res = await API.get("/profile");
// //         setProfile(res.data);
// //       } catch (error) {
// //         console.error(error);
// //       }
// //     };
// //     fetchProfile();
// //   }, []);
// const defaultData = {
//   profile: {
//     name: "John Doe",
//     title: "Software Developer & Researcher",
//     about: "Passionate developer with expertise in modern web technologies and academic research.",
//     image: "/api/placeholder/400/400",
//     email: "john.doe@email.com",
//     phone: "+1 (555) 123-4567",
//     location: "New York, NY"
//   },
//   qualifications: [
//     { id: 1, year: "2023", title: "Master of Computer Science", institution: "MIT", description: "Specialized in Machine Learning and AI" },
//     { id: 2, year: "2021", title: "Bachelor of Computer Science", institution: "Stanford University", description: "Graduated Magna Cum Laude" },
//     { id: 3, year: "2020", title: "Full Stack Developer Certification", institution: "freeCodeCamp", description: "Comprehensive web development program" }
//   ],
//   books: [
//     { id: 1, title: "Modern JavaScript Patterns", category: "Programming", image: "/api/placeholder/300/400", description: "A comprehensive guide to modern JavaScript development patterns and best practices.", publishedYear: "2023", publisher: "Tech Books Inc.", document: "/documents/js-patterns.pdf" },
//     { id: 2, title: "React Advanced Concepts", category: "Web Development", image: "/api/placeholder/300/400", description: "Deep dive into advanced React concepts and performance optimization.", publishedYear: "2022", publisher: "Code Press", document: "/documents/react-advanced.pdf" }
//   ],
//   thesis: [
//     { id: 1, title: "Machine Learning in Web Development", category: "Computer Science", image: "/api/placeholder/300/400", description: "Research on implementing ML algorithms in modern web applications.", publishedYear: "2023", university: "MIT", document: "/documents/ml-thesis.pdf" }
//   ],
//   researchPapers: [
//     { id: 1, title: "Optimizing React Performance", category: "Web Development", image: "/api/placeholder/300/400", description: "Analysis of performance optimization techniques in React applications.", publishedYear: "2023", journal: "Web Development Quarterly", document: "/documents/react-performance.pdf" },
//     { id: 2, title: "AI in Frontend Development", category: "Artificial Intelligence", image: "/api/placeholder/300/400", description: "Exploring the integration of AI tools in frontend development workflows.", publishedYear: "2024", journal: "Tech Innovation Review", document: "/documents/ai-frontend.pdf" }
//   ],
//   messages: [
//     { id: 1, name: "Alice Johnson", email: "alice@example.com", message: "Hi! I'm interested in collaborating on a project.", date: "2024-01-15", read: false },
//     { id: 2, name: "Bob Smith", email: "bob@example.com", message: "Great work on your latest research paper!", date: "2024-01-14", read: true }
//   ],
//   socialLinks: {
//     github: "https://github.com/johndoe",
//     linkedin: "https://linkedin.com/in/johndoe",
//     twitter: "https://twitter.com/johndoe"
//   }
// };

// const STORAGE_KEY = 'portfolio_data_v1';

// const Portfolio = () => {
//   const [data, setData] = useState(() => {
//     try {
//       const raw = localStorage.getItem(STORAGE_KEY);
//       return raw ? JSON.parse(raw) : defaultData;
//     } catch (e) {
//       return defaultData;
//     }
//   });

//   const [isAdmin, setIsAdmin] = useState(false);
//   const [adminPage, setAdminPage] = useState('messages'); // 'messages' | 'manage'
//   const [selectedWorkType, setSelectedWorkType] = useState('all');
//   const [editingItem, setEditingItem] = useState(null); // { ...item, type }
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [addFormType, setAddFormType] = useState('books'); // 'books' | 'thesis' | 'researchPapers'
//   const [newItem, setNewItem] = useState({
//     title: '', category: '', description: '', publishedYear: '',
//     publisher: '', university: '', journal: '', image: '/api/placeholder/300/400'
//   });

//   // persist to localStorage
//   useEffect(() => {
//     try {
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
//     } catch (e) {
//       console.warn('Failed to save portfolio data', e);
//     }
//   }, [data]);

//   // Scroll to section function
//   const scrollToSection = (sectionId) => {
//     const element = document.getElementById(sectionId);
//     if (element) element.scrollIntoView({ behavior: 'smooth' });
//   };

//   // Navbar
//   const Navbar = () => (
//     <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center py-4">
//           <div className="text-2xl font-bold text-gray-900">{data.profile.name}</div>
//           {!isAdmin && (
//             <div className="hidden md:flex space-x-8">
//               <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-blue-600 transition-colors">Home</button>
//               <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-blue-600 transition-colors">About</button>
//               <button onClick={() => scrollToSection('qualifications')} className="text-gray-700 hover:text-blue-600 transition-colors">Qualifications</button>
//               <button onClick={() => scrollToSection('works')} className="text-gray-700 hover:text-blue-600 transition-colors">Works</button>
//               <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-600 transition-colors">Contact</button>
//             </div>
//           )}
//           {isAdmin && (
//             <div className="flex space-x-4">
//               <button onClick={() => setAdminPage('messages')} className={`px-4 py-2 rounded ${adminPage === 'messages' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}>Messages</button>
//               <button onClick={() => setAdminPage('manage')} className={`px-4 py-2 rounded ${adminPage === 'manage' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}>Manage Content</button>
//               <button onClick={() => setIsAdmin(false)} className="px-4 py-2 bg-red-500 text-white rounded">Exit Admin</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );

//   // Hero
//   const Hero = () => (
//     <section id="home" className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-indigo-100 pt-20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           <div>
//             <h1 className="text-5xl font-bold text-gray-900 mb-4">{data.profile.name}</h1>
//             <p className="text-xl text-gray-600 mb-4">{data.profile.title}</p>
//             <p className="text-lg text-gray-500 mb-8">{data.profile.about}</p>
//             <button onClick={() => scrollToSection('contact')} className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">Get In Touch</button>
//           </div>
//           <div className="flex justify-center">
//             <img src={data.profile.image} alt={data.profile.name} className="w-96 h-96 object-cover rounded-full shadow-2xl" />
//           </div>
//         </div>
//       </div>
//     </section>
//   );

//   // About
//   const About = () => (
//     <section id="about" className="min-h-screen bg-white py-20">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
//           <p className="text-xl text-gray-600">Learn more about my background and journey</p>
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
//           <div>
//             <img src={data.profile.image} alt={data.profile.name} className="w-full h-96 object-cover rounded-lg shadow-lg" />
//           </div>
//           <div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">My Story</h3>
//             <p className="text-gray-600 mb-6">{data.profile.about} With years of experience in software development and academic research, I'm passionate about creating innovative solutions and sharing knowledge through my work.</p>
//             <div className="space-y-4">
//               <div className="flex items-center"><Mail className="w-5 h-5 text-blue-600 mr-3" /><span>{data.profile.email}</span></div>
//               <div className="flex items-center"><Phone className="w-5 h-5 text-blue-600 mr-3" /><span>{data.profile.phone}</span></div>
//               <div className="flex items-center"><MapPin className="w-5 h-5 text-blue-600 mr-3" /><span>{data.profile.location}</span></div>
//             </div>
//           </div>
//         </div>

//         <div>
//           <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">My Journey</h3>
//           <div className="space-y-8">
//             {data.qualifications.map((qual) => (
//               <div key={qual.id} className="flex items-start">
//                 <div className="flex-shrink-0 w-24 text-blue-600 font-bold text-lg">{qual.year}</div>
//                 <div className="ml-8">
//                   <h4 className="text-xl font-semibold text-gray-900">{qual.title}</h4>
//                   <p className="text-blue-600 font-medium">{qual.institution}</p>
//                   <p className="text-gray-600 mt-2">{qual.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );

//   // Qualifications
//   const Qualifications = () => (
//     <section id="qualifications" className="min-h-screen bg-gray-50 py-20">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">Qualifications</h2>
//           <p className="text-xl text-gray-600">My educational background and certifications</p>
//         </div>
//         <div className="space-y-8">
//           {data.qualifications.map((qual) => (
//             <div key={qual.id} className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
//               <div className="flex items-center mb-4">
//                 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4"><Award className="w-8 h-8 text-blue-600" /></div>
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900">{qual.title}</h3>
//                   <p className="text-blue-600 font-medium">{qual.institution} • {qual.year}</p>
//                 </div>
//               </div>
//               <p className="text-gray-600">{qual.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );

//   // Works
//   const Works = () => {
//     const allWorks = [
//       ...data.books.map(item => ({ ...item, type: 'book' })),
//       ...data.thesis.map(item => ({ ...item, type: 'thesis' })),
//       ...data.researchPapers.map(item => ({ ...item, type: 'research' }))
//     ];

//     const filteredWorks = selectedWorkType === 'all'
//       ? allWorks
//       : allWorks.filter(work => work.type === selectedWorkType);

//     return (
//       <section id="works" className="min-h-screen bg-white py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">My Works</h2>
//             <p className="text-xl text-gray-600">Explore my books, thesis, and research papers</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
//             <div onClick={() => setSelectedWorkType('book')} className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-lg text-white cursor-pointer hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105">
//               <Book className="w-12 h-12 mb-4" />
//               <h3 className="text-2xl font-bold mb-2">Books</h3>
//               <p className="mb-4">Published books on programming and technology</p>
//               <div className="text-3xl font-bold">{data.books.length}</div>
//             </div>

//             <div onClick={() => setSelectedWorkType('thesis')} className="bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-lg text-white cursor-pointer hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105">
//               <FileText className="w-12 h-12 mb-4" />
//               <h3 className="text-2xl font-bold mb-2">Thesis</h3>
//               <p className="mb-4">Academic thesis and dissertations</p>
//               <div className="text-3xl font-bold">{data.thesis.length}</div>
//             </div>

//             <div onClick={() => setSelectedWorkType('research')} className="bg-gradient-to-br from-purple-500 to-purple-600 p-8 rounded-lg text-white cursor-pointer hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105">
//               <Search className="w-12 h-12 mb-4" />
//               <h3 className="text-2xl font-bold mb-2">Research Papers</h3>
//               <p className="mb-4">Published research and academic papers</p>
//               <div className="text-3xl font-bold">{data.researchPapers.length}</div>
//             </div>
//           </div>

//           <div className="flex justify-center mb-12">
//             <div className="flex space-x-4 bg-gray-100 p-2 rounded-lg">
//               <button onClick={() => setSelectedWorkType('all')} className={`px-6 py-2 rounded-md transition-colors ${selectedWorkType === 'all' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}>All Works</button>
//               <button onClick={() => setSelectedWorkType('book')} className={`px-6 py-2 rounded-md transition-colors ${selectedWorkType === 'book' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}>Books</button>
//               <button onClick={() => setSelectedWorkType('thesis')} className={`px-6 py-2 rounded-md transition-colors ${selectedWorkType === 'thesis' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}>Thesis</button>
//               <button onClick={() => setSelectedWorkType('research')} className={`px-6 py-2 rounded-md transition-colors ${selectedWorkType === 'research' ? 'bg-purple-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}>Research</button>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredWorks.map((item) => (
//               <div key={`${item.type}-${item.id}`} className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//                 <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
//                 <div className="p-6">
//                   <div className={`text-sm font-medium mb-2 ${item.type === 'book' ? 'text-blue-600' : item.type === 'thesis' ? 'text-green-600' : 'text-purple-600'}`}>
//                     {item.category} • {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
//                   <p className="text-gray-600 mb-4">{item.description}</p>
//                   <div className="text-sm text-gray-500 mb-4">{item.publishedYear} • {item.publisher || item.university || item.journal}</div>
//                   <a href={item.document} target="_blank" rel="noopener noreferrer" className="w-full block text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">View Document</a>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   };

//   // Contact
//   const Contact = () => {
//     const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

//     const handleContactSubmit = (e) => {
//       e.preventDefault();
//       const newMessage = {
//         id: Date.now(),
//         ...contactForm,
//         date: new Date().toISOString().split('T')[0],
//         read: false
//       };
//       setData(prev => ({ ...prev, messages: [newMessage, ...prev.messages] }));
//       setContactForm({ name: '', email: '', message: '' });
//       alert('Message sent successfully!');
//     };

//     return (
//       <section id="contact" className="min-h-screen bg-gray-50 py-20">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Me</h2>
//             <p className="text-xl text-gray-600">Get in touch for collaborations or inquiries</p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             <div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-6">Let's Connect</h3>
//               <div className="space-y-4 mb-8">
//                 <div className="flex items-center"><Mail className="w-5 h-5 text-blue-600 mr-3" /><span>{data.profile.email}</span></div>
//                 <div className="flex items-center"><Phone className="w-5 h-5 text-blue-600 mr-3" /><span>{data.profile.phone}</span></div>
//                 <div className="flex items-center"><MapPin className="w-5 h-5 text-blue-600 mr-3" /><span>{data.profile.location}</span></div>
//               </div>

//               <div className="flex space-x-4">
//                 <a href={data.socialLinks.github} className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"><Github className="w-6 h-6 text-gray-700" /></a>
//                 <a href={data.socialLinks.linkedin} className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"><Linkedin className="w-6 h-6 text-gray-700" /></a>
//                 <a href={data.socialLinks.twitter} className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"><Twitter className="w-6 h-6 text-gray-700" /></a>
//               </div>
//             </div>

//             <form onSubmit={handleContactSubmit} className="bg-white p-8 rounded-lg shadow-md">
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
//                   <input type="text" required value={contactForm.name} onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//                   <input type="email" required value={contactForm.email} onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
//                   <textarea rows="6" required value={contactForm.message} onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
//                 </div>
//                 <button type="submit" className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
//                   <Send className="w-5 h-5 mr-2" /> Send Message
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </section>
//     );
//   };

//   // Footer
//   const Footer = () => (
//     <footer className="bg-gray-900 text-white py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div>
//             <h3 className="text-2xl font-bold mb-4">{data.profile.name}</h3>
//             <p className="text-gray-400">{data.profile.about}</p>
//           </div>
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
//             <div className="space-y-2">
//               <button onClick={() => scrollToSection('about')} className="block text-gray-400 hover:text-white transition-colors">About</button>
//               <button onClick={() => scrollToSection('qualifications')} className="block text-gray-400 hover:text-white transition-colors">Qualifications</button>
//               <button onClick={() => scrollToSection('works')} className="block text-gray-400 hover:text-white transition-colors">Works</button>
//               <button onClick={() => scrollToSection('contact')} className="block text-gray-400 hover:text-white transition-colors">Contact</button>
//             </div>
//           </div>
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Connect</h4>
//             <div className="flex space-x-4">
//               <a href={data.socialLinks.github} className="p-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors"><Github className="w-5 h-5" /></a>
//               <a href={data.socialLinks.linkedin} className="p-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors"><Linkedin className="w-5 h-5" /></a>
//               <a href={data.socialLinks.twitter} className="p-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors"><Twitter className="w-5 h-5" /></a>
//             </div>
//           </div>
//         </div>
//         <div className="border-t border-gray-800 mt-8 pt-8 text-center">
//           <p className="text-gray-400">© {new Date().getFullYear()} {data.profile.name}. All rights reserved.</p>
//           <button onClick={() => setIsAdmin(true)} className="text-xs text-gray-600 mt-2 hover:text-gray-400 transition-colors">Admin</button>
//         </div>
//       </div>
//     </footer>
//   );

//   // Admin: Messages
//   const AdminMessages = () => (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h2 className="text-3xl font-bold text-gray-900 mb-8">Messages</h2>
//       <div className="space-y-4">
//         {data.messages.length === 0 && <div className="text-gray-500">No messages yet.</div>}
//         {data.messages.map((message) => (
//           <div key={message.id} className={`bg-white p-6 rounded-lg shadow-md ${!message.read ? 'border-l-4 border-blue-500' : ''}`}>
//             <div className="flex justify-between items-start">
//               <div className="flex-1">
//                 <h3 className="text-lg font-semibold text-gray-900">{message.name}</h3>
//                 <p className="text-blue-600">{message.email}</p>
//                 <p className="text-gray-600 mt-2">{message.message}</p>
//                 <p className="text-sm text-gray-400 mt-2">{message.date}</p>
//               </div>
//               <div className="flex space-x-2 ml-4">
//                 {!message.read && (
//                   <button
//                     onClick={() => {
//                       setData(prev => ({ ...prev, messages: prev.messages.map(m => m.id === message.id ? { ...m, read: true } : m) }));
//                     }}
//                     className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
//                   >
//                     Mark Read
//                   </button>
//                 )}
//                 <button
//                   onClick={() => {
//                     setData(prev => ({ ...prev, messages: prev.messages.filter(m => m.id !== message.id) }));
//                   }}
//                   className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   // Admin: Manage Content
//   const AdminManage = () => {
//     const clearNewItem = () => setNewItem({ title: '', category: '', description: '', publishedYear: '', publisher: '', university: '', journal: '', image: '/api/placeholder/300/400' });

//     const handleAddItem = (type) => {
//       if (!newItem.title) return alert('Title is required');
//       const item = {
//         id: Date.now(),
//         ...newItem,
//         document: `/documents/${newItem.title.toLowerCase().replace(/\s+/g, '-')}.pdf`
//       };
//       setData(prev => ({ ...prev, [type]: [item, ...prev[type]] }));
//       clearNewItem();
//       setShowAddForm(false);
//     };

//     const handleDeleteItem = (type, id) => {
//       if (!confirm('Delete this item?')) return;
//       setData(prev => ({ ...prev, [type]: prev[type].filter(item => item.id !== id) }));
//     };

//     const startEdit = (item, type) => {
//       setEditingItem({ ...item, type });
//       // scroll into view or open modal; here we'll use the same form area
//       setShowAddForm(false);
//       window.scrollTo({ top: 120, behavior: 'smooth' });
//     };

//     const cancelEdit = () => setEditingItem(null);

//     const saveEdit = () => {
//       if (!editingItem.title) return alert('Title is required');
//       const type = editingItem.type;
//       setData(prev => ({ ...prev, [type]: prev[type].map(it => it.id === editingItem.id ? mapEditToItem(editingItem) : it) }));
//       setEditingItem(null);
//     };

//     const mapEditToItem = (edit) => {
//       // normalize fields to stored structure
//       const base = {
//         id: edit.id,
//         title: edit.title,
//         category: edit.category,
//         description: edit.description,
//         publishedYear: edit.publishedYear,
//         image: edit.image || '/api/placeholder/300/400',
//         document: edit.document || `/documents/${(edit.title || '').toLowerCase().replace(/\s+/g, '-')}.pdf`
//       };
//       if (edit.type === 'books') base.publisher = edit.publisher || '';
//       if (edit.type === 'thesis') base.university = edit.university || '';
//       if (edit.type === 'researchPapers') base.journal = edit.journal || '';
//       return base;
//     };

//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <h2 className="text-3xl font-bold text-gray-900 mb-8">Manage Content</h2>

//         <div className="mb-8 flex space-x-4">
//           <button onClick={() => { setShowAddForm(true); setAddFormType('books'); setEditingItem(null); clearNewItem(); }} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center hover:bg-blue-700 transition-colors"><Plus className="w-4 h-4 mr-2" /> Add Book</button>
//           <button onClick={() => { setShowAddForm(true); setAddFormType('thesis'); setEditingItem(null); clearNewItem(); }} className="bg-green-600 text-white px-4 py-2 rounded flex items-center hover:bg-green-700 transition-colors"><Plus className="w-4 h-4 mr-2" /> Add Thesis</button>
//           <button onClick={() => { setShowAddForm(true); setAddFormType('researchPapers'); setEditingItem(null); clearNewItem(); }} className="bg-purple-600 text-white px-4 py-2 rounded flex items-center hover:bg-purple-700 transition-colors"><Plus className="w-4 h-4 mr-2" /> Add Research Paper</button>
//         </div>

//         {/* Add form */}
//         {showAddForm && (
//           <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//             <h3 className="text-xl font-bold mb-4">Add New {addFormType === 'books' ? 'Book' : addFormType === 'thesis' ? 'Thesis' : 'Research Paper'}</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input type="text" placeholder="Title" value={newItem.title} onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))} className="px-3 py-2 border rounded" />
//               <input type="text" placeholder="Category" value={newItem.category} onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))} className="px-3 py-2 border rounded" />
//               <textarea placeholder="Description" value={newItem.description} onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))} className="px-3 py-2 border rounded col-span-2" />
//               <input type="text" placeholder="Published Year" value={newItem.publishedYear} onChange={(e) => setNewItem(prev => ({ ...prev, publishedYear: e.target.value }))} className="px-3 py-2 border rounded" />
//               {addFormType === 'books' && <input type="text" placeholder="Publisher" value={newItem.publisher} onChange={(e) => setNewItem(prev => ({ ...prev, publisher: e.target.value }))} className="px-3 py-2 border rounded" />}
//               {addFormType === 'thesis' && <input type="text" placeholder="University" value={newItem.university} onChange={(e) => setNewItem(prev => ({ ...prev, university: e.target.value }))} className="px-3 py-2 border rounded" />}
//               {addFormType === 'researchPapers' && <input type="text" placeholder="Journal" value={newItem.journal} onChange={(e) => setNewItem(prev => ({ ...prev, journal: e.target.value }))} className="px-3 py-2 border rounded" />}
//               <input type="text" placeholder="Image URL" value={newItem.image} onChange={(e) => setNewItem(prev => ({ ...prev, image: e.target.value }))} className="px-3 py-2 border rounded col-span-2" />
//             </div>
//             <div className="mt-4 flex space-x-2">
//               <button onClick={() => handleAddItem(addFormType)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">Add Item</button>
//               <button onClick={() => { setShowAddForm(false); clearNewItem(); }} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors">Cancel</button>
//             </div>
//           </div>
//         )}

//         {/* Edit form */}
//         {editingItem && (
//           <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//             <h3 className="text-xl font-bold mb-4">Edit {editingItem.type === 'books' ? 'Book' : editingItem.type === 'thesis' ? 'Thesis' : 'Research Paper'}</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input type="text" placeholder="Title" value={editingItem.title} onChange={(e) => setEditingItem(prev => ({ ...prev, title: e.target.value }))} className="px-3 py-2 border rounded" />
//               <input type="text" placeholder="Category" value={editingItem.category} onChange={(e) => setEditingItem(prev => ({ ...prev, category: e.target.value }))} className="px-3 py-2 border rounded" />
//               <textarea placeholder="Description" value={editingItem.description} onChange={(e) => setEditingItem(prev => ({ ...prev, description: e.target.value }))} className="px-3 py-2 border rounded col-span-2" />
//               <input type="text" placeholder="Published Year" value={editingItem.publishedYear} onChange={(e) => setEditingItem(prev => ({ ...prev, publishedYear: e.target.value }))} className="px-3 py-2 border rounded" />
//               {editingItem.type === 'books' && <input type="text" placeholder="Publisher" value={editingItem.publisher || ''} onChange={(e) => setEditingItem(prev => ({ ...prev, publisher: e.target.value }))} className="px-3 py-2 border rounded" />}
//               {editingItem.type === 'thesis' && <input type="text" placeholder="University" value={editingItem.university || ''} onChange={(e) => setEditingItem(prev => ({ ...prev, university: e.target.value }))} className="px-3 py-2 border rounded" />}
//               {editingItem.type === 'researchPapers' && <input type="text" placeholder="Journal" value={editingItem.journal || ''} onChange={(e) => setEditingItem(prev => ({ ...prev, journal: e.target.value }))} className="px-3 py-2 border rounded" />}
//               <input type="text" placeholder="Image URL" value={editingItem.image || ''} onChange={(e) => setEditingItem(prev => ({ ...prev, image: e.target.value }))} className="px-3 py-2 border rounded col-span-2" />
//             </div>
//             <div className="mt-4 flex space-x-2">
//               <button onClick={saveEdit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">Save</button>
//               <button onClick={cancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors">Cancel</button>
//             </div>
//           </div>
//         )}

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {['books', 'thesis', 'researchPapers'].map((type) => (
//             <div key={type} className="space-y-4">
//               <h3 className="text-xl font-bold capitalize">{type}</h3>
//               {data[type].length === 0 && <div className="text-gray-500">No items</div>}
//               {data[type].map((item) => (
//                 <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
//                   <h4 className="font-semibold">{item.title}</h4>
//                   <p className="text-sm text-gray-600">{item.category}</p>
//                   <div className="flex space-x-2 mt-2">
//                     <button onClick={() => startEdit(item, type)} className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition-colors"><Edit className="w-3 h-3" /></button>
//                     <button onClick={() => handleDeleteItem(type, item.id)} className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition-colors"><Trash2 className="w-3 h-3" /></button>
//                     <a href={item.document} target="_blank" rel="noopener noreferrer" className="ml-2 text-xs underline text-blue-600">Open Document</a>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   // If admin mode
//   if (isAdmin) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="pt-20">
//           {adminPage === 'messages' ? <AdminMessages /> : <AdminManage />}
//         </div>
//       </div>
//     );
//   }

//   // Main render
//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar />
//       <Hero />
//       <About />
//       <Qualifications />
//       <Works />
//       <Contact />
//       <Footer />
//     </div>
//   );
// };

// export default Portfolio;



















import React, { useState, useEffect } from 'react';
import {
  ChevronDown, Mail, Phone, MapPin, Github, Linkedin, Twitter, Book, FileText,
  Search, Plus, Edit, Trash2, Send, User, Calendar, Award, Briefcase, Eye,
  GraduationCap, Users, Star, Globe, BookOpen, Presentation
} from 'lucide-react';

// Academic Data for Dr. Aditya Khamparia
const academicData = {
  profile: {
    name: "Dr. Aditya Khamparia",
    title: "Researcher · Learner · Educator",
    about: "Dr. Aditya Khamparia is an eminent academician who plays versatile roles juggling between lectures, research, publications, consultancy, community service, and PhD supervision. With 8 years of rich expertise in teaching and one year in industry, he focuses on rational and practical learning. He has contributed massive literature in Educational Technologies, Intelligent Data Analysis, Nature-Inspired Computing, Machine Learning, Deep Learning and Soft Computing.",
    image: "/api/placeholder/400/400",
    email: "aditya.khamparia88@gmail.com",
    phone: "+91 XXX XXX XXXX",
    location: "Lucknow, Uttar Pradesh, India"
  },
  qualifications: [
    {
      id: 1,
      year: "2019",
      title: "Post-Doctoral Research",
      institution: "University of Fortaleza, Brazil",
      description: "Post-Doctoral research focusing on Deep Learning, Machine Learning, and Artificial Intelligence applications.",
      type: "postdoc"
    },
    {
      id: 2,
      year: "2018",
      title: "Ph.D. in Computer Science & Engineering",
      institution: "Lovely Professional University (LPU)",
      description: "Thesis: Intelligent Computing Methods in E-learning Environment. Supervised by Dr. Babita Pandey.",
      type: "phd"
    },
    {
      id: 3,
      year: "2013",
      title: "M.Tech in Computer Science & Engineering",
      institution: "Vellore Institute of Technology (VIT)",
      description: "Thesis: Firmware Validation and Optimization for Sensor Hub. Supervised by Dr. Saira Banu and Mr. Dhawal (Intel India).",
      type: "masters"
    },
    {
      id: 4,
      year: "2010",
      title: "B.E. in Computer Science & Engineering",
      institution: "Rajiv Gandhi Technical University",
      description: "Bachelor's degree in Computer Science & Engineering with strong foundational knowledge.",
      type: "bachelors"
    },
    {
      id: 5,
      year: "Qualified",
      title: "UGC-NET & GATE",
      institution: "Government of India",
      description: "Qualified National Eligibility Test (NET) and Graduate Aptitude Test in Engineering (GATE).",
      type: "certification"
    }
  ],
  experience: [
    {
      id: 1,
      title: "Assistant Professor",
      institution: "Babasaheb Bhimrao Ambedkar University, Lucknow",
      duration: "April 2021 - Present",
      courses: ["C Programming", "C++ Lab", "Computer Graphics"],
      description: "Teaching undergraduate and postgraduate courses while conducting research in AI and ML."
    },
    {
      id: 2,
      title: "Associate Professor",
      institution: "Lovely Professional University, Punjab",
      duration: "January 2020 - March 2021",
      courses: ["C Programming", "Machine Learning", "Soft Computing Techniques"],
      description: "Senior academic role with research supervision and curriculum development responsibilities."
    },
    {
      id: 3,
      title: "Post-Doctoral Researcher",
      institution: "University of Fortaleza, Brazil",
      duration: "December 2018 - December 2019",
      courses: ["Deep Learning", "Machine Learning", "Artificial Intelligence", "Python Programming"],
      description: "International research experience focusing on advanced AI applications."
    },
    {
      id: 4,
      title: "Assistant Professor",
      institution: "Lovely Professional University, Punjab",
      duration: "August 2013 - December 2018",
      courses: ["Deep Learning", "Machine Learning", "Artificial Intelligence", "Python Programming"],
      description: "Initial academic position with focus on emerging technologies and student mentoring."
    }
  ],
  researchAreas: [
    "Artificial Intelligence",
    "Intelligent Data Analysis", 
    "Educational Technologies",
    "Machine Learning",
    "Deep Learning",
    "Soft Computing",
    "Nature-Inspired Computing"
  ],
  books: [
    {
      id: 1,
      title: "Educational Technologies and AI",
      category: "Educational Technology",
      image: "/api/placeholder/300/400",
      description: "Comprehensive guide on implementing AI in educational systems and e-learning platforms.",
      publishedYear: "2023",
      publisher: "Academic Press",
      document: "/documents/educational-tech-ai.pdf"
    }
  ],
  researchPapers: [
    {
      id: 1,
      title: "DCAVN: Cervical cancer prediction and classification using deep convolutional and variational autoencoder network",
      category: "Deep Learning",
      journal: "Multimedia Tools and Applications (Springer)",
      impactFactor: "2.69",
      publishedYear: "2020",
      description: "Novel approach for cervical cancer detection using advanced deep learning architectures.",
      indexed: "SCIE",
      document: "/documents/dcavn-cervical-cancer.pdf"
    },
    {
      id: 2,
      title: "Internet of health things driven deep learning system for detection and classification of cervical cells using transfer learning",
      category: "IoT & Healthcare",
      journal: "Journal of Supercomputing (Springer)",
      impactFactor: "2.25",
      publishedYear: "2020",
      description: "Integration of IoT and deep learning for healthcare applications with transfer learning techniques.",
      indexed: "SCIE",
      document: "/documents/iot-health-deep-learning.pdf"
    },
    {
      id: 3,
      title: "Comparison of RSM, ANN and Fuzzy logic for extraction of Oleonolic acid from Ocimum Sanctum",
      category: "Soft Computing",
      journal: "Computers in Industry (Elsevier)",
      impactFactor: "4.76",
      publishedYear: "2020",
      description: "Comparative analysis of different computational approaches for chemical extraction optimization.",
      indexed: "SCIE",
      document: "/documents/rsm-ann-fuzzy-comparison.pdf"
    },
    {
      id: 4,
      title: "A hybrid whale optimization-differential evolution and genetic algorithm-based approach to solve unit commitment scheduling problem",
      category: "Optimization",
      journal: "Sustainable Computing: Informatics and System (Elsevier)",
      impactFactor: "2.72",
      publishedYear: "2020",
      description: "Hybrid optimization algorithm for solving complex scheduling problems in power systems.",
      indexed: "SCIE",
      document: "/documents/whale-optimization-scheduling.pdf"
    },
    {
      id: 5,
      title: "A Novel Transfer Learning Based Approach for Pneumonia Detection in Chest X-Ray Images",
      category: "Medical AI",
      journal: "Applied Sciences (MDPI)",
      impactFactor: "2.21",
      publishedYear: "2020",
      description: "Transfer learning application for medical image analysis and pneumonia detection.",
      indexed: "SCIE",
      document: "/documents/pneumonia-detection-transfer-learning.pdf"
    }
  ],
  projects: [
    {
      id: 1,
      title: "Design and Development of Adaptable e-learning System for Improving Education in Neuromuscular Disease Affected Children",
      role: "Co-Principal Investigator",
      fundingAgency: "INDIAN COUNCIL OF SOCIAL SCIENCE RESEARCH (ICSSR), New Delhi",
      duration: "December 2018 - December 2020",
      description: "Development of adaptive learning management systems and game-driven educational content for children with neuromuscular disorders like DMD, BMD and LGMD.",
      impact: "Addressing educational needs of approximately 30,000 affected children in India with 3,000 new cases annually."
    }
  ],
  supervision: [
    {
      id: 1,
      scholar: "Dr. Rajkamal Kaur",
      title: "Safety Analysis of Critical Systems",
      status: "Degree Awarded",
      institution: "Lovely Professional University"
    },
    {
      id: 2,
      scholar: "Dr. Praveen K Bhanodia", 
      title: "Link Prediction in Social Networks",
      status: "Degree Awarded",
      institution: "Lovely Professional University"
    },
    {
      id: 3,
      scholar: "Dr. Amritpal Singh",
      title: "A Nature Inspired Hybrid Approach to Solve Unit Commitment Scheduling Problem", 
      status: "Final Viva Voce Completed",
      institution: "Lovely Professional University"
    }
  ],
  achievements: [
    {
      id: 1,
      year: "2018-19",
      title: "Best Researcher Excellence Award",
      value: "Rs 50,000",
      institution: "Lovely Professional University"
    },
    {
      id: 2,
      year: "2017-18", 
      title: "Best Researcher Award",
      value: "Rs 10,000",
      institution: "Lovely Professional University"
    },
    {
      id: 3,
      year: "2016-17",
      title: "Best Researcher Award", 
      value: "Rs 30,000",
      institution: "Lovely Professional University"
    },
    {
      id: 4,
      year: "2015-16",
      title: "Best Researcher Award",
      value: "Rs 25,000", 
      institution: "Lovely Professional University"
    },
    {
      id: 5,
      year: "2014",
      title: "Best Paper Award",
      value: "Recognition",
      institution: "International Multi Track Conference, CT Group of Institutions"
    }
  ],
  professionalBodies: [
    "ISTE", "IAENG", "IACSIT", "CSI", "ACM", "IET", "Internet Society"
  ],
  editorialRoles: [
    "Honorary Editor - ICSES Transactions on Image Processing and Pattern Recognition (ITIPPR)",
    "Special Issue Editor - Recent Advancement in Information Science and Technology, SCOPUS, Bentham Science",
    "Guest Editor - Bio-Inspired Optimization Techniques for BioMedical Data Analysis, IJICA, Inderscience",
    "Guest Editor - Knowledge Management and Data Representation in Network Sciences, IJEB, Inderscience"
  ],
  messages: [],
  socialLinks: {
    github: "https://github.com/adityakhamparia",
    linkedin: "https://linkedin.com/in/adityakhamparia", 
    twitter: "https://twitter.com/adityakhamparia"
  },
  stats: {
    publications: 73,
    sciIndexed: 26,
    hIndex: "15+",
    citations: "500+",
    projects: 5,
    phdSupervised: 3
  }
};

const STORAGE_KEY = 'academic_portfolio_data_v1';

const AcademicPortfolio = () => {
  const [data, setData] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? { ...academicData, ...JSON.parse(raw) } : academicData;
    } catch (e) {
      return academicData;
    }
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPage, setAdminPage] = useState('messages');
  const [selectedWorkType, setSelectedWorkType] = useState('all');
  const [editingItem, setEditingItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addFormType, setAddFormType] = useState('books');
  const [newItem, setNewItem] = useState({
    title: '', category: '', description: '', publishedYear: '',
    publisher: '', university: '', journal: '', impactFactor: '', indexed: '', image: '/api/placeholder/300/400'
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to save portfolio data', e);
    }
  }, [data]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // Navbar
  const Navbar = () => (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-blue-900">{data.profile.name}</div>
          {!isAdmin && (
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-blue-600 transition-colors">Home</button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-blue-600 transition-colors">About</button>
              <button onClick={() => scrollToSection('qualifications')} className="text-gray-700 hover:text-blue-600 transition-colors">Education</button>
              <button onClick={() => scrollToSection('experience')} className="text-gray-700 hover:text-blue-600 transition-colors">Experience</button>
              <button onClick={() => scrollToSection('research')} className="text-gray-700 hover:text-blue-600 transition-colors">Research</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-600 transition-colors">Contact</button>
            </div>
          )}
          {isAdmin && (
            <div className="flex space-x-4">
              <button onClick={() => setAdminPage('messages')} className={`px-4 py-2 rounded ${adminPage === 'messages' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}>Messages</button>
              <button onClick={() => setAdminPage('manage')} className={`px-4 py-2 rounded ${adminPage === 'manage' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}>Manage Content</button>
              <button onClick={() => setIsAdmin(false)} className="px-4 py-2 bg-red-500 text-white rounded">Exit Admin</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );

  // Hero
  const Hero = () => (
    <section id="home" className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">{data.profile.name}</h1>
            <p className="text-2xl text-blue-600 font-semibold mb-4">{data.profile.title}</p>
            <p className="text-lg text-gray-600 mb-8">{data.profile.about}</p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600">{data.stats.publications}</div>
                <div className="text-sm text-gray-600">Publications</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-green-600">{data.stats.sciIndexed}</div>
                <div className="text-sm text-gray-600">SCI Indexed</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-purple-600">{data.stats.hIndex}</div>
                <div className="text-sm text-gray-600">H-Index</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-orange-600">{data.stats.phdSupervised}</div>
                <div className="text-sm text-gray-600">PhD Supervised</div>
              </div>
            </div>

            <button onClick={() => scrollToSection('contact')} className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors mr-4">Contact Me</button>
            <button onClick={() => scrollToSection('research')} className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">View Research</button>
          </div>
          <div className="flex justify-center">
            <img src={data.profile.image} alt={data.profile.name} className="w-96 h-96 object-cover rounded-full shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  );

  // About
  const About = () => (
    <section id="about" className="min-h-screen bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Dr. Khamparia</h2>
          <p className="text-xl text-gray-600">Academic Excellence & Research Leadership</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <img src={data.profile.image} alt={data.profile.name} className="w-full h-96 object-cover rounded-lg shadow-lg mb-6" />
            
            {/* Research Areas */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Research Areas</h3>
              <div className="flex flex-wrap gap-2">
                {data.researchAreas.map((area, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{area}</span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">{data.profile.about}</p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center"><Mail className="w-5 h-5 text-blue-600 mr-3" /><span>{data.profile.email}</span></div>
              <div className="flex items-center"><Phone className="w-5 h-5 text-blue-600 mr-3" /><span>{data.profile.phone}</span></div>
              <div className="flex items-center"><MapPin className="w-5 h-5 text-blue-600 mr-3" /><span>{data.profile.location}</span></div>
            </div>

            {/* Professional Memberships */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Professional Memberships</h3>
              <div className="flex flex-wrap gap-2">
                {data.professionalBodies.map((body, index) => (
                  <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">{body}</span>
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
                      <div className="font-semibold">{achievement.title} ({achievement.year})</div>
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

  // Education
  const Education = () => (
    <section id="qualifications" className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Educational Background</h2>
          <p className="text-xl text-gray-600">Academic journey and qualifications</p>
        </div>

        <div className="space-y-8">
          {data.qualifications.map((qual) => (
            <div key={qual.id} className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-6">
                  <GraduationCap className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{qual.title}</h3>
                      <p className="text-blue-600 font-semibold text-lg">{qual.institution}</p>
                      <p className="text-gray-600">{qual.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">{qual.year}</div>
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

  // Experience
  const Experience = () => (
    <section id="experience" className="min-h-screen bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Experience</h2>
          <p className="text-xl text-gray-600">Academic and research positions</p>
        </div>

        <div className="space-y-8">
          {data.experience.map((exp) => (
            <div key={exp.id} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg shadow-md p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mr-6">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{exp.title}</h3>
                      <p className="text-blue-600 font-semibold text-lg">{exp.institution}</p>
                      <p className="text-gray-600 mb-4">{exp.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">{exp.duration}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Courses Taught:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.courses.map((course, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{course}</span>
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

  // Research Section
  const Research = () => {
    const allWorks = [
      ...data.books.map(item => ({ ...item, type: 'book' })),
      ...data.researchPapers.map(item => ({ ...item, type: 'paper' }))
    ];

    const filteredWorks = selectedWorkType === 'all' 
      ? allWorks 
      : allWorks.filter(work => work.type === selectedWorkType);

    return (
      <section id="research" className="min-h-screen bg-gray-50 py-20">
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
                className={`px-6 py-2 rounded-md transition-colors ${selectedWorkType === 'all' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
              >
                All Works
              </button>
              <button 
                onClick={() => setSelectedWorkType('paper')} 
                className={`px-6 py-2 rounded-md transition-colors ${selectedWorkType === 'paper' ? 'bg-purple-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
              >
                Research Papers
              </button>
              <button 
                onClick={() => setSelectedWorkType('book')} 
                className={`px-6 py-2 rounded-md transition-colors ${selectedWorkType === 'book' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
              >
                Books
              </button>
            </div>
          </div>

          {/* Publications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredWorks.slice(0, 6).map((item) => (
              <div key={`${item.type}-${item.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className={`text-sm font-medium mb-2 ${item.type === 'book' ? 'text-blue-600' : 'text-purple-600'}`}>
                    {item.category} • {item.type === 'book' ? 'Book' : 'Research Paper'}
                    {item.impactFactor && <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">IF: {item.impactFactor}</span>}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
                  <div className="text-sm text-gray-500 mb-4">
                    {item.publishedYear} • {item.publisher || item.journal}
                    {item.indexed && <span className="ml-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">{item.indexed}</span>}
                  </div>
                  <a href={item.document} target="_blank" rel="noopener noreferrer" className="w-full block text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
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
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${sup.status === 'Degree Awarded' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
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
                      <div className="flex items-center mb-4">
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold mr-4">{project.role}</span>
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

  // Contact Section
  const Contact = () => {
    const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

    const handleContactSubmit = (e) => {
      e.preventDefault();
      const newMessage = {
        id: Date.now(),
        ...contactForm,
        date: new Date().toISOString().split('T')[0],
        read: false
      };
      setData(prev => ({ ...prev, messages: [newMessage, ...prev.messages] }));
      setContactForm({ name: '', email: '', message: '' });
      alert('Message sent successfully!');
    };

    return (
      <section id="contact" className="min-h-screen bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Dr. Khamparia</h2>
            <p className="text-xl text-gray-600">Get in touch for collaboration, research, or academic inquiries</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Let's Collaborate</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-blue-600 mr-4" />
                  <span className="text-lg">{data.profile.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-blue-600 mr-4" />
                  <span className="text-lg">{data.profile.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-blue-600 mr-4" />
                  <span className="text-lg">{data.profile.location}</span>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Research Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {data.researchAreas.slice(0, 5).map((area, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm">{area}</span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <a href={data.socialLinks.github} className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                  <Github className="w-6 h-6 text-gray-700" />
                </a>
                <a href={data.socialLinks.linkedin} className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                  <Linkedin className="w-6 h-6 text-gray-700" />
                </a>
                <a href={data.socialLinks.twitter} className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                  <Twitter className="w-6 h-6 text-gray-700" />
                </a>
              </div>
            </div>

            <form onSubmit={handleContactSubmit} className="bg-gray-50 p-8 rounded-lg shadow-md">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input 
                    type="text" 
                    required 
                    value={contactForm.name} 
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    required 
                    value={contactForm.email} 
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea 
                    rows="6" 
                    required 
                    value={contactForm.message} 
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="Please describe your inquiry, research collaboration ideas, or academic questions..."
                  />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <Send className="w-5 h-5 mr-2" /> Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  };

  // Footer
  const Footer = () => (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">{data.profile.name}</h3>
            <p className="text-gray-400 mb-4">{data.profile.title}</p>
            <p className="text-gray-400 text-sm">{data.profile.about.substring(0, 200)}...</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <button onClick={() => scrollToSection('about')} className="block text-gray-400 hover:text-white transition-colors">About</button>
              <button onClick={() => scrollToSection('qualifications')} className="block text-gray-400 hover:text-white transition-colors">Education</button>
              <button onClick={() => scrollToSection('experience')} className="block text-gray-400 hover:text-white transition-colors">Experience</button>
              <button onClick={() => scrollToSection('research')} className="block text-gray-400 hover:text-white transition-colors">Research</button>
              <button onClick={() => scrollToSection('contact')} className="block text-gray-400 hover:text-white transition-colors">Contact</button>
            </div>
          </div>
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
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} {data.profile.name}. All rights reserved.</p>
          <button onClick={() => setIsAdmin(true)} className=" text-xs text-gray-900 mt-2 hover:text-gray-400 transition-colors">Admin</button>
        </div>
      </div>
    </footer>
  );

  // Admin Components (Messages and Manage Content)
  const AdminMessages = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Academic Inquiries & Messages</h2>
      <div className="space-y-4">
        {data.messages.length === 0 && <div className="text-gray-500 text-center py-8">No messages yet.</div>}
        {data.messages.map((message) => (
          <div key={message.id} className={`bg-white p-6 rounded-lg shadow-md ${!message.read ? 'border-l-4 border-blue-500' : ''}`}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{message.name}</h3>
                <p className="text-blue-600">{message.email}</p>
                <p className="text-gray-600 mt-2">{message.message}</p>
                <p className="text-sm text-gray-400 mt-2">{message.date}</p>
              </div>
              <div className="flex space-x-2 ml-4">
                {!message.read && (
                  <button
                    onClick={() => {
                      setData(prev => ({ ...prev, messages: prev.messages.map(m => m.id === message.id ? { ...m, read: true } : m) }));
                    }}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    Mark Read
                  </button>
                )}
                <button
                  onClick={() => {
                    setData(prev => ({ ...prev, messages: prev.messages.filter(m => m.id !== message.id) }));
                  }}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AdminManage = () => {
    const clearNewItem = () => setNewItem({ 
      title: '', category: '', description: '', publishedYear: '', 
      publisher: '', university: '', journal: '', impactFactor: '', indexed: '', image: '/api/placeholder/300/400' 
    });

    const handleAddItem = (type) => {
      if (!newItem.title) return alert('Title is required');
      const item = {
        id: Date.now(),
        ...newItem,
        document: `/documents/${newItem.title.toLowerCase().replace(/\s+/g, '-')}.pdf`
      };
      setData(prev => ({ ...prev, [type]: [item, ...prev[type]] }));
      clearNewItem();
      setShowAddForm(false);
    };

    const handleDeleteItem = (type, id) => {
      if (!confirm('Delete this item?')) return;
      setData(prev => ({ ...prev, [type]: prev[type].filter(item => item.id !== id) }));
    };

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Manage Academic Content</h2>

        <div className="mb-8 flex space-x-4">
          <button onClick={() => { setShowAddForm(true); setAddFormType('books'); clearNewItem(); }} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" /> Add Book
          </button>
          <button onClick={() => { setShowAddForm(true); setAddFormType('researchPapers'); clearNewItem(); }} className="bg-purple-600 text-white px-4 py-2 rounded flex items-center hover:bg-purple-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" /> Add Research Paper
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-bold mb-4">Add New {addFormType === 'books' ? 'Book' : 'Research Paper'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Title" value={newItem.title} onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))} className="px-3 py-2 border rounded" />
              <input type="text" placeholder="Category" value={newItem.category} onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))} className="px-3 py-2 border rounded" />
              <textarea placeholder="Description" value={newItem.description} onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))} className="px-3 py-2 border rounded col-span-2" />
              <input type="text" placeholder="Published Year" value={newItem.publishedYear} onChange={(e) => setNewItem(prev => ({ ...prev, publishedYear: e.target.value }))} className="px-3 py-2 border rounded" />
              {addFormType === 'books' ? (
                <input type="text" placeholder="Publisher" value={newItem.publisher} onChange={(e) => setNewItem(prev => ({ ...prev, publisher: e.target.value }))} className="px-3 py-2 border rounded" />
              ) : (
                <>
                  <input type="text" placeholder="Journal" value={newItem.journal} onChange={(e) => setNewItem(prev => ({ ...prev, journal: e.target.value }))} className="px-3 py-2 border rounded" />
                  <input type="text" placeholder="Impact Factor" value={newItem.impactFactor} onChange={(e) => setNewItem(prev => ({ ...prev, impactFactor: e.target.value }))} className="px-3 py-2 border rounded" />
                  <input type="text" placeholder="Indexed (e.g., SCIE, Scopus)" value={newItem.indexed} onChange={(e) => setNewItem(prev => ({ ...prev, indexed: e.target.value }))} className="px-3 py-2 border rounded" />
                </>
              )}
            </div>
            <div className="mt-4 flex space-x-2">
              <button onClick={() => handleAddItem(addFormType)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">Add Item</button>
              <button onClick={() => { setShowAddForm(false); clearNewItem(); }} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors">Cancel</button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {['books', 'researchPapers'].map((type) => (
            <div key={type} className="space-y-4">
              <h3 className="text-xl font-bold capitalize">{type === 'researchPapers' ? 'Research Papers' : type}</h3>
              {data[type].length === 0 && <div className="text-gray-500">No items</div>}
              {data[type].map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.category}</p>
                  {item.impactFactor && <p className="text-xs text-green-600">Impact Factor: {item.impactFactor}</p>}
                  <div className="flex space-x-2 mt-2">
                    <button onClick={() => handleDeleteItem(type, item.id)} className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition-colors">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Main render
  if (isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20">
          {adminPage === 'messages' ? <AdminMessages /> : <AdminManage />}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Experience />
      <Research />
      <Contact />
      <Footer />
    </div>
  );
};

export default AcademicPortfolio;