# CarSaga — Complete Project Info & Implementation Plan

> **Visual-first AI-powered Car Verification SaaS**
> Built with: Vite · React 19 · TypeScript · Tailwind CSS 4 · Redux Toolkit

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack & Dependencies](#2-tech-stack--dependencies)
3. [Folder Structure](#3-folder-structure)
4. [Design System (Glassmorphic Theme)](#4-design-system-glassmorphic-theme)
5. [Routing Map](#5-routing-map)
6. [Page-by-Page Implementation Details](#6-page-by-page-implementation-details)
7. [Components Library](#7-components-library)
8. [State Management (Redux)](#8-state-management-redux)
9. [All Mock / Simulated Data Used](#9-all-mock--simulated-data-used)
10. [External Assets & URLs](#10-external-assets--urls)
11. [Implementation Phases & Checklist](#11-implementation-phases--checklist)
12. [Git Commit History Protocol](#12-git-commit-history-protocol)
13. [Future Roadmap](#13-future-roadmap)

---

## 1. Project Overview

**CarSaga** is a visual-first car verification SaaS designed for **used car buyers**, **mechanics**, and **dealers**. Users upload car photos and enter a VIN to receive an AI-powered verification report that includes:

- **Visual damage detection** via photo analysis
- **VIN history lookup** (accident, ownership, odometer records)
- **Predictive maintenance cost** projections
- **3D interactive car model** with damage hotspots (Spline)
- **AI chat expert** for negotiation tips and mechanical advice
- **Nearby mechanic discovery** via interactive maps
- **Side-by-side vehicle comparison analytics**

### Target Audience

| Role     | Use Case                                      |
| -------- | --------------------------------------------- |
| Buyer    | Verify a car before purchasing                |
| Mechanic | Generate inspection reports for clients       |
| Dealer   | Provide transparency and build buyer trust    |

---

## 2. Tech Stack & Dependencies

### Core

| Package                     | Version   | Purpose                                 |
| --------------------------- | --------- | --------------------------------------- |
| `react`                     | `^19.2.5` | UI library                              |
| `react-dom`                 | `^19.2.5` | DOM rendering                           |
| `vite`                      | `^8.0.9`  | Dev server & bundler                    |
| `typescript`                | `~6.0.2`  | Static type checking                    |
| `tailwindcss`               | `^4.2.4`  | Utility-first CSS framework             |

### Routing & State

| Package                     | Version    | Purpose                                |
| --------------------------- | ---------- | -------------------------------------- |
| `react-router-dom`          | `^7.14.2`  | Client-side routing                    |
| `@reduxjs/toolkit`          | `^2.11.2`  | Redux state management                 |
| `react-redux`               | `^9.2.0`   | React bindings for Redux               |

### UI Libraries

| Package                     | Version    | Purpose                                |
| --------------------------- | ---------- | -------------------------------------- |
| `motion` (Framer Motion)    | `^12.38.0` | Animations & page transitions          |
| `lucide-react`              | `^1.8.0`   | Icon library                           |
| `sonner`                    | `^2.0.7`   | Toast notifications (dark theme)       |
| `class-variance-authority`  | `^0.7.1`   | Component variant styling              |
| `clsx`                      | `^2.1.1`   | Conditional classnames                 |
| `tailwind-merge`            | `^3.5.0`   | Merge Tailwind classes                 |

### Feature-Specific

| Package                            | Version    | Purpose                              |
| ---------------------------------- | ---------- | ------------------------------------ |
| `@splinetool/react-spline`         | `^4.1.0`   | 3D car model viewer                  |
| `@splinetool/runtime`              | `^1.12.87` | Spline runtime engine                |
| `@xyflow/react`                    | `^12.10.2` | React Flow — workflow node diagrams  |
| `recharts`                         | `^3.8.1`   | Charts (Area, Bar, Line, Radar)      |
| `@dnd-kit/core`                    | `^6.3.1`   | Drag and drop framework              |
| `@dnd-kit/sortable`                | `^10.0.0`  | Sortable drag-and-drop               |
| `@dnd-kit/utilities`               | `^3.2.2`   | DnD CSS utilities                    |
| `react-dropzone`                   | `^15.0.0`  | File drag-and-drop upload zone       |
| `@vis.gl/react-google-maps`        | `^1.8.3`   | Google Maps (requires API key)       |
| `lottie-react`                     | `^2.4.1`   | Lottie animation player              |
| `@studio-freight/lenis`            | `^1.0.42`  | Smooth scrolling library             |
| `formik`                           | `^2.4.9`   | Form state management                |
| `yup`                              | `^1.7.1`   | Schema validation                    |
| `axios`                            | `^1.15.2`  | HTTP client                          |

---

## 3. Folder Structure

```
carSaga/
├── README.md
├── client/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── src/
│       ├── main.tsx                              # React DOM entry point
│       ├── App.tsx                               # Root: Redux Provider + Router + Toaster
│       ├── App.css                               # Minimal app-level CSS
│       ├── index.css                             # Global design system (Tailwind theme, glassmorphism)
│       │
│       ├── router/
│       │   └── index.tsx                         # All route definitions (createBrowserRouter)
│       │
│       ├── store/
│       │   ├── index.ts                          # Redux store configuration
│       │   └── uiSlice.ts                        # UI state (theme toggle, sidebar)
│       │
│       ├── lib/
│       │   └── utils.ts                          # cn() — clsx + tailwind-merge utility
│       │
│       ├── pages/
│       │   ├── LandingPage.tsx                   # Marketing hero + Spline + Feature grid
│       │   ├── AuthPage.tsx                      # Login/Signup with role selector
│       │   ├── DashboardPage.tsx                 # Sidebar + KPI cards + chart + table
│       │   ├── VerificationPage.tsx              # 4-stage wizard (Photos → VIN → AI → Flow)
│       │   ├── ReportPage.tsx                    # 3D model + maintenance chart + map + specs
│       │   ├── ChatPage.tsx                      # AI chat dock with suggestions
│       │   └── AnalyticsPage.tsx                 # Head-to-head comparison + charts
│       │
│       ├── components/
│       │   ├── blocks/
│       │   │   ├── animated-video-on-scroll.tsx  # Scroll-driven hero animation primitives
│       │   │   └── animated-video-on-scroll-demo.tsx  # HeroVideoDemo composition
│       │   └── landing/
│       │       ├── FeatureGrid.tsx               # 4-feature card grid with stagger animation
│       │       └── SplineShowcase.tsx            # 3D car showcase section
│       │
│       ├── hooks/                                # (Empty — reserved for custom hooks)
│       ├── styles/                               # (Empty — reserved for additional stylesheets)
│       └── assets/                               # (Reserved for static assets)
```

---

## 4. Design System (Glassmorphic Theme)

### Color Palette

| Token                | Value                         | Usage                      |
| -------------------- | ----------------------------- | -------------------------- |
| `--color-primary`    | `#84cc16` (lime-500)          | CTAs, accents, highlights  |
| `--color-surface`    | `rgba(255,255,255,0.05)`      | Card backgrounds           |
| `--color-glass`      | `rgba(255,255,255,0.1)`       | Glass borders, overlays    |
| `--color-glass-border` | `rgba(255,255,255,0.15)`    | Glass border color         |
| `--color-dark-bg`    | `#030526`                     | Hero radial gradient end   |
| Body Background      | `#1c1917` (stone-900)         | Default page background    |
| Body Gradient        | `radial-gradient(circle at 50% 0%, #080f67 0%, #030526 80%)` | Background gradient |

### Typography

| Font Variable      | Value                           | Usage         |
| ------------------ | ------------------------------- | ------------- |
| `--font-sans`      | `'Inter', system-ui, sans-serif` | Body text     |
| `--font-heading`   | `'Space Grotesk', system-ui, sans-serif` | Headings |

### Custom Utility Classes

```css
.glass-card {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1);
}

.glass-sidebar {
  background-color: rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(24px);
  height: 100%;
}

.hide-scrollbar { /* Hides scrollbar across browsers */ }
```

### Custom Animations

| Animation Name  | Duration  | Description                            |
| --------------- | --------- | -------------------------------------- |
| `pulse-glow`    | 2s loop   | Lime glow pulse on lime-accented elements |
| `fade-up`       | 0.5s once | Fade in + translate up entrance        |
| `scale-in`      | 0.3s once | Fade in + scale up entrance            |

### Primary CTA Glow

```css
box-shadow: 0 0 15px rgba(132, 204, 22, 0.4); /* Applied on all primary buttons */
```

---

## 5. Routing Map

| Path            | Page Component       | Description                        |
| --------------- | -------------------- | ---------------------------------- |
| `/`             | `LandingPage`        | Marketing landing page             |
| `/auth`         | `AuthPage`           | Login / Sign up                    |
| `/dashboard`    | `DashboardPage`      | User garage & KPI overview         |
| `/verify`       | `VerificationPage`   | 4-stage verification wizard        |
| `/report/:id`   | `ReportPage`         | 3D report for a specific car       |
| `/chat`         | `ChatPage`           | AI expert chat interface           |
| `/analytics`    | `AnalyticsPage`      | Side-by-side car comparison        |

---

## 6. Page-by-Page Implementation Details

---

### 6.1 Landing Page (`/`)

**File:** `src/pages/LandingPage.tsx`

**Sections (in order):**
1. **HeroVideoDemo** — Scroll-driven animated video with headline, sub-copy, and CTA
2. **SplineShowcase** — 3D interactive car model showcase
3. **FeatureGrid** — 4 feature cards with stagger animation

**Hero Content:**
- Headline: `"Don't Buy Blind."`
- Subtext: `"Upload car photos, enter your VIN and get a full AI-powered verification report — in seconds. Know the car before you own it."`
- CTA: `"Verify a Car — It's Free"`

**Hero Video Source:**
```
https://videos.pexels.com/video-files/8566672/8566672-uhd_2560_1440_30fps.mp4
```

**Hero Radial Gradient:**
```css
radial-gradient(40% 40% at 50% 20%, #0e19ae 0%, #0b1387 22.92%, #080f67 42.71%, #030526 88.54%)
```

**Feature Grid Data:**

| Icon          | Title              | Description                                                                 |
| ------------- | ------------------ | --------------------------------------------------------------------------- |
| `Smartphone`  | Visual Uploads     | Simply drag and drop photos. Our AI analyzes condition based on visuals.    |
| `Shield`      | Verified History   | Enter a VIN to pull trusted past ownership and accident records.            |
| `Zap`         | Predictive Costs   | See simulated future maintenance costs based on the car's make and mileage. |
| `Wrench`      | Trusted Mechanics  | Book on-site inspections through our interactive maps with trusted partners. |

---

### 6.2 Auth Page (`/auth`)

**File:** `src/pages/AuthPage.tsx`

**Features:**
- Role selector tabs: **Buyer** (default active), **Mechanic**, **Dealer**
- Email + Password form inputs (icons: `Mail`, `Lock`)
- Submit navigates to `/dashboard`
- Google OAuth button (SVG logo, navigates to `/dashboard` on click)
- Background pattern: `https://www.transparenttextures.com/patterns/cubes.png`
- Framer Motion entry animation: `opacity: 0 → 1`, `scale: 0.95 → 1`

**Active Role Styling:**
```css
bg-[#84cc16]/20 text-[#84cc16] shadow-sm  /* Active tab */
text-slate-300 hover:text-white            /* Inactive tab */
```

---

### 6.3 Dashboard Page (`/dashboard`)

**File:** `src/pages/DashboardPage.tsx`

**Layout:** Sidebar (sticky, 264px) + Main Content

**Sidebar Navigation Items:**
| Icon            | Label      | Active State          |
| --------------- | ---------- | --------------------- |
| `Activity`      | Dashboard  | ✅ Active (bg-white/10)|
| `Car`           | My Cars    | Inactive              |
| `Settings`      | Settings   | Inactive              |
| `HelpCircle`    | Support    | Inactive              |

**Sidebar Footer:** User avatar + role ("Buyer") + Sign Out button (navigates to `/`)

**KPI Cards (3 columns):**

| Title              | Value | Icon             | Accent Color    | Subtitle               |
| ------------------ | ----- | ---------------- | --------------- | ----------------------- |
| Total Cars Checked | 28    | `Car`            | `#84cc16`       | +12% from last month    |
| Safe to Buy        | 19    | `CheckCircle2`   | `emerald-400`   | Highly recommended      |
| High Risk Flagged  | 4     | `AlertTriangle`  | `red-500`       | Avoided bad purchases   |

**Area Chart — "Verification Activity":**
- Library: Recharts `AreaChart`
- Gradient fill: `#84cc16` (30% → 0% opacity)

**Recent Reports Table:**

| Vehicle         | Year | Status   | Risk   | Date        |
| --------------- | ---- | -------- | ------ | ----------- |
| Toyota Camry    | 2021 | Verified | Low    | 2026-04-20  |
| Honda Civic     | 2019 | Flagged  | High   | 2026-04-18  |
| Ford Mustang    | 2022 | Verified | Medium | 2026-04-10  |

Table rows navigate to `/report/{id}` on click.

---

### 6.4 Verification Page (`/verify`)

**File:** `src/pages/VerificationPage.tsx`

**4-Stage Wizard with progress bar:**

| Stage | Title                   | Description                                             |
| ----- | ----------------------- | ------------------------------------------------------- |
| 1     | Upload Car Photos       | Dropzone + DnD sortable photo grid                      |
| 2     | Vehicle ID Number       | 17-char VIN input (mono, uppercase, lime color)         |
| 3     | AI Analysis (Loader)    | Spinning loader + pulse text "Running AI Visual Scan…"  |
| 4     | Verification Workflow   | React Flow node diagram → navigates to `/report/123`    |

**Progress Bar:** Animated lime fill based on current stage (0–100%)

**Stage 1 — Photo Upload:**
- `react-dropzone` for file input (accepts `image/*`)
- `@dnd-kit/sortable` with `rectSortingStrategy` for reordering
- Each photo: aspect-video, rounded-xl, glass-card border
- "Continue to VIN" button (disabled if no photos)

**Stage 2 — VIN Entry:**
- Max length: 17 chars, auto-uppercase
- Placeholder: `JTDBTB.....................`
- Styled: `text-2xl font-mono tracking-widest text-[#84cc16]`
- "Analyze Vehicle" button triggers Stage 3 (disabled if VIN < 5 chars)

**Stage 3 — AI Analysis Simulation:**
- Spinner: `border-4 border-white/10 border-t-[#84cc16] rounded-full animate-spin`
- Inner icon: `Loader2 animate-pulse`
- Auto-advances to Stage 4 after 3 seconds (`setTimeout`)

**Stage 4 — React Flow Workflow:**

| Node ID | Label                  | Position       |
| ------- | ---------------------- | -------------- |
| `1`     | Photos Uploaded        | (50, 50)       |
| `2`     | VIN Extracted          | (50, 150)      |
| `3`     | AI Analyzed Condition  | (50, 250)      |

All nodes: `bg: #1e293b`, `color: white`, `border: 1px solid #84cc16`
Edges: animated, `stroke: #84cc16`

---

### 6.5 Report Page (`/report/:id`)

**File:** `src/pages/ReportPage.tsx`

**Layout:** 3-column grid (2 cols left, 1 col right) on `lg+`

**Sticky Navbar:** CarSaga logo + "Report #{id}" + "Ask Expert" (outline) + "Share Report" (solid)

**Left Column:**
1. **3D Car Model** — Spline interactive viewer
   - Scene URL: `https://prod.spline.design/iW9V4hEOMHtz-h8L/scene.splinecode`
   - Risk badge: `"Medium Risk"` (amber-500)
   - Red pulsing hotspot overlay (right fender area)
   - Hotspot tooltip: `"Scratch detected on right fender. Estimated repair: $150."`
   - Footer: `"Drag to rotate. Scroll to zoom."` + `"1 Issue Found"`

2. **Maintenance Cost Bar Chart** — Recharts `BarChart`

**Right Column:**
1. **Vehicle Specs** — Definition list

   | Field              | Value              |
   | ------------------ | ------------------ |
   | VIN                | JTDKNAM32X012****  |
   | Make / Model       | Toyota Prius       |
   | Year               | 2019               |
   | Odometer Estimate  | ~45,210 mi         |
   | Previous Owners    | 2                  |

2. **Nearby Mechanics** — Mock map image + mechanic cards

   | Name              | Distance   | Rating |
   | ----------------- | ---------- | ------ |
   | Joe's Auto Repair | 2.1 miles  | 4.8★   |
   | Elite Diagnostics | 3.5 miles  | 4.9★   |

   Map Image: `https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop`

---

### 6.6 Chat Page (`/chat`)

**File:** `src/pages/ChatPage.tsx`

**Design:** 21st.dev-style floating dock chat interface

**Initial Bot Message:**
```
"Hi! I am your AI Car Expert. I have reviewed your report for the Toyota Prius. How can I help you today?"
```

**Mock AI Response (to any user message):**
```
"Based on the report, the asking price is $1,200 below market average due to the scratched fender. Yes, you have room to negotiate."
```

Response delay: 1500ms with typing indicator (3 bouncing dots)

**Quick Suggestion Chips:**
1. `"Should I negotiate this price?"`
2. `"What should I inspect during test drive?"`
3. `"Is the 2019 model reliable?"`

**UI Elements:**
- Abstract background blurs: lime top-left, blue bottom-right
- Badge: `"AI Expert"` with sparkle icon
- Heading: `"Ask about your vehicle"`
- Subtext: `"Get negotiation tips, mechanical advice, and market insights."`
- Floating input dock: `glass-card p-2 rounded-full`

---

### 6.7 Analytics Page (`/analytics`)

**File:** `src/pages/AnalyticsPage.tsx`

**Header:** Back button (→ `/dashboard`) + `"Comparison Analytics"` title

**Head-to-Head Comparison Table:**

| Feature           | 🚗 Toyota Prius (2019) | 🚙 Honda Civic (2020) |
| ----------------- | ----------------------- | ---------------------- |
| Asking Price      | $15,500                 | $16,200                |
| Mileage           | 45,210 mi               | 38,100 mi              |
| Issues Found      | 1 (Cosmetic) — amber    | 0 — emerald            |
| 5-Year Maint. Cost| $5,200                  | $3,750                 |

**Line Chart — "Cumulative Maintenance Track":**
- Prius line: `#84cc16` (lime)
- Civic line: `#3b82f6` (blue)

**Radar Chart — "Score Radar":**

| Category      | Prius (A) | Civic (B) |
| ------------- | --------- | --------- |
| Reliability   | 80        | 90        |
| Safety        | 95        | 85        |
| Cost to Own   | 70        | 88        |
| Features      | 90        | 75        |
| Appreciation  | 60        | 65        |

---

## 7. Components Library

### `animated-video-on-scroll.tsx`
Scroll-driven animation primitives built with Framer Motion:

| Export              | Type      | Description                                    |
| ------------------- | --------- | ---------------------------------------------- |
| `ContainerScroll`   | Component | Scroll tracking wrapper (useScroll)            |
| `ContainerSticky`   | Component | Sticky positioning container                   |
| `ContainerAnimated` | Component | Scroll-driven Y-axis animation + blur reveal   |
| `ContainerInset`    | Component | Scroll-driven clip-path inset animation        |
| `HeroVideo`         | Component | Auto-playing video with scroll-driven scale     |
| `HeroButton`        | Component | Animated CTA button with hover/tap feedback    |

**Spring Config:** `stiffness: 100, damping: 16, mass: 0.75`

### `FeatureGrid.tsx`
- 4-column responsive grid (1 → 2 → 4 cols)
- Stagger animation: 0.2s delay between children
- Each card: `glass-card` + hover → `bg-white/10`
- Icons wrapped in lime glow ring: `ring-1 ring-[#84cc16]/30 shadow-[0px_0px_15px_rgba(132,204,22,0.2)]`

### `SplineShowcase.tsx`
- Full-width 80vh section with lime blur backdrop
- Split layout: text (1/3) + 3D model (2/3)
- Headline: `"Interact with your future ride."`
- Subtext: `"Drag to rotate. Discover hotspots. Identify potential risks before making an offer."`

---

## 8. State Management (Redux)

### Store Configuration (`store/index.ts`)
```ts
configureStore({ reducer: { ui: uiReducer } })
```

### UI Slice (`store/uiSlice.ts`)

| State Key       | Type                 | Default | Description         |
| --------------- | -------------------- | ------- | ------------------- |
| `theme`         | `'light' \| 'dark'`  | `'dark'`| Theme mode          |
| `sidebarOpen`   | `boolean`            | `true`  | Sidebar visibility  |

**Actions:**
- `toggleTheme()` — switches between light/dark
- `toggleSidebar()` — toggles sidebar open/closed

### App Root (`App.tsx`)
```tsx
<Provider store={store}>
  <RouterProvider router={router} />
  <Toaster theme="dark" position="bottom-right" />
</Provider>
```

---

## 9. All Mock / Simulated Data Used

### Dashboard — Monthly Checks Chart

```json
[
  { "name": "Jan", "checks": 4, "cost": 400 },
  { "name": "Feb", "checks": 3, "cost": 300 },
  { "name": "Mar", "checks": 2, "cost": 200 },
  { "name": "Apr", "checks": 6, "cost": 600 },
  { "name": "May", "checks": 8, "cost": 800 },
  { "name": "Jun", "checks": 5, "cost": 500 }
]
```

### Dashboard — Recent Cars Table

```json
[
  { "id": "1", "make": "Toyota", "model": "Camry", "year": 2021, "status": "Verified", "risk": "Low", "date": "2026-04-20" },
  { "id": "2", "make": "Honda", "model": "Civic", "year": 2019, "status": "Flagged", "risk": "High", "date": "2026-04-18" },
  { "id": "3", "make": "Ford", "model": "Mustang", "year": 2022, "status": "Verified", "risk": "Medium", "date": "2026-04-10" }
]
```

### Report — Maintenance Cost Projection

```json
[
  { "year": "2026", "cost": 450 },
  { "year": "2027", "cost": 600 },
  { "year": "2028", "cost": 1200 },
  { "year": "2029", "cost": 850 },
  { "year": "2030", "cost": 2100 }
]
```

### Report — Vehicle Specs

```json
{
  "VIN": "JTDKNAM32X012****",
  "Make/Model": "Toyota Prius",
  "Year": 2019,
  "Odometer": "~45,210 mi",
  "PreviousOwners": 2,
  "RiskLevel": "Medium",
  "Issues": [{ "location": "Right fender", "type": "Scratch", "repairCost": "$150" }]
}
```

### Report — Nearby Mechanics

```json
[
  { "name": "Joe's Auto Repair", "distance": "2.1 miles", "rating": "4.8★" },
  { "name": "Elite Diagnostics", "distance": "3.5 miles", "rating": "4.9★" }
]
```

### Analytics — Cost Over Time (Comparison)

```json
[
  { "year": "2026", "car1": 450, "car2": 300 },
  { "year": "2027", "car1": 600, "car2": 700 },
  { "year": "2028", "car1": 1200, "car2": 750 },
  { "year": "2029", "car1": 850, "car2": 900 },
  { "year": "2030", "car1": 2100, "car2": 1100 }
]
```

### Analytics — Category Radar Scores

```json
[
  { "subject": "Reliability", "A": 80, "B": 90 },
  { "subject": "Safety", "A": 95, "B": 85 },
  { "subject": "Cost to Own", "A": 70, "B": 88 },
  { "subject": "Features", "A": 90, "B": 75 },
  { "subject": "Appreciation", "A": 60, "B": 65 }
]
```

### Analytics — Comparison Table

```json
{
  "Car1": { "name": "Toyota Prius (2019)", "price": "$15,500", "mileage": "45,210 mi", "issues": "1 (Cosmetic)", "5yrCost": "$5,200" },
  "Car2": { "name": "Honda Civic (2020)", "price": "$16,200", "mileage": "38,100 mi", "issues": "0", "5yrCost": "$3,750" }
}
```

### Chat — Suggestions

```json
["Should I negotiate this price?", "What should I inspect during test drive?", "Is the 2019 model reliable?"]
```

### Chat — Initial Bot Message

```
"Hi! I am your AI Car Expert. I have reviewed your report for the Toyota Prius. How can I help you today?"
```

### Chat — Mock AI Response

```
"Based on the report, the asking price is $1,200 below market average due to the scratched fender. Yes, you have room to negotiate."
```

### Verification — React Flow Nodes

```json
[
  { "id": "1", "label": "Photos Uploaded", "position": [50, 50] },
  { "id": "2", "label": "VIN Extracted", "position": [50, 150] },
  { "id": "3", "label": "AI Analyzed Condition", "position": [50, 250] }
]
```

### Verification — React Flow Edges

```json
[
  { "id": "e1-2", "source": "1", "target": "2", "animated": true },
  { "id": "e2-3", "source": "2", "target": "3", "animated": true }
]
```

---

## 10. External Assets & URLs

| Asset                    | URL                                                                                     | Usage                    |
| ------------------------ | --------------------------------------------------------------------------------------- | ------------------------ |
| Hero Video               | `https://videos.pexels.com/video-files/8566672/8566672-uhd_2560_1440_30fps.mp4`         | Landing page hero        |
| 3D Car Model (Spline)    | `https://prod.spline.design/iW9V4hEOMHtz-h8L/scene.splinecode`                         | Spline Showcase + Report |
| Auth Background Texture  | `https://www.transparenttextures.com/patterns/cubes.png`                                | Auth page background     |
| Mock Map Image           | `https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format`      | Report page map section  |
| Google OAuth SVG         | Inline SVG (4 paths: blue, green, yellow, red)                                          | Auth page OAuth button   |

---

## 11. Implementation Phases & Checklist

### Phase 1: Foundation & Design System ✅
- [x] Initialize Vite + React + TypeScript project
- [x] Install all dependencies (24 packages)
- [x] Create folder structure (pages, store, hooks, lib, router, styles)
- [x] Set up global CSS: Tailwind theme tokens, glassmorphism utilities, animations

### Phase 2: Core Pages ✅
- [x] **Auth Page** — Login/Signup, Google OAuth button, role selector (Buyer/Mechanic/Dealer)
- [x] **Dashboard Page** — Glass sidebar, Recharts KPI cards, recent reports table
- [x] **Verification Page** — 4-stage wizard: Photo upload → VIN → AI Analysis → React Flow
- [x] **Report Page** — Spline 3D car model, maintenance bar chart, mechanic map, vehicle specs
- [x] **Chat Page** — 21st.dev style floating dock, AI mock responses, suggestion chips
- [x] **Analytics Page** — Head-to-head table, line chart, radar chart comparison
- [x] **Landing Page** — Scroll-driven hero video, Spline 3D showcase, feature grid

### Phase 3: State & Routing ✅
- [x] Redux Store & UI Slice (`theme`, `sidebarOpen`)
- [x] React Router configuration (7 routes with `createBrowserRouter`)

### Phase 4: Refinement ✅
- [x] Wire up simulated API calls (mock data, setTimeout delays)
- [x] QA & visual testing

---

## 12. Git Commit History Protocol

All changes followed a **3-commit-per-push** discipline:

**Branch:** `feature/carsaga-core`

| # | Commit Message                                          | Files                                  |
| - | ------------------------------------------------------- | -------------------------------------- |
| 1 | `feat: implement analytics page with data visualizations` | `AnalyticsPage.tsx`                   |
| 2 | `feat: add 21st.dev style chat dock interface`          | `ChatPage.tsx`                         |
| 3 | `feat: create verification and report pages for core flow` | `VerificationPage.tsx`, `ReportPage.tsx` |

**PR Title:** `feat: implement core feature pages (Analytics, Chat, Report, Verification)`

---

## 13. Future Roadmap

| Priority | Feature                                      | Details                                                  |
| -------- | -------------------------------------------- | -------------------------------------------------------- |
| P0       | Backend API (Node.js/Express)                | Auth, VIN lookup, report CRUD, mechanic search           |
| P0       | Real AI Integration                          | Replace mock chat with OpenAI/Gemini API                 |
| P1       | Google Maps API Key Integration              | Replace mock map with live `@vis.gl/react-google-maps`   |
| P1       | User Authentication (JWT + Google OAuth)     | Secure routes, session management                        |
| P1       | Database (MongoDB/PostgreSQL)                | Persist reports, user data, mechanic reviews             |
| P2       | Real VIN Decoder API                         | NHTSA or third-party VIN lookup                          |
| P2       | Photo Upload to Cloud Storage                | AWS S3 / Google Cloud Storage for user images            |
| P2       | PDF Report Export                            | Generate downloadable verification reports               |
| P3       | Mechanic Booking System                      | Appointment scheduling with nearby mechanics             |
| P3       | Payment Integration (Stripe)                | Premium report tiers                                     |
| P3       | Mobile Responsive Polish                     | Full mobile optimization pass                            |
| P3       | Dark/Light Theme Toggle                      | Wire up existing Redux `toggleTheme` action              |

---

*Generated: April 23, 2026 | CarSaga v0.0.0-alpha*
