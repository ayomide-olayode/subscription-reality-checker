# Subscription Reality Checker

**Subscription Reality Checker** is a focused SaaS application that helps users make rational decisions about recurring subscriptions by comparing cost, usage, and perceived value in one clear system.

Built and designed end-to-end by **OLAYODE AYOMIDE OLUWAFERANMI**.

---

## 🚩 The Problem

Most people subscribe to tools, streaming platforms, storage services, and software products without actively evaluating their real value.

Common issues:

- Subscriptions renew automatically.
- Users forget what they’re paying for.
- Cost per use is rarely calculated.
- Decisions are emotional rather than data-driven.

Over time, small monthly fees compound into significant yearly expenses.

There is no simple way to answer:

- *Am I actually using this?*
- *Is it worth what I’m paying?*
- *Should I downgrade, pause, or cancel?*

---

## ✅ The Solution

Subscription Reality Checker provides a structured system to evaluate subscriptions using:

- Monthly cost
- Billing cycle awareness
- Usage tracking
- Value ratings
- Cost-per-use calculation
- Renewal visibility
- A decision scoring model (Good / Watch / Cut)

It transforms subscription management from guesswork into measurable clarity.

---

## 🚀 Core Features

### 1. Authentication & Route Protection

- Email + password authentication (Supabase)
- Secure session handling
- Protected application routes
- Middleware-based route guards
- Redirect logic with `next` parameter support
- Logout functionality

---

### 2. Subscription Management (Full CRUD)

Users can:

- Create subscriptions
- Edit subscription details
- Set billing cycle (monthly/yearly)
- Define renewal dates
- Update status (active, paused, cancelled)
- View detailed subscription breakdown

Each subscription includes:

- Name
- Category
- Amount (NGN)
- Billing cycle
- Renewal date
- Status
- Notes

---

### 3. Check-In System

Users log periodic check-ins per subscription:

- Used? (Yes/No)
- Value rating (1–5)
- Optional note
- Timestamped entry

Users can:

- Add check-ins
- View recent check-ins
- Delete check-ins

This system introduces reflection and measurable value assessment.

---

### 4. Dashboard Intelligence (Last 30 Days Analysis)

The dashboard dynamically calculates:

- Estimated monthly spend
- Estimated yearly spend
- Active subscription count
- Upcoming renewals (next 14 days)
- Top leaks (high cost + low usage/value)
- Good picks (high usage + high value)
- Spend distribution by category

---

## 📊 Scoring Model

Each subscription receives a classification:

- **Good** — consistent use + strong value
- **Watch** — moderate use or unclear value
- **Cut** — low usage + low rating or poor cost efficiency

Scoring factors:

- Average value rating
- Usage frequency
- Monthly equivalent cost
- Cost per use
- Check-in recency

This ensures decisions are backed by real interaction data.

---

## 🔔 Renewal Awareness

Subscriptions renewing within the next 14 days are highlighted to prevent surprise charges and encourage proactive decisions.

---

## 🎨 UI & Design System

- Themed design tokens
- Reusable UI components
- Scroll-contained cards
- Responsive layout
- Sidebar navigation
- Auth layout separation
- Minimal, structured visual hierarchy

---

## 🏗 Technical Architecture

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Custom UI component system

### Backend
- Supabase
  - Authentication
  - PostgreSQL database
  - Row-level security

### Server Logic
- Server Actions
- Revalidation
- Dynamic rendering
- Middleware-based route protection

### Deployment
- Vercel
- Environment variable configuration
- Production Supabase setup

---

## 📂 Folder Structure Overview
.
├── app/
│ ├── (auth)/
│ │ ├── login/
│ │ │ └── page.tsx
│ │ └── signup/
│ │ └── page.tsx
│ │
│ ├── (app)/
│ │ ├── dashboard/
│ │ │ └── page.tsx
│ │ ├── subscriptions/
│ │ │ ├── page.tsx
│ │ │ ├── new/
│ │ │ │ └── page.tsx
│ │ │ ├── [id]/
│ │ │ │ ├── page.tsx
│ │ │ │ ├── edit/
│ │ │ │ │ └── page.tsx
│ │ │ │ └── checkins/
│ │ │ │ └── delete-actions.ts
│ │
│ ├── layout.tsx
│ └── page.tsx
│
├── components/
│ ├── layout/
│ │ ├── AuthShell.tsx
│ │ ├── Sidebar.tsx
│ │ ├── Topbar.tsx
│ │ └── LogoutButton.tsx
│ │
│ └── ui/
│ ├── alert/
│ ├── badge/
│ ├── button/
│ ├── card/
│ ├── input/
│ ├── select/
│ ├── textarea/
│ └── scroll-card/
│
├── lib/
│ ├── auth/
│ │ └── client.ts
│ │
│ ├── db/
│ │ ├── subscriptions.ts
│ │ ├── checkins.ts
│ │ └── checkins-dashboard.ts
│ │
│ ├── supabase/
│ │ ├── browser.ts
│ │ └── server.ts
│ │
│ └── cn.ts
│
├── middleware.ts
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md

Separation of concerns:

- UI components isolated
- Database logic abstracted
- Authentication encapsulated
- Pages remain focused and clean

---

## 📦 Version

**v1.0.0 — Initial Production Release**

Includes:

- Authentication flow
- Subscription CRUD
- Check-in CRUD
- Dashboard scoring engine
- Renewal tracking
- Responsive layout
- Production deployment

---

## 👤 Built By

**OLAYODE AYOMIDE OLUWAFERANMI**

Frontend Developer  
Technical Founder  

Designed and implemented as a production-ready SaaS MVP demonstrating:

- Product thinking
- Clean architecture
- Full-stack integration
- Real-world problem solving

---

## 🔮 Future Improvements

- Edit check-ins
- Advanced scoring refinement
- Visual analytics (charts)
- Seed demo data
- Multi-currency support
- Renewal reminders
- Exportable reports
