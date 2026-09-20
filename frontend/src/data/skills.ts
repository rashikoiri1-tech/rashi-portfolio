export type SkillLevel = 'Building With' | 'Practicing' | 'Learning';

export interface SkillItem {
  name: string;
  level: SkillLevel;
  description: string;
}

export interface SkillGroup {
  category: string;
  iconName: string;
  description: string;
  skills: SkillItem[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Programming Languages',
    iconName: 'Code2',
    description: 'Core languages used for problem solving, algorithmic challenges, and application logic.',
    skills: [
      { name: 'C', level: 'Practicing', description: 'Procedural programming, pointers, and memory layout.' },
      { name: 'C++', level: 'Practicing', description: 'Object-oriented programming, STL containers, and DSA.' },
      { name: 'Java', level: 'Practicing', description: 'Robust OOP design, classes, collections, and backend logic.' },
      { name: 'Python', level: 'Building With', description: 'Data structures, scripting, automation, and AI/ML algorithms.' }
    ]
  },
  {
    category: 'Frontend Development',
    iconName: 'Layout',
    description: 'Crafting responsive, dynamic, and accessible user interfaces.',
    skills: [
      { name: 'HTML5', level: 'Building With', description: 'Semantic structure, accessibility, and modern web standards.' },
      { name: 'CSS3 / Tailwind', level: 'Building With', description: 'Responsive layouts, modern flexbox/grid, and animations.' },
      { name: 'JavaScript (ES6+)', level: 'Building With', description: 'DOM manipulation, asynchronous fetch, and event loops.' },
      { name: 'React', level: 'Building With', description: 'Component-driven architecture, custom hooks, and state management.' },
      { name: 'TypeScript', level: 'Practicing', description: 'Static typing, interface contracts, and safer refactoring.' }
    ]
  },
  {
    category: 'Backend & APIs',
    iconName: 'Server',
    description: 'Constructing performant web servers and secure REST endpoints.',
    skills: [
      { name: 'Node.js', level: 'Building With', description: 'Server-side runtime, NPM ecosystem, and event-driven I/O.' },
      { name: 'Express.js', level: 'Building With', description: 'Routing, middleware pipelines, error handling, and controllers.' },
      { name: 'REST APIs', level: 'Building With', description: 'CRUD endpoints, HTTP status standards, and JSON payloads.' }
    ]
  },
  {
    category: 'Database & SQL',
    iconName: 'Database',
    description: 'Relational data modeling, query optimization, and persistence.',
    skills: [
      { name: 'MySQL', level: 'Building With', description: 'Relational schema design, foreign keys, and indexes.' },
      { name: 'SQL', level: 'Building With', description: 'Parameterized queries, JOIN operations, and transactions.' },
      { name: 'MySQL Workbench', level: 'Building With', description: 'Visual database design, forward engineering, and management.' }
    ]
  },
  {
    category: 'AI & Machine Learning',
    iconName: 'Brain',
    description: 'Academic specialization coursework and machine learning modeling.',
    skills: [
      { name: 'Python for AI/ML', level: 'Building With', description: 'NumPy arrays, Pandas DataFrames, and numerical computation.' },
      { name: 'Machine Learning', level: 'Practicing', description: 'Supervised regression, classification, and model evaluation.' },
      { name: 'Data Analysis', level: 'Practicing', description: 'Exploratory data analysis, cleaning, and feature inspection.' },
      { name: 'AI Concepts', level: 'Learning', description: 'Neural networks, search heuristics, and intelligent agents.' }
    ]
  },
  {
    category: 'Developer Tools',
    iconName: 'Terminal',
    description: 'Daily workflow tooling, version control, and API testing.',
    skills: [
      { name: 'Git', level: 'Building With', description: 'Version control, branch workflows, and commit history.' },
      { name: 'GitHub', level: 'Building With', description: 'Remote collaboration, repositories, and open code sharing.' },
      { name: 'VS Code', level: 'Building With', description: 'Primary editor with modern extensions and debugging tools.' },
      { name: 'Postman', level: 'Building With', description: 'REST API testing, payload verification, and mock requests.' }
    ]
  },
  {
    category: 'CS Fundamentals',
    iconName: 'Cpu',
    description: 'Academic foundations essential for long-term engineering depth.',
    skills: [
      { name: 'Data Structures & Algorithms', level: 'Practicing', description: 'Arrays, linked lists, trees, graphs, sorting, and search.' },
      { name: 'DBMS', level: 'Building With', description: 'Relational model, ACID properties, and normalization.' },
      { name: 'Object-Oriented Programming', level: 'Building With', description: 'Encapsulation, inheritance, polymorphism, abstraction.' },
      { name: 'Operating Systems', level: 'Learning', description: 'Process scheduling, threads, memory hierarchy, and concurrency.' },
      { name: 'Computer Networks', level: 'Learning', description: 'OSI/TCP-IP models, sockets, DNS, and HTTP/HTTPS protocols.' }
    ]
  }
];
