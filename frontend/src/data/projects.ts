export interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'Full-Stack' | 'AI / ML' | 'Problem Solving';
  description: string;
  detailedDescription: string;
  image: string;
  tags: string[];
  features: string[];
  status: 'Active Development' | 'Built & Functional' | 'Prototype / Concept' | 'Project Concept' | 'Ongoing Research';
  githubUrl: string;
  demoUrl: string;
  featured: boolean;
  metrics: string;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 'proj-1',
    slug: 'hrms-fullstack',
    title: 'Human Resource Management System',
    category: 'Full-Stack',
    description: 'A full-stack Human Resource Management platform built with React, Node.js, Express, and MySQL for managing employee directories, administrative operations, and organizational tracking.',
    detailedDescription: 'Engineered as an end-to-end organizational system. Features role-based admin controls, employee directory CRUD operations, department assignments, attendance records, and secure parameter-driven REST APIs backed by a relational MySQL schema.',
    image: '/images/projects/hrms.svg',
    tags: ['React', 'Node.js', 'Express.js', 'MySQL', 'REST API', 'Tailwind CSS'],
    features: [
      'Centralized employee directory & profile records',
      'Role-based administrative dashboard with CRUD operations',
      'Department and designation management',
      'Attendance and leave status tracking',
      'Parameterized SQL queries and relational integrity'
    ],
    status: 'Active Development',
    githubUrl: 'https://github.com/rashikoiri1-tech/rashi-portfolio.git',
    demoUrl: '#projects',
    featured: true,
    metrics: 'Full CRUD + MySQL Schema Integration'
  },
  {
    id: 'proj-2',
    slug: 'college-event-management',
    title: 'Smart College Event Management System',
    category: 'Full-Stack',
    description: 'An interactive web portal simplifying campus event organization, participant registration, automated attendee counts, and administrative scheduling.',
    detailedDescription: 'Designed specifically for college university events, technical fests, and workshops. Enables students to browse upcoming seminars, register securely, and gives event coordinators real-time attendee statistics and roster exports.',
    image: '/images/projects/college-event.svg',
    tags: ['React', 'TypeScript', 'Node.js', 'Express.js', 'MySQL', 'Tailwind CSS'],
    features: [
      'Event discovery and category filtering (Tech, Cultural, Sports)',
      'Instant student registration and enrollment tracking',
      'Coordinator dashboard for creating and editing events',
      'Participant roster generation and capacity limits',
      'Real-time registration statistics'
    ],
    status: 'Built & Functional',
    githubUrl: 'https://github.com/rashikoiri1-tech/rashi-portfolio.git',
    demoUrl: '#projects',
    featured: true,
    metrics: 'Multi-category Student Registration'
  },
  {
    id: 'proj-3',
    slug: 'ai-placement-platform',
    title: 'AI-Based Placement Preparation Platform',
    category: 'AI / ML',
    description: 'An AI-assisted technical interview and campus placement readiness platform designed to evaluate subject-specific answers and give personalized feedback.',
    detailedDescription: 'Developed to empower CSE students preparing for tech interviews. Combines subject-wise technical question banks (DSA, DBMS, OOP) with intelligent answer evaluation algorithms to analyze clarity, technical depth, and communication tone.',
    image: '/images/projects/placement-prep.svg',
    tags: ['Python', 'React', 'Node.js', 'Machine Learning', 'MySQL', 'REST API'],
    features: [
      'Subject-wise technical question repositories (DSA, DBMS, OS)',
      'AI-assisted mock interview session simulations',
      'Keyword-density & conceptual answer evaluation',
      'Student performance tracking and improvement metrics',
      'Automated suggestions for weak technical areas'
    ],
    status: 'Prototype / Concept',
    githubUrl: 'https://github.com/rashikoiri1-tech/rashi-portfolio.git',
    demoUrl: '#projects',
    featured: true,
    metrics: 'AI Interview Evaluation Concept'
  },
  {
    id: 'proj-4',
    slug: 'food-rescue-platform',
    title: 'Food Rescue & Redistribution Platform',
    category: 'Problem Solving',
    description: 'A community-driven digital network routing surplus food from events, cafeterias, and restaurants directly to local NGOs, shelters, and orphanages.',
    detailedDescription: 'Conceived to combat urban food wastage. Connects verified food donors with nearby social organizations based on shelf-life constraints and urgency, featuring instant notification requests and pickup coordination.',
    image: '/images/projects/food-rescue.svg',
    tags: ['React', 'Node.js', 'Express.js', 'MySQL', 'Geolocation APIs', 'Social Impact'],
    features: [
      'Surplus food listing with quantity and expiration timestamps',
      'Direct notification to nearby registered NGOs and shelters',
      'Map-based pickup coordination and status tracker',
      'Impact analytics measuring meals rescued and waste averted',
      'Verified organization verification flow'
    ],
    status: 'Project Concept',
    githubUrl: 'https://github.com/rashikoiri1-tech/rashi-portfolio.git',
    demoUrl: '#projects',
    featured: false,
    metrics: 'Zero-Waste Social Impact Architecture'
  },
  {
    id: 'proj-5',
    slug: 'aiml-research-lab',
    title: 'AI / ML Modeling & Algorithm Lab',
    category: 'AI / ML',
    description: 'An extensible laboratory and repository of applied machine learning experiments, exploratory data analyses, and algorithmic model implementations.',
    detailedDescription: 'A workspace documenting hands-on exploration of machine learning fundamentals. Includes data preprocessing pipelines, exploratory visualizations, regression models, classification benchmarks, and foundational deep learning implementations.',
    image: '/images/projects/aiml-showcase.svg',
    tags: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Jupyter', 'Matplotlib'],
    features: [
      'Exploratory data analysis notebooks on standard datasets',
      'Supervised learning benchmarks (Classification & Regression)',
      'Feature engineering and data normalization pipelines',
      'Model evaluation matrices (Precision, Recall, ROC-AUC)',
      'Continuously updated with coursework and hackathon models'
    ],
    status: 'Ongoing Research',
    githubUrl: 'https://github.com/rashikoiri1-tech/rashi-portfolio.git',
    demoUrl: '#projects',
    featured: false,
    metrics: 'Hands-on Machine Learning Exploration'
  }
];
