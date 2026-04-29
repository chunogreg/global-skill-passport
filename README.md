# 🌏 Global Skill Passport

A full-stack SaaS application that helps international students find the best universities based on budget, degree, and key admission factors.

---

## 🚀 Live Demo

https://global-skill-passport.vercel.app/

---

## 🎯 Problem

Choosing the right university abroad is difficult due to:

- scattered information across multiple websites
- inconsistent data formats
- lack of filtering by real constrains (budget, IELTS, scholarships)

---

## 💡 Solution

Global Skill Passport provides:

- a unified dataset of universities
- smart filtering based on user preferences
- a ranking system to recommend best-fit schools

---

## ✨ Features

### 🔍 Saerch & Filtering

- Filter by country, degree, discipline
- Budget-based filtering
- Clean UI for quick exploration

---

### ⭐ Smart Ranking System

- Calculates a **Best Match score**
- Highlights the most suitable university
- Provides explanation for recommendations

---

### 🛡️ Admin Dashboard

- Protected admin route
- Role-Based Access Control (RBAC)
- Add a new university records directly

---

### 🧠 Data Design

- Structured database for:
  - universities
  - cost
  - IELTS / TOEFL
  - scholarships
  - application links

  ***

### 🌐 Real Data Handling

- Manual dataset curation (30+ real records)
- USD normalization for fair comparison
- Source links for transparency

---

## 🧱 Teck Stack

### Frontend

- Next.js (App Router)
- React
- Tailwind CSS

### Backend

- Supabase (PostgreSQL + Auth)
- Rest API routes (Next.js)

### Security

- Row Level Security (RLS)
- Role-Based Access Control (RBAC)

---

## 🔐 Authentication & Authorization

- Supabase Auth handles signup/login
- Profiles table stores user roles
- Admin access restricted to authorized users

---

## 📊 Database Structure (Simplified)

### universities

- name
- country
- degree
- tuition (USD)
- ielts_min
- scholarship_amount
- application_link

### profiles

- id (linked to auth.users)
- email
- role (admin/user)

---

## ⚙️ Key Technical Highlights

- Dynamic query building for filtering
- Ranking algorithm for best match
- Secure API routes with validation
- Clean separation of frontend and backend logic
- Environment-based configuration

---

## 📈 Future Improvements

- Save favorite universities
- Personalized recommendations
- Premium features (Advanced filters, rankings)
- Automated data ingestion from APIs

## 🧪 Local Setup

```bash
git clone https://github.com/chunogreg/global-skill-passport.git
cd global-skill-passport
npm install
npm run dev
```

## 🔑 Environmental Variables

create `.env.local`:

```
NEXT_pUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

## 🧠 What I Learned

- How to design a flexible database that can handle inconsistent real-world data
- Implementing authentication & RBAC using Supabase
- Handling incomplete and messy datasets from different sources
- Balancing product features with simplicity for an MVP

## 📬 Contact

Feel free to connect or reach out:

- LinkedIn: https://www.linkedin.com/in/gregory-chuno
- Email: chunogreg@gmail.com
