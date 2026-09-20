-- =============================================================================
-- Rashi Koiri Portfolio Seed Data
-- Database Name: rashi_portfolio
-- =============================================================================

USE `rashi_portfolio`;

-- -----------------------------------------------------------------------------
-- Seed: projects
-- Rashi Koiri's Real Academic & Software Engineering Projects
-- -----------------------------------------------------------------------------
TRUNCATE TABLE `projects`;

INSERT INTO `projects` 
  (`slug`, `title`, `category`, `description`, `technologies`, `github_url`, `live_url`, `image_url`, `featured`, `status`, `display_order`)
VALUES
  (
    'hrms-fullstack',
    'Human Resource Management System',
    'Full-Stack',
    'Comprehensive HRMS built with React, Node.js, Express, and MySQL. Features employee record tracking, role-based admin controls, CRUD data operations, attendance management, and secure RESTful endpoints.',
    'React, Node.js, Express.js, MySQL, REST API, Tailwind CSS',
    'https://github.com/rashikoiri1-tech/rashi-portfolio.git',
    '#projects',
    '/images/projects/hrms.svg',
    1,
    'Active Development',
    1
  ),
  (
    'college-event-management',
    'Smart College Event Management System',
    'Full-Stack',
    'Event coordination platform for university faculties and students. Includes student registration, automated enrollment tracking, category-wise event scheduling, admin CRUD dashboard, and participant analytics.',
    'React, TypeScript, Express.js, MySQL, Tailwind CSS',
    'https://github.com/rashikoiri1-tech/rashi-portfolio.git',
    '#projects',
    '/images/projects/college-event.svg',
    1,
    'Built & Functional',
    2
  ),
  (
    'ai-placement-platform',
    'AI-Based Placement Preparation Platform',
    'AI / ML',
    'Intelligent interview readiness platform tailored for Computer Science students. Designed for subject-wise question practice, AI-assisted mock interviews, answer clarity evaluation, and personalized preparation tracking.',
    'Python, React, Node.js, Express, Machine Learning, MySQL',
    'https://github.com/rashikoiri1-tech/rashi-portfolio.git',
    '#projects',
    '/images/projects/placement-prep.svg',
    1,
    'Prototype / Concept',
    3
  ),
  (
    'food-rescue-platform',
    'Food Rescue & Redistribution Platform',
    'Problem Solving',
    'A social impact platform connecting commercial kitchens, college cafeterias, and events with excess food directly to verified NGOs, orphanages, and community shelters to reduce food waste.',
    'React, Node.js, Express.js, MySQL, Geolocation APIs',
    'https://github.com/rashikoiri1-tech/rashi-portfolio.git',
    '#projects',
    '/images/projects/food-rescue.svg',
    0,
    'Project Concept',
    4
  ),
  (
    'aiml-research-lab',
    'AI / ML Modeling & Algorithm Lab',
    'AI / ML',
    'Applied machine learning experiments exploring supervised classification, regression models, neural network foundations, and exploratory data analysis on academic datasets at Adamas University.',
    'Python, Scikit-Learn, Pandas, NumPy, Jupyter, Matplotlib',
    'https://github.com/rashikoiri1-tech/rashi-portfolio.git',
    '#projects',
    '/images/projects/aiml-showcase.svg',
    0,
    'Ongoing Research',
    5
  );

-- -----------------------------------------------------------------------------
-- Seed: analytics (Sample baseline page impression records)
-- -----------------------------------------------------------------------------
TRUNCATE TABLE `analytics`;

INSERT INTO `analytics` (`page`, `user_agent`, `ip_hash`)
VALUES 
  ('/', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0', 'sha256_init_visit_01'),
  ('/projects', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0', 'sha256_init_visit_02'),
  ('/contact', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Firefox/122.0', 'sha256_init_visit_03');
