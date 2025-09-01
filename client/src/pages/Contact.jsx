import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { useAcademicData } from '../context/AcademicDataContext';
import API from "../Api"; // ✅ axios instance

const Contact = () => {
  const { data } = useAcademicData();
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const newMessage = {
        ...contactForm,
        date: new Date().toISOString().split('T')[0],
        read: false,
      };

      await API.post("/messages", newMessage); // ✅ Send to backend

      setContactForm({ name: '', email: '', message: '' });
      alert("Message sent successfully!");
    } catch (err) {
      console.error("❌ Error sending message:", err.message);
      alert("Failed to send message. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-white py-20 pt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Dr. Khamparia</h2>
          <p className="text-xl text-gray-600">
            Get in touch for collaboration, research, or academic inquiries
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side */}
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
                  <span 
                    key={index} 
                    className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <a href={data.socialLinks.github} target="_blank" rel="noopener noreferrer"
                className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <Github className="w-6 h-6 text-gray-700" />
              </a>
              <a href={data.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <Linkedin className="w-6 h-6 text-gray-700" />
              </a>
              <a href={data.socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <Twitter className="w-6 h-6 text-gray-700" />
              </a>
            </div>
          </div>

          {/* Right Side (Form) */}
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
              <button 
                type="submit" 
                disabled={submitting}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-60"
              >
                <Send className="w-5 h-5 mr-2" />
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;







// import React, { useState } from 'react';
// import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
// import { useAcademicData } from '../context/AcademicDataContext';

// const Contact = () => {
//   const { data, setData } = useAcademicData();
//   const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

//   const handleContactSubmit = (e) => {
//     e.preventDefault();
//     const newMessage = {
//       id: Date.now(),
//       ...contactForm,
//       date: new Date().toISOString().split('T')[0],
//       read: false
//     };
//     setData(prev => ({ ...prev, messages: [newMessage, ...prev.messages] }));
//     setContactForm({ name: '', email: '', message: '' });
//     alert('Message sent successfully!');
//   };

//   return (
//     <section className="min-h-screen bg-white py-20 pt-28">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Dr. Khamparia</h2>
//           <p className="text-xl text-gray-600">Get in touch for collaboration, research, or academic inquiries</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           <div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Let's Collaborate</h3>
//             <div className="space-y-4 mb-8">
//               <div className="flex items-center">
//                 <Mail className="w-6 h-6 text-blue-600 mr-4" />
//                 <span className="text-lg">{data.profile.email}</span>
//               </div>
//               <div className="flex items-center">
//                 <Phone className="w-6 h-6 text-blue-600 mr-4" />
//                 <span className="text-lg">{data.profile.phone}</span>
//               </div>
//               <div className="flex items-center">
//                 <MapPin className="w-6 h-6 text-blue-600 mr-4" />
//                 <span className="text-lg">{data.profile.location}</span>
//               </div>
//             </div>

//             <div className="mb-8">
//               <h4 className="text-lg font-semibold text-gray-900 mb-4">Research Interests</h4>
//               <div className="flex flex-wrap gap-2">
//                 {data.researchAreas.slice(0, 5).map((area, index) => (
//                   <span 
//                     key={index} 
//                     className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm"
//                   >
//                     {area}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <div className="flex space-x-4">
//               <a 
//                 href={data.socialLinks.github} 
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
//               >
//                 <Github className="w-6 h-6 text-gray-700" />
//               </a>
//               <a 
//                 href={data.socialLinks.linkedin} 
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
//               >
//                 <Linkedin className="w-6 h-6 text-gray-700" />
//               </a>
//               <a 
//                 href={data.socialLinks.twitter} 
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
//               >
//                 <Twitter className="w-6 h-6 text-gray-700" />
//               </a>
//             </div>
//           </div>

//           <form onSubmit={handleContactSubmit} className="bg-gray-50 p-8 rounded-lg shadow-md">
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
//                 <input 
//                   type="text" 
//                   required 
//                   value={contactForm.name} 
//                   onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))} 
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//                 <input 
//                   type="email" 
//                   required 
//                   value={contactForm.email} 
//                   onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))} 
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
//                 <textarea 
//                   rows="6" 
//                   required 
//                   value={contactForm.message} 
//                   onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))} 
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
//                   placeholder="Please describe your inquiry, research collaboration ideas, or academic questions..."
//                 />
//               </div>
//               <button 
//                 type="submit" 
//                 className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
//               >
//                 <Send className="w-5 h-5 mr-2" /> Send Message
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;