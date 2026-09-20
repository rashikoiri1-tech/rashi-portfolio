export interface AchievementCategory {
  id: string;
  name: string;
  iconName: string;
  description: string;
  items: {
    title: string;
    date: string;
    organization: string;
    description: string;
    badge: string;
  }[];
}

export const ACHIEVEMENT_CATEGORIES: AchievementCategory[] = [
  {
    id: 'academic',
    name: 'Academic Excellence',
    iconName: 'GraduationCap',
    description: 'Academic milestones and coursework progress in B.Tech CSE (AI/ML) at Adamas University.',
    items: [
      {
        title: 'Adamas University B.Tech CSE — AI/ML Cohort',
        date: '2024 – Present',
        organization: 'School of Engineering and Technology, Adamas University',
        description: 'Successfully progressing through core Computer Science curriculum with high engagement in Data Structures, Database Systems, and Artificial Intelligence.',
        badge: 'Enrolled'
      }
    ]
  },
  {
    id: 'hackathons',
    name: 'Hackathons',
    iconName: 'Trophy',
    description: 'Competitive coding events and technical hackathons solving real-world challenges.',
    items: [] // Empty state placeholder
  },
  {
    id: 'coding',
    name: 'Coding & DSA',
    iconName: 'Code2',
    description: 'Algorithmic problem solving across data structures and algorithms.',
    items: [
      {
        title: 'Consistent Problem Solving Practice',
        date: '2025 – Present',
        organization: 'GeeksforGeeks & LeetCode',
        description: 'Actively solving daily challenges focusing on arrays, strings, binary search, and linked lists in C++ and Java.',
        badge: 'Ongoing'
      }
    ]
  },
  {
    id: 'projects',
    name: 'Project Milestones',
    iconName: 'Layers',
    description: 'Technical project deliveries and architecture completions.',
    items: [
      {
        title: 'Full-Stack HRMS Architecture Prototype',
        date: '2025',
        organization: 'Independent Project',
        description: 'Engineered complete CRUD operations and relational database schema connecting React with Node.js and MySQL.',
        badge: 'Completed'
      }
    ]
  },
  {
    id: 'competitions',
    name: 'Competitions',
    iconName: 'Award',
    description: 'Inter-college technical showcases, project exhibitions, and quizzes.',
    items: [] // Empty state placeholder
  }
];
