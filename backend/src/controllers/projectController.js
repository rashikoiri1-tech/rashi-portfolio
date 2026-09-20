/**
 * Projects Controller
 * Retrieves project records from MySQL database with bundled fallback.
 */
const db = require('../config/database');

const BUNDLED_PROJECTS = [
  {
    id: 1,
    slug: 'hrms-fullstack',
    title: 'Human Resource Management System',
    category: 'Full-Stack',
    description: 'Comprehensive HRMS built with React, Node.js, Express, and MySQL. Features employee record tracking, role-based admin controls, CRUD data operations, attendance management, and secure RESTful endpoints.',
    technologies: 'React, Node.js, Express.js, MySQL, REST API, Tailwind CSS',
    github_url: 'https://github.com/rashikoiri1-tech/rashi-portfolio.git',
    live_url: '#projects',
    image_url: '/images/projects/hrms.svg',
    featured: 1,
    status: 'Active Development'
  },
  {
    id: 2,
    slug: 'college-event-management',
    title: 'Smart College Event Management System',
    category: 'Full-Stack',
    description: 'Event coordination platform for university faculties and students. Includes student registration, automated enrollment tracking, category-wise event scheduling, admin CRUD dashboard, and participant analytics.',
    technologies: 'React, TypeScript, Express.js, MySQL, Tailwind CSS',
    github_url: 'https://github.com/rashikoiri1-tech/rashi-portfolio.git',
    live_url: '#projects',
    image_url: '/images/projects/college-event.svg',
    featured: 1,
    status: 'Built & Functional'
  },
  {
    id: 3,
    slug: 'ai-placement-platform',
    title: 'AI-Based Placement Preparation Platform',
    category: 'AI / ML',
    description: 'Intelligent interview readiness platform tailored for Computer Science students. Designed for subject-wise question practice, AI-assisted mock interviews, answer clarity evaluation, and personalized preparation tracking.',
    technologies: 'Python, React, Node.js, Express, Machine Learning, MySQL',
    github_url: 'https://github.com/rashikoiri1-tech/rashi-portfolio.git',
    live_url: '#projects',
    image_url: '/images/projects/placement-prep.svg',
    featured: 1,
    status: 'Prototype / Concept'
  },
  {
    id: 4,
    slug: 'food-rescue-platform',
    title: 'Food Rescue & Redistribution Platform',
    category: 'Problem Solving',
    description: 'A social impact platform connecting commercial kitchens, college cafeterias, and events with excess food directly to verified NGOs, orphanages, and community shelters to reduce food waste.',
    technologies: 'React, Node.js, Express.js, MySQL, Geolocation APIs',
    github_url: 'https://github.com/rashikoiri1-tech/rashi-portfolio.git',
    live_url: '#projects',
    image_url: '/images/projects/food-rescue.svg',
    featured: 0,
    status: 'Project Concept'
  },
  {
    id: 5,
    slug: 'aiml-research-lab',
    title: 'AI / ML Modeling & Algorithm Lab',
    category: 'AI / ML',
    description: 'Applied machine learning experiments exploring supervised classification, regression models, neural network foundations, and exploratory data analysis on academic datasets at Adamas University.',
    technologies: 'Python, Scikit-Learn, Pandas, NumPy, Jupyter, Matplotlib',
    github_url: 'https://github.com/rashikoiri1-tech/rashi-portfolio.git',
    live_url: '#projects',
    image_url: '/images/projects/aiml-showcase.svg',
    featured: 0,
    status: 'Ongoing Research'
  }
];

async function getAllProjects(req, res, next) {
  try {
    try {
      const rows = await db.query('SELECT * FROM projects ORDER BY display_order ASC, id ASC');
      if (rows && rows.length > 0) {
        return res.json({
          success: true,
          source: 'MySQL',
          count: rows.length,
          data: rows
        });
      }
    } catch (dbErr) {
      // Fall through to bundled
    }

    return res.json({
      success: true,
      source: 'Bundled Dataset',
      count: BUNDLED_PROJECTS.length,
      data: BUNDLED_PROJECTS
    });
  } catch (err) {
    next(err);
  }
}

async function getProjectById(req, res, next) {
  try {
    const { id } = req.params;

    try {
      const rows = await db.query('SELECT * FROM projects WHERE id = ? OR slug = ? LIMIT 1', [id, id]);
      if (rows && rows.length > 0) {
        return res.json({
          success: true,
          source: 'MySQL',
          data: rows[0]
        });
      }
    } catch (dbErr) {
      // Fall through to bundled
    }

    const matched = BUNDLED_PROJECTS.find(p => p.id === parseInt(id, 10) || p.slug === id);
    if (!matched) {
      return res.status(404).json({
        success: false,
        error: 'PROJECT_NOT_FOUND',
        message: `No project found matching identifier "${id}".`
      });
    }

    return res.json({
      success: true,
      source: 'Bundled Dataset',
      data: matched
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllProjects,
  getProjectById,
  BUNDLED_PROJECTS
};
