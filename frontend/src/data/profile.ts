export interface Profile {
  name: string;
  role: string;
  subRole: string;
  academicStage: string;
  degree: string;
  specialization: string;
  university: string;
  tagline: string;
  bio: string;
  secondaryBio: string;
  location: string;
  status: string;
  avatar: string;
  resumeUrl: string;
  socials: {
    github: string;
    linkedin: string;
    email: string;
  };
  metrics: {
    label: string;
    value: string;
    sublabel: string;
  }[];
  education: {
    institution: string;
    degree: string;
    specialization: string;
    timeline: string;
    focusAreas: string[];
  };
}

export const PROFILE_DATA: Profile = {
  name: 'Rashi Koiri',
  role: 'AI/ML Engineer',
  subRole: 'Software Developer & Full-Stack Builder',
  academicStage: '2nd Year B.Tech CSE — AI/ML',
  degree: 'B.Tech in Computer Science & Engineering',
  specialization: 'Artificial Intelligence & Machine Learning',
  university: 'Adamas University',
  tagline: 'Building intelligent systems, modern applications and meaningful technology through code, data and continuous learning.',
  bio: 'I am a 2nd Year Computer Science and Engineering student specializing in AI & Machine Learning at Adamas University. Passionate about software architecture, modern web development, and algorithmic problem solving.',
  secondaryBio: 'Actively mastering full-stack engineering with React, Node.js, Express, and MySQL, while deepening my foundations in Data Structures, Algorithms, RESTful APIs, and Machine Learning pipelines.',
  location: 'Kolkata, India',
  status: 'Open to Hackathons, Projects & Internships',
  avatar: '/images/profile/rashi-koiri.jpeg',
  resumeUrl: '#contact',
  socials: {
    github: 'https://github.com/rashikoiri1-tech/rashi-portfolio.git',
    linkedin: 'https://www.linkedin.com/in/rashi-koiri-73a074384',
    email: 'rashikoiri@example.com'
  },
  metrics: [
    { label: 'Current Stage', value: '2nd Year', sublabel: 'B.Tech CSE (AI/ML)' },
    { label: 'Core Projects', value: '5+', sublabel: 'Full-stack & AI/ML' },
    { label: 'Primary Focus', value: 'DSA & APIs', sublabel: 'Problem Solving & DBs' },
    { label: 'University', value: 'Adamas', sublabel: 'Academic Excellence' }
  ],
  education: {
    institution: 'Adamas University',
    degree: 'Bachelor of Technology (B.Tech)',
    specialization: 'Computer Science & Engineering (AI & ML)',
    timeline: '2024 – 2028 (Currently in 2nd Year)',
    focusAreas: [
      'Data Structures & Algorithms (DSA)',
      'Object-Oriented Programming (Java / C++)',
      'Database Management Systems (DBMS & SQL)',
      'Machine Learning & Artificial Intelligence',
      'Full-Stack Web Development (React & Node.js)'
    ]
  }
};
