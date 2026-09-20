-- =============================================================================
-- Rashi Koiri Portfolio Database Schema
-- Database Name: rashi_portfolio
-- Compatible with: MySQL 8.0+, MySQL Workbench, MariaDB 10.4+
-- =============================================================================

CREATE DATABASE IF NOT EXISTS `rashi_portfolio`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE `rashi_portfolio`;

-- -----------------------------------------------------------------------------
-- Table: contacts
-- Stores messages submitted through the portfolio contact form
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `contacts`;

CREATE TABLE `contacts` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `subject` VARCHAR(150) DEFAULT 'Portfolio Inquiry',
  `message` TEXT NOT NULL,
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_contacts_email` (`email`),
  INDEX `idx_contacts_created` (`created_at` DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Table: projects
-- Stores software, full-stack, and AI/ML projects displayed on the portfolio
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `projects`;

CREATE TABLE `projects` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `slug` VARCHAR(80) NOT NULL UNIQUE,
  `title` VARCHAR(150) NOT NULL,
  `category` VARCHAR(50) NOT NULL DEFAULT 'Full-Stack',
  `description` TEXT NOT NULL,
  `technologies` VARCHAR(255) NOT NULL,
  `github_url` VARCHAR(255) DEFAULT 'https://github.com/rashikoiri1-tech/rashi-portfolio.git',
  `live_url` VARCHAR(255) DEFAULT '#',
  `image_url` VARCHAR(255) NOT NULL,
  `featured` TINYINT(1) NOT NULL DEFAULT 0,
  `status` VARCHAR(50) NOT NULL DEFAULT 'Active Development',
  `display_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_projects_category` (`category`),
  INDEX `idx_projects_featured` (`featured`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Table: analytics
-- Stores page visits and route impressions for traffic telemetry
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `analytics`;

CREATE TABLE `analytics` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `page` VARCHAR(100) NOT NULL DEFAULT '/',
  `user_agent` VARCHAR(255) DEFAULT NULL,
  `ip_hash` VARCHAR(64) DEFAULT NULL,
  `visited_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_analytics_page` (`page`),
  INDEX `idx_analytics_visited` (`visited_at` DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
