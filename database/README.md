# MySQL Database Setup Guide — `rashi_portfolio`

This directory contains the database schema and seed data for **Rashi Koiri's Portfolio**.

---

## 1. Prerequisites

- **MySQL Community Server** (version 8.0 or newer)
- **MySQL Workbench** or MySQL CLI
- Valid database user credentials (default: `root`)

---

## 2. Option A: Setup via MySQL Workbench (Recommended)

1. Open **MySQL Workbench** and connect to your local MySQL instance (e.g., `localhost:3306`).
2. Go to **File > Open SQL Script...** (or press `Ctrl + Shift + O`).
3. Select `schema.sql` located in this directory (`database/schema.sql`).
4. Click the lightning bolt icon ⚡ (**Execute**) to create the `rashi_portfolio` database and its tables (`contacts`, `projects`, `analytics`).
5. Next, open `seed.sql` (`database/seed.sql`) in a new SQL tab.
6. Click the lightning bolt icon ⚡ (**Execute**) to insert the starter projects and analytics data.
7. Verify the tables in the left sidebar **Schemas** panel under `rashi_portfolio > Tables`.

---

## 3. Option B: Setup via MySQL Command Line

Open Command Prompt or PowerShell and execute:

```powershell
# 1. Log in to MySQL and run schema
mysql -u root -p < database/schema.sql

# 2. Run seed data
mysql -u root -p < database/seed.sql
```

Enter your MySQL root password when prompted.

---

## 4. Backend Configuration

After creating the database, copy `backend/.env.example` to `backend/.env` and verify your MySQL credentials:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# MySQL Connection Settings
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=rashi_portfolio
DB_PORT=3306
```

> [!NOTE]
> **Graceful Fallback**: If you do not configure MySQL immediately, the backend will still run smoothly in local fallback mode, recording messages into `backend/submissions.json` and serving bundled project data so you can test the application instantly.
