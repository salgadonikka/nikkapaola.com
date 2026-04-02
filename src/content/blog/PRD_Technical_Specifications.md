---
title: "Tamelo Documentation"
description: "Product Requirements & Technical Specifications Document"
pubDate: "April 2, 2026"
draft: true
---

# The Procrastinator's List

## Product Requirements Document (PRD) & Technical Specifications

### Version 1.0 | April 2026

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Target Audience](#2-target-audience)
3. [Core Features](#3-core-features)
4. [Information Architecture](#4-information-architecture)
5. [Functional Requirements](#5-functional-requirements)
6. [Technical Architecture](#6-technical-architecture)
7. [Database Schema](#7-database-schema)
8. [API & Data Layer](#8-api--data-layer)
9. [Authentication & Security](#9-authentication--security)
10. [UI/UX Design System](#10-uiux-design-system)
11. [Responsive Behavior](#11-responsive-behavior)
12. [Non-Functional Requirements](#12-non-functional-requirements)
13. [Future Roadmap](#13-future-roadmap)
14. [Recommended Documentation](#14-recommended-documentation)

---

## 1. Product Overview

### 1.1 Product Name

**The Procrastinator's List**

### 1.2 Tagline

_Low pressure. Real progress._

### 1.3 Vision

A weekly task planner designed for people who struggle with rigid to-do apps. Instead of deadlines and guilt, it uses gentle day markers to track intentions and celebrate small wins.

### 1.4 Problem Statement

Traditional productivity apps impose strict deadlines, priorities, and accountability—creating anxiety for procrastinators. Users need a tool that:

- Reduces the psychological barrier to planning
- Allows flexible, low-commitment scheduling
- Visualizes progress without judgment
- Supports iterative planning across weeks

### 1.5 Value Proposition

- **No hard deadlines** — mark intentions, not obligations
- **Visual week view** — see your week at a glance with color-coded status circles
- **Project organization** — group tasks without rigid hierarchy
- **Kanban project view** — visualize task flow per project
- **Responsive design** — works on desktop, tablet, and mobile

---

## 2. Target Audience

| Persona                   | Description                                                                 |
| ------------------------- | --------------------------------------------------------------------------- |
| **The Gentle Planner**    | Wants structure without pressure; prefers visual cues over text-heavy lists |
| **The Freelancer**        | Juggles multiple projects; needs project-based task grouping                |
| **The Student**           | Manages coursework across weeks; benefits from flexible scheduling          |
| **The ADHD Professional** | Needs low-friction task capture and non-judgmental progress tracking        |

---

## 3. Core Features

### 3.1 Weekly Task Grid

- **Week view** with day columns (Sun–Sat on desktop)
- **Navigable** — previous/next week with arrow buttons and swipe gestures (mobile)
- **Day markers** — clickable circles that cycle through states: Empty → Planned → Started → Completed
- **Responsive day count**: Desktop (7 days), Tablet (5 days), Mobile (3 days)

### 3.2 Task Management

- Create tasks with title, optional project assignment, and optional description
- Edit task title, description, and project inline
- Delete and archive tasks
- Drag-and-drop reordering within and across project groups
- Sort tasks by assigned date (persisted to database)

### 3.3 Task Detail Panel

- Editable title, project selector (with color indicators), and description
- **Notes system** — add, edit, and delete multiple notes per task
- **History timeline** — chronological view (newest first) combining:
  - Day marker state changes (with colored status dots)
  - User-added notes (with timestamps)
- Archive and delete actions

### 3.4 Project Management

- Create projects with auto-assigned colors
- Edit project description
- Delete projects (orphans tasks to "No Project")
- Filter task view by project
- **Project sidebar** — full and mini/collapsed modes
  - Full: project list with task counts, add/delete/open actions
  - Mini: color icon buttons with tooltips, expandable

### 3.5 Project Kanban Board (Project View Page)

- Accessible via /project/:projectId
- Four columns: **To Be Planned** → **Planned** → **Ongoing** → **Completed**
- Tasks categorized automatically based on marker states
- Drag-and-drop between columns with smart behavior:
  - Moving to "Planned" requires a date (triggers date picker)
  - Moving to "Ongoing" auto-sets latest marker to "started"
  - Moving to "Completed" auto-sets latest marker to "completed"
  - Moving to "To Be Planned" removes non-completed markers
- Inline date editing on task cards via calendar popover
- Sorted newest to oldest within each column

### 3.6 Completed Task Visibility

- **This Week** (default): Shows tasks with no dates, current week markers, and current week completions. Hides past-week-only completions.
- **Hide All**: Hides all tasks with any completed markers
- **Show All**: Shows everything including past completions

### 3.7 Settings

- **Theme**: Light / Dark / Adaptive (system)
- **Auto-archive**: Configurable inactivity period (7/14/30/60/90 days or never). Default: 30 days.

### 3.8 Help

- **How to use the planner** — accordion-based FAQ sections
- **Tutorial mode** — placeholder for future interactive walkthrough
- **Report issues** — form with title and description (client-side toast feedback)
- **About** — app description and version

### 3.9 Authentication

- Email/password signup and login
- Google OAuth sign-in
- Protected routes requiring authentication
- User profile with display name, avatar URL, and email

---

## 4. Information Architecture

```
/                        → Main task grid (Protected)
/login                   → Login page
/signup                  → Signup page
/project/:projectId      → Project Kanban board (Protected)
/settings                → User settings (Protected)
/help                    → Help & documentation (Protected)
/*                       → 404 Not Found
```

### Layout Structure

```
┌─────────────────────────────────────────────────┐
│ AppHeader (logo, mobile projects btn, UserMenu) │
├──────────────────────┬──────────────────────────┤
│                      │ Right Panel:             │
│ TaskList             │  - TaskDetail (selected) │
│  - WeekHeader        │  - ProjectPanel (none)   │
│  - TaskInput         │  - MiniProjectPanel      │
│  - TaskRow groups    │                          │
│                      │                          │
├──────────────────────┴──────────────────────────┤
│ Mobile Overlays (Projects, Task Details)        │
└─────────────────────────────────────────────────┘
```

---

## 5. Functional Requirements

### 5.1 Task CRUD

| Action | Behavior                                                              |
| ------ | --------------------------------------------------------------------- |
| Create | Title required; optional project + description; persisted to Supabase |
| Read   | Fetched on login with associated day_markers; grouped by project      |
| Update | Title, description, project, sort_order, archived status              |
| Delete | Cascade deletes associated day_markers and task_notes                 |

### 5.2 Day Marker State Machine

| Context                    | Cycle                                            |
| -------------------------- | ------------------------------------------------ |
| Future week                | Empty → Planned → (remove)                       |
| Current week, today/future | Empty → Planned → Started → Completed → (remove) |
| Current week, past day     | Empty/Planned → Started → Completed → (remove)   |
| Past week                  | No changes allowed                               |

### 5.3 Drag-and-Drop Reordering

- Uses @dnd-kit/core and @dnd-kit/sortable
- Reorder within same project group
- Move task to different project group
- Persists sort_order to database
- Optimistic UI updates

### 5.4 Sorting

- Manual "Sort by date" button
- Sorts within each project group by earliest marker in the current week
- Tasks with dates sorted first (earliest to latest)
- Tasks without dates follow, sorted by sortOrder then createdAt
- Persists new sortOrder values to database

### 5.5 Auto-Archive

- Configurable per user (stored in profiles.auto_archive_days)
- Tasks with no activity within the configured period are auto-archived

---

## 6. Technical Architecture

### 6.1 Technology Stack

| Layer                | Technology                                    |
| -------------------- | --------------------------------------------- |
| **Framework**        | React 18 with TypeScript 5                    |
| **Build Tool**       | Vite 5                                        |
| **Styling**          | Tailwind CSS v3 + tailwindcss-animate         |
| **UI Components**    | shadcn/ui (Radix UI primitives)               |
| **State Management** | React hooks (useState, useCallback, useMemo)  |
| **Data Fetching**    | @tanstack/react-query + Supabase JS client    |
| **Routing**          | react-router-dom v6                           |
| **Backend**          | Lovable Cloud (Supabase)                      |
| **Authentication**   | Supabase Auth (email/password + Google OAuth) |
| **Database**         | PostgreSQL (via Supabase)                     |
| **Drag & Drop**      | @dnd-kit/core + @dnd-kit/sortable             |
| **Date Handling**    | date-fns                                      |
| **Theming**          | next-themes                                   |
| **Notifications**    | sonner + radix toast                          |

### 6.2 Project Structure

```
src/
├── App.tsx                    # Root with providers and routing
├── main.tsx                   # Entry point
├── index.css                  # Design tokens and global styles
├── types/
│   └── task.ts                # Core type definitions
├── hooks/
│   ├── useAuth.tsx            # Auth context and provider
│   ├── useTaskStore.ts        # Central task/project state manager
│   ├── useTaskNotes.ts        # Task notes CRUD hook
│   ├── useDeviceType.ts       # Responsive breakpoint detection
│   ├── useVisibleDays.ts      # Day count calculations
│   └── use-mobile.tsx         # Mobile detection
├── components/
│   ├── AppHeader.tsx           # Top navigation bar
│   ├── TaskList.tsx            # Main task grid with groups
│   ├── TaskRow.tsx             # Individual task row
│   ├── TaskCircle.tsx          # Day marker circle component
│   ├── TaskDetail.tsx          # Task detail/edit panel
│   ├── TaskInput.tsx           # New task input row
│   ├── WeekHeader.tsx          # Week navigation and day labels
│   ├── ProjectPanel.tsx        # Full project sidebar
│   ├── MiniProjectPanel.tsx    # Collapsed project sidebar
│   ├── MobileOverlay.tsx       # Mobile slide-up panels
│   ├── KanbanBoard.tsx         # Project Kanban board
│   ├── KanbanColumn.tsx        # Single Kanban column
│   ├── KanbanCard.tsx          # Kanban task card
│   ├── NewTaskDialog.tsx       # Full task creation dialog
│   ├── NavLink.tsx             # Navigation link component
│   ├── UserMenu.tsx            # User dropdown menu
│   ├── ProtectedRoute.tsx      # Auth guard wrapper
│   └── ui/                     # shadcn/ui component library
├── pages/
│   ├── Index.tsx               # Main dashboard
│   ├── ProjectView.tsx         # Project Kanban page
│   ├── Settings.tsx            # User settings
│   ├── Help.tsx                # Help & documentation
│   ├── Login.tsx               # Login page
│   ├── Signup.tsx              # Registration page
│   └── NotFound.tsx            # 404 page
├── integrations/
│   └── supabase/
│       ├── client.ts           # Auto-generated Supabase client
│       └── types.ts            # Auto-generated database types
└── lib/
    └── utils.ts                # Utility functions (cn)
```

### 6.3 Key Hooks

| Hook            | Responsibility                                                                            |
| --------------- | ----------------------------------------------------------------------------------------- |
| `useTaskStore`  | Central state: tasks, projects, week navigation, filtering, sorting, CRUD, marker cycling |
| `useAuth`       | Authentication context: user, session, profile, sign-up/in/out, profile updates           |
| `useTaskNotes`  | Task notes CRUD with optimistic local state                                               |
| `useDeviceType` | Responsive breakpoint detection (mobile/tablet/desktop)                                   |

---

## 7. Database Schema

### 7.1 Entity Relationship

```
auth.users (managed by Supabase)
    │
    ├── profiles (1:1)
    │     user_id → auth.users.id
    │
    ├── projects (1:N)
    │     user_id → auth.users.id
    │     │
    │     └── tasks (N:1)
    │           project_id → projects.id
    │
    └── tasks (1:N)
          user_id → auth.users.id
          │
          ├── day_markers (1:N)
          │     task_id → tasks.id
          │
          └── task_notes (1:N)
                task_id → tasks.id
```

### 7.2 Table Definitions

#### profiles

| Column            | Type        | Nullable | Default           |
| ----------------- | ----------- | -------- | ----------------- |
| id                | uuid        | No       | gen_random_uuid() |
| user_id           | uuid        | No       | —                 |
| email             | text        | Yes      | —                 |
| display_name      | text        | Yes      | —                 |
| avatar_url        | text        | Yes      | —                 |
| auto_archive_days | integer     | No       | 30                |
| created_at        | timestamptz | No       | now()             |
| updated_at        | timestamptz | No       | now()             |

#### projects

| Column     | Type        | Nullable | Default           |
| ---------- | ----------- | -------- | ----------------- |
| id         | uuid        | No       | gen_random_uuid() |
| user_id    | uuid        | No       | —                 |
| name       | text        | No       | —                 |
| color      | text        | Yes      | '#6366f1'         |
| notes      | text        | Yes      | —                 |
| created_at | timestamptz | No       | now()             |
| updated_at | timestamptz | No       | now()             |

#### tasks

| Column     | Type        | Nullable | Default           |
| ---------- | ----------- | -------- | ----------------- |
| id         | uuid        | No       | gen_random_uuid() |
| user_id    | uuid        | No       | —                 |
| title      | text        | No       | —                 |
| notes      | text        | Yes      | —                 |
| project_id | uuid        | Yes      | —                 |
| sort_order | integer     | No       | 0                 |
| archived   | boolean     | No       | false             |
| created_at | timestamptz | No       | now()             |
| updated_at | timestamptz | No       | now()             |

#### day_markers

| Column     | Type        | Nullable | Default           |
| ---------- | ----------- | -------- | ----------------- |
| id         | uuid        | No       | gen_random_uuid() |
| task_id    | uuid        | No       | —                 |
| date       | date        | No       | —                 |
| state      | text        | No       | 'empty'           |
| created_at | timestamptz | No       | now()             |

#### task_notes

| Column     | Type        | Nullable | Default           |
| ---------- | ----------- | -------- | ----------------- |
| id         | uuid        | No       | gen_random_uuid() |
| task_id    | uuid        | No       | —                 |
| content    | text        | No       | —                 |
| created_at | timestamptz | No       | now()             |
| updated_at | timestamptz | No       | now()             |

---

## 8. API & Data Layer

### 8.1 Data Access Pattern

- All data access via Supabase JS client (`@supabase/supabase-js`)
- Direct table queries (no Edge Functions for CRUD)
- Optimistic UI updates with local state management
- No server-side rendering; fully client-side SPA

### 8.2 Query Patterns

| Operation         | Method                                                        |
| ----------------- | ------------------------------------------------------------- |
| Fetch tasks       | `supabase.from('tasks').select('*').order('created_at')`      |
| Fetch markers     | `supabase.from('day_markers').select('*').in('task_id', ids)` |
| Upsert marker     | Insert or update based on existence check                     |
| Batch sort update | Individual `update` calls per task (sort_order)               |

---

## 9. Authentication & Security

### 9.1 Auth Flow

- Email/password registration with email verification
- Email/password login
- Google OAuth sign-in
- Session persistence via localStorage
- Auto token refresh

### 9.2 Row-Level Security (RLS)

All tables have RLS enabled. Users can only access their own data:

- **tasks, projects, day_markers**: Policies on `public` role checking `auth.uid() = user_id` (or via task ownership for markers/notes)
- **profiles**: SELECT/INSERT/UPDATE for own profile; no DELETE
- **task_notes**: Authenticated role; ownership verified via task join

### 9.3 Profile Auto-Creation

A database trigger automatically creates a profile row when a new user signs up, populating it with auth metadata.

---

## 10. UI/UX Design System

### 10.1 Design Tokens (CSS Variables)

All colors use HSL values defined in `index.css` and mapped in `tailwind.config.ts`:

- Semantic tokens: `--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`
- Circle states: `--circle-empty`, `--circle-planned`, `--circle-started`, `--circle-completed`
- Dark mode: Full dark theme via `.dark` class with `next-themes`

### 10.2 Typography

- Display font: Crimson Pro (serif)
- Body font: Inter (sans-serif)

### 10.3 Component Library

- Built on shadcn/ui (Radix UI primitives)
- Consistent use of `Card`, `Select`, `Dialog`, `Tooltip`, `Accordion`, etc.
- Custom components for domain-specific UI (TaskCircle, TaskRow, KanbanCard)

---

## 11. Responsive Behavior

### 11.1 Breakpoints

| Device  | Width      | Day Columns      | Nav Step | Sidebar          |
| ------- | ---------- | ---------------- | -------- | ---------------- |
| Mobile  | < 768px    | 3 days           | 3        | Overlay          |
| Tablet  | 768–1023px | 5 days           | 5        | Mini (collapsed) |
| Desktop | ≥ 1024px   | 7 days (Sun–Sat) | 7        | Full             |

### 11.2 Layout Adaptations

- **Mobile**: Compact spacing, smaller fonts, overlay panels for projects and task details, swipe navigation
- **Tablet**: Mini project sidebar by default (expandable), medium spacing
- **Desktop**: Full project sidebar, side-by-side task list and detail panel

### 11.3 Overflow Management

- Task titles and notes: text truncation with ellipsis
- Project names in tree view: single-line with ellipsis overflow
- Fixed column widths prevent content from shifting day marker positions

---

## 12. Non-Functional Requirements

### 12.1 Performance

- Client-side rendering with lazy data loading
- Optimistic UI updates for responsive feel
- `refetchOnWindowFocus: false` to prevent unnecessary re-fetches
- Query retry limit: 1

### 12.2 Accessibility

- ARIA labels on interactive elements
- Keyboard navigation support (Enter to submit, tab order)
- Semantic HTML structure
- Color contrast compliance in both themes

### 12.3 Browser Support

- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- Touch support for mobile devices

---

## 13. Future Roadmap

| Priority | Feature                 | Description                                                   |
| -------- | ----------------------- | ------------------------------------------------------------- |
| High     | Tutorial Mode           | Interactive walkthrough with step highlights and tooltips     |
| High     | Auto-Archive Automation | Backend function to auto-archive tasks based on user settings |
| Medium   | Recurring Tasks         | Tasks that repeat on configurable schedules                   |
| Medium   | Task Labels/Tags        | Additional categorization beyond projects                     |
| Medium   | Subtasks                | Hierarchical task breakdown                                   |
| Medium   | Real-time Sync          | Supabase Realtime for multi-device sync                       |
| Low      | Collaborative Projects  | Share projects with other users                               |
| Low      | Calendar Integration    | Sync with Google Calendar / Outlook                           |
| Low      | Export/Import           | CSV/JSON task data export                                     |
| Low      | Notifications           | Browser/email reminders for planned tasks                     |
| Low      | Analytics Dashboard     | Weekly/monthly productivity insights                          |

---

## 14. Recommended Documentation

Based on this project's scope and stage, the following additional documents are recommended:

### Essential Documents

1. **User Guide / Help Documentation** — Expand the in-app Help page into a comprehensive user guide with screenshots and workflows
2. **API Documentation** — Document all Supabase table schemas, RLS policies, and query patterns for developer onboarding
3. **Deployment & Operations Guide** — Document the Lovable Cloud deployment process, environment variables, and monitoring

### Development Documents

4. **Component Library / Storybook** — Catalog of all UI components with usage examples and prop documentation
5. **Testing Strategy Document** — Define unit, integration, and E2E testing approach (currently minimal test coverage)
6. **Database Migration Log** — Track all schema changes with context and rollback procedures

### Product Documents

7. **User Research Summary** — Document target user interviews, pain points, and feature validation
8. **Analytics & Metrics Plan** — Define KPIs (DAU, task completion rate, retention) and tracking implementation
9. **Accessibility Audit Report** — WCAG 2.1 AA compliance assessment and remediation plan
10. **Privacy Policy & Terms of Service** — Required for production launch with user data

### Architecture Documents

11. **Architecture Decision Records (ADRs)** — Document key technical decisions (e.g., why Supabase, why @dnd-kit, state management approach)
12. **Security Model Document** — Detailed RLS policies, auth flow, data encryption, and threat model
13. **Performance Budget** — Target load times, bundle size limits, and lighthouse scores

---

_Document generated on April 2, 2026_
_The Procrastinator's List — Low pressure. Real progress._
