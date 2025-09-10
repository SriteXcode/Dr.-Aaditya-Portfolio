import React, { createContext, useContext, useState, useEffect } from 'react';

// Academic Data for Dr. Aditya Khamparia
const academicData = {
  profile: {
    name: "Dr. Aditya Khamparia",
    title: "Researcher · Learner · Educator",
    aboutHero: "Dr. Aditya Khamparia is an eminent academician who plays versatile roles juggling between lectures, research, publications, consultancy, community service, and PhD supervision.",
    about: "Dr. Aditya Khamparia is an eminent academician who plays versatile roles juggling between lectures, research, publications, consultancy, community service, and PhD supervision. With 18 years of rich expertise in teaching and one year in industry, he focuses on rational and practical learning. He has contributed massive literature in Educational Technologies, Intelligent Data Analysis, Nature-Inspired Computing, Machine Learning, Deep Learning and Soft Computing.",
    image: "https://ik.imagekit.io/nx2mu5rdoc/dummy/hero.png?updatedAt=1756370356605",
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
      status: "Degree Awarded",
      institution: "Lovely Professional University"
    },
    {
      id: 4,
      scholar: "Dr. Sagar D Pandey",
      title: ".....",
      status: "Degree Awarded",
      institution: "Lovely Professional University"
    }
  ],
  achievements: [
    {
      id: 1,
      year: "2023-24",
      title: "Research and Academic Excellence Award",
      value: "Rs 50,000",
      institution: "Babasaheb Bhimrao Ambedkar University"
    },
    {
      id: 2,
      year: "2022-23",
      title: "Research and Academic Excellence Award",
      value: "Rs 50,000",
      institution: "Babasaheb Bhimrao Ambedkar University"
    },
    {
      id: 3,
      year: "2021-22",
      title: "Research and Academic Excellence Award",
      value: "Rs 50,000",
      institution: "Babasaheb Bhimrao Ambedkar University"
    },
    {
      id: 4,
      year: "2020-21",
      title: "Best Researcher Excellence Award",
      value: "Rs 50,000",
      institution: "Babasaheb Bhimrao Ambedkar University"
    },
    {
      id: 5,
      year: "2018-19",
      title: "Best Researcher Excellence Award",
      value: "Rs 50,000",
      institution: "Lovely Professional University"
    },
    {
      id: 6,
      year: "2017-18",
      title: "Best Researcher Award",
      value: "Rs 10,000",
      institution: "Lovely Professional University"
    },
    {
      id: 7,
      year: "2016-17",
      title: "Best Researcher Award",
      value: "Rs 30,000",
      institution: "Lovely Professional University"
    },
    {
      id: 8,
      year: "2015-16",
      title: "Best Researcher Award",
      value: "Rs 25,000",
      institution: "Lovely Professional University"
    },
    {
      id: 9,
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
    citations: "7053+",
    projects: 5,
    phdSupervised: 3
  }
};

const AcademicDataContext = createContext();

export const useAcademicData = () => {
  const context = useContext(AcademicDataContext);
  if (!context) {
    throw new Error('useAcademicData must be used within an AcademicDataProvider');
  }
  return context;
};

export const AcademicDataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    // Note: Using in-memory storage instead of localStorage for Claude.ai compatibility
    return academicData;
  });

  const updateData = (newData) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  return (
    <AcademicDataContext.Provider value={{ data, setData, updateData }}>
      {children}
    </AcademicDataContext.Provider>
  );
};