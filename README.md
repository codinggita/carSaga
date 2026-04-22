<p align="center">
  <img src="https://img.shields.io/badge/CarSaga-AI%20Powered-blue?style=for-the-badge&logo=car&logoColor=white" alt="CarSaga Badge"/>
</p>

<h1 align="center">🚗 CarSaga</h1>

<p align="center">
  <strong>"Instant AI-Powered Used Car Verification — See the full story before you buy."</strong>
</p>

<p align="center">
  <a href="#-problem-statement"><img src="https://img.shields.io/badge/-Problem-red?style=flat-square" /></a>
  <a href="#-solution"><img src="https://img.shields.io/badge/-Solution-green?style=flat-square" /></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/-Tech%20Stack-blue?style=flat-square" /></a>
  <a href="#-key-screens"><img src="https://img.shields.io/badge/-Screens-purple?style=flat-square" /></a>
  <a href="#-figma-designs"><img src="https://img.shields.io/badge/-Figma-orange?style=flat-square" /></a>
</p>

---

## 📌 Problem Statement

> **"Why can't first-time used car buyers verify car histories, conditions, and future maintenance costs?"**

Buying a used car is one of the most stressful high-value purchases a first-time buyer can make. The process is riddled with trust deficits:

- **No easy way to verify accident history** — sellers hide past damages
- **Condition assessment is purely visual** — buyers lack mechanical expertise
- **Maintenance costs are unpredictable** — surprise expenses post-purchase
- **Service records are fragmented** — scattered across workshops with no single source of truth
- **Negotiation is intimidating** — buyers don't know the car's real worth
- **Finding trustworthy mechanics** — especially in unfamiliar cities

First-time buyers overwhelmingly end up overpaying for cars with hidden problems, leading to buyer's remorse with 60%+ reporting unexpected repair costs within the first 6 months.

> _Source: Razorpay Top 10 Automotive Problems — high-visibility, high-pain-point validated by real user data._

---

## 💡 Solution

**CarSaga** is a beautiful, **visual-first SaaS platform** that empowers first-time used car buyers with AI-driven verification, predictive analytics, and expert guidance — all in one place.

### Core Features

| Feature | Description |
|---|---|
| 📸 **AI Photo Analysis** | Upload car photos → AI detects dents, rust, paint issues, frame damage |
| 🔍 **VIN / Registration Lookup** | Enter VIN → Pulls verified history (accidents, service records, ownership chain) |
| 📊 **Predictive Maintenance Dashboard** | ML-powered cost projections for upcoming maintenance over 1–5 years |
| 🤖 **AI Car Expert Chat (Sage AI)** | Conversational AI for negotiation tips, red-flag detection, pricing insights |
| 🗺️ **Mechanic Finder** | Google Maps integration to discover nearby trusted mechanics & inspection centers |
| 📋 **Vehicle Integrity Report** | Comprehensive scored report — shareable via WhatsApp/email |
| 🚘 **Interactive 3D Car Model** | Spline-powered rotating model — click parts to highlight potential issues |
| 📅 **Book On-Site Inspection** | Schedule verified mechanics to inspect at seller's location |

### User Flow

```
Landing Page → Sign Up / Login → Upload Photos or Enter VIN
    → AI Analysis (Real-time animated pipeline)
        → Vehicle Integrity Report (Score + History + Maintenance Roadmap)
            → AI Expert Chat (Negotiation & Advice)
                → Book Inspection / Find Mechanic
                    → Save to My Cars / Share Report
```

---

## 🎨 Figma Designs

| Resource | Link |
|---|---|
| 🎨 **Figma Design (Dev Mode)** | [Open in Figma](https://www.figma.com/design/I4WSQhkRpO8OeMHZ74LbJA/Untitled?node-id=0-1&m=dev&t=twF7jXSbdBc32ii4-1) |
| ▶️ **Figma Prototype** | [View Prototype](https://www.figma.com/proto/I4WSQhkRpO8OeMHZ74LbJA/Untitled?node-id=0-1&t=twF7jXSbdBc32ii4-1) |

### Design System

| Token | Value |
|---|---|
| **Background** | Deep Navy `#0B0E14` |
| **Primary Accent** | Vibrant Blue `#4A90E2` |
| **Verified Badge** | Teal |
| **Flagged / Risk** | Red |
| **Processing** | Grey |
| **Typography** | Inter / SF Pro (Sans-Serif) |
| **Theme** | Dark Mode, Glassmorphic, 21st.dev Futuristic |
| **Corners** | Rounded (8–16px) |

---

## 🖥️ Key Screens

### 1. 🏠 Landing Page
- **Spline 3D** interactive car hero (rotate, zoom, click parts)
- Headline: _"Don't buy blind. Verify in seconds."_
- VIN input with instant verify CTA
- Animated feature grid with trust badges
- **Lenis** smooth scroll through sections
- Social proof + partner logos

### 2. 🔐 Auth (Login / Sign Up)
- Glassmorphic card design
- **Google OAuth** + Email/Password
- Role selection: `Buyer` | `Mechanic` | `Dealer`
- Animated transitions via **Framer Motion**

### 3. 📊 Main Dashboard
- Glass sidebar navigation
- Top AI search bar
- **KPI Cards** (Cars Checked, Avg. Savings, Risk Score) with micro-animations
- **Projected Maintenance** line chart (**Recharts / Nivo**)
- **Live Verification Feed** — recently scanned vehicles with status badges
- Quick actions: Verify New Car, View Reports

### 4. 🔬 Car Verification Flow ⭐ (The Star Screen)
- **Drag & Drop** photo upload zone (**dnd-kit**) — supports multiple images
- Real-time AI analysis animation (**Lottie** spinner → progress → results)
- **React Flow** visual pipeline builder:
  ```
  [Photo Scan] → [VIN Check] → [AI Report] → [Maintenance Plan]
  ```
- Tab interface: `Visual Scan` | `VIN Lookup`
- Analysis results with confidence scores

### 5. 📄 Vehicle Integrity Report
- **Overall Score**: 94/100 with circular progress
- **Condition Breakdown**: Engine, Transmission, Suspension, Electronics health bars
- **Maintenance Roadmap**: Timeline of upcoming services with cost estimates
- **Value Trajectory**: Resale value prediction chart
- **3D Model** with annotated issue points (**Spline**)
- **Google Maps** — nearest trusted mechanics
- **Share Report** via WhatsApp button

### 6. 🤖 AI Car Expert Chat (Sage AI)
- 21st.dev-style **floating message dock**
- Typewriter effect AI responses
- Suggestion chips: _"Should I negotiate?"_, _"Is this car worth it?"_
- Context-aware — references the current car's report
- Rich message formatting (charts, bullet points, links)

### 7. 📈 Analytics / My Cars
- Multi-car comparison dashboard
- Rich charts (**Nivo** / **Recharts**): cost trends, score comparisons
- Saved vehicles library
- Export reports as PDF

---

## 🛠️ Tech Stack

### Frontend (80–85% Focus)

| Category | Technologies |
|---|---|
| **Framework** | [Vite](https://vitejs.dev/) + [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + [MUI](https://mui.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| **State Management** | [Redux Toolkit](https://redux-toolkit.js.org/) |
| **Routing** | [React Router v6](https://reactrouter.com/) |
| **Forms & Validation** | [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup) |
| **3D Graphics** | [Spline](https://spline.design/) (`@splinetool/react-spline`) |
| **Flow Diagrams** | [React Flow](https://reactflow.dev/) |
| **Drag & Drop** | [dnd-kit](https://dndkit.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) + [Lottie React](https://lottiereact.com/) |
| **Smooth Scroll** | [Lenis](https://lenis.studiofreight.com/) |
| **Charts** | [Recharts](https://recharts.org/) + [Nivo](https://nivo.rocks/) |
| **Maps** | [Google Maps API](https://developers.google.com/maps) (`@react-google-maps/api`) |
| **AI Chat UI** | 21st.dev-style components (custom glassmorphic) |
| **Notifications** | [React Hot Toast](https://react-hot-toast.com/) / [Sonner](https://sonner.emilkowal.dev/) |
| **Theme** | Dark mode system with CSS variables + Tailwind `dark:` |

### Backend (Light but Real — 15–20%)

| Category | Technologies |
|---|---|
| **Runtime** | [Node.js](https://nodejs.org/) |
| **Framework** | [Express.js](https://expressjs.com/) |
| **Database** | [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/) |
| **Authentication** | JWT + [Google OAuth 2.0](https://developers.google.com/identity) (Passport.js) |
| **File Uploads** | [Cloudinary](https://cloudinary.com/) (car photo storage & optimization) |
| **AI Integration** | [OpenAI API](https://platform.openai.com/) (GPT for Sage AI chat + image analysis) |
| **Payments** | [Razorpay](https://razorpay.com/) (future — inspection booking payments) |
| **Email** | [Nodemailer](https://nodemailer.com/) (report sharing) |

### API Endpoints (Core)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | User registration |
| `POST` | `/api/auth/login` | Login (JWT) |
| `GET` | `/api/auth/google` | Google OAuth redirect |
| `POST` | `/api/verify-car` | Submit VIN/photos for verification |
| `GET` | `/api/reports/:id` | Get vehicle integrity report |
| `POST` | `/api/generate-report` | Generate AI-powered report |
| `POST` | `/api/chat` | AI Car Expert conversation |
| `GET` | `/api/chat/history` | Chat history for a car |
| `GET` | `/api/mechanics/nearby` | Find nearby mechanics (Maps) |
| `POST` | `/api/upload` | Upload car photos (Cloudinary) |
| `GET` | `/api/my-cars` | User's saved vehicles |
| `POST` | `/api/book-inspection` | Book on-site inspection |

### Dev Tools & Quality

| Tool | Purpose |
|---|---|
| ESLint + Prettier | Code quality & formatting |
| Husky + lint-staged | Pre-commit hooks |
| Vitest | Unit testing |
| Playwright | E2E testing |
| GitHub Actions | CI/CD pipeline |

---

## 📁 Folder Structure

```
carSaga/
├── client/                          # Frontend (Vite + React + TS)
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── robots.txt
│   │   └── assets/
│   │       ├── lottie/              # Lottie animation JSONs
│   │       ├── images/              # Static images & icons
│   │       └── 3d/                  # Spline 3D model files
│   ├── src/
│   │   ├── main.tsx                 # App entry point
│   │   ├── App.tsx                  # Root component + Router
│   │   ├── vite-env.d.ts
│   │   │
│   │   ├── assets/                  # Imported assets
│   │   │   ├── fonts/
│   │   │   ├── icons/
│   │   │   └── images/
│   │   │
│   │   ├── components/              # Reusable UI components
│   │   │   ├── ui/                  # shadcn/ui primitives
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── Dialog.tsx
│   │   │   │   └── ...
│   │   │   ├── layout/              # Layout components
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── DashboardLayout.tsx
│   │   │   ├── charts/              # Nivo / Recharts wrappers
│   │   │   │   ├── MaintenanceCostChart.tsx
│   │   │   │   ├── ValueTrajectory.tsx
│   │   │   │   ├── ConditionBreakdown.tsx
│   │   │   │   └── ComparisonChart.tsx
│   │   │   ├── 3d/                  # Spline 3D components
│   │   │   │   ├── CarModel.tsx
│   │   │   │   └── InteractiveHero.tsx
│   │   │   ├── flow/                # React Flow components
│   │   │   │   ├── VerificationPipeline.tsx
│   │   │   │   ├── CustomNode.tsx
│   │   │   │   └── CustomEdge.tsx
│   │   │   ├── dnd/                 # dnd-kit drag & drop
│   │   │   │   ├── PhotoDropZone.tsx
│   │   │   │   └── SortablePhotoGrid.tsx
│   │   │   ├── chat/                # AI Chat components
│   │   │   │   ├── ChatDock.tsx
│   │   │   │   ├── MessageBubble.tsx
│   │   │   │   ├── TypewriterText.tsx
│   │   │   │   └── SuggestionChips.tsx
│   │   │   ├── maps/                # Google Maps components
│   │   │   │   ├── MechanicMap.tsx
│   │   │   │   └── LocationPicker.tsx
│   │   │   └── common/              # Shared components
│   │   │       ├── Loader.tsx
│   │   │       ├── GlassCard.tsx
│   │   │       ├── AnimatedCounter.tsx
│   │   │       ├── VerifiedBadge.tsx
│   │   │       └── ScoreCircle.tsx
│   │   │
│   │   ├── pages/                   # Route-level pages
│   │   │   ├── Landing.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── VerifyCar.tsx
│   │   │   ├── VehicleReport.tsx
│   │   │   ├── AiExpert.tsx
│   │   │   ├── MyCars.tsx
│   │   │   ├── Analytics.tsx
│   │   │   ├── BookInspection.tsx
│   │   │   └── NotFound.tsx
│   │   │
│   │   ├── features/                # Redux Toolkit slices
│   │   │   ├── auth/
│   │   │   │   ├── authSlice.ts
│   │   │   │   └── authAPI.ts
│   │   │   ├── car/
│   │   │   │   ├── carSlice.ts
│   │   │   │   └── carAPI.ts
│   │   │   ├── chat/
│   │   │   │   ├── chatSlice.ts
│   │   │   │   └── chatAPI.ts
│   │   │   └── report/
│   │   │       ├── reportSlice.ts
│   │   │       └── reportAPI.ts
│   │   │
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useVerification.ts
│   │   │   ├── useChat.ts
│   │   │   ├── useSmoothScroll.ts
│   │   │   └── useTheme.ts
│   │   │
│   │   ├── utils/                   # Utility functions
│   │   │   ├── api.ts               # Axios instance + interceptors
│   │   │   ├── constants.ts
│   │   │   ├── helpers.ts
│   │   │   └── validators.ts
│   │   │
│   │   ├── styles/                  # Global styles
│   │   │   ├── globals.css          # Tailwind directives + custom
│   │   │   ├── theme.ts             # Dark/light theme tokens
│   │   │   └── animations.css       # Keyframe animations
│   │   │
│   │   ├── store/                   # Redux store config
│   │   │   └── store.ts
│   │   │
│   │   └── types/                   # TypeScript type definitions
│   │       ├── car.ts
│   │       ├── user.ts
│   │       ├── report.ts
│   │       └── chat.ts
│   │
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── postcss.config.js
│   ├── components.json             # shadcn/ui config
│   └── package.json
│
├── server/                          # Backend (Node.js + Express)
│   ├── src/
│   │   ├── index.ts                 # Server entry point
│   │   ├── app.ts                   # Express app setup
│   │   │
│   │   ├── config/
│   │   │   ├── db.ts                # MongoDB connection
│   │   │   ├── cloudinary.ts        # Cloudinary config
│   │   │   ├── passport.ts          # Google OAuth strategy
│   │   │   └── env.ts               # Environment variables
│   │   │
│   │   ├── models/                  # Mongoose schemas
│   │   │   ├── User.ts
│   │   │   ├── Car.ts
│   │   │   ├── Report.ts
│   │   │   └── ChatMessage.ts
│   │   │
│   │   ├── routes/                  # API routes
│   │   │   ├── auth.routes.ts
│   │   │   ├── car.routes.ts
│   │   │   ├── report.routes.ts
│   │   │   ├── chat.routes.ts
│   │   │   ├── mechanic.routes.ts
│   │   │   └── upload.routes.ts
│   │   │
│   │   ├── controllers/             # Route handlers
│   │   │   ├── auth.controller.ts
│   │   │   ├── car.controller.ts
│   │   │   ├── report.controller.ts
│   │   │   ├── chat.controller.ts
│   │   │   ├── mechanic.controller.ts
│   │   │   └── upload.controller.ts
│   │   │
│   │   ├── middleware/              # Express middleware
│   │   │   ├── auth.middleware.ts   # JWT verification
│   │   │   ├── upload.middleware.ts # Multer config
│   │   │   └── error.middleware.ts  # Global error handler
│   │   │
│   │   ├── services/                # Business logic
│   │   │   ├── openai.service.ts    # OpenAI API integration
│   │   │   ├── cloudinary.service.ts
│   │   │   └── razorpay.service.ts
│   │   │
│   │   └── utils/                   # Server utilities
│   │       ├── asyncHandler.ts
│   │       ├── ApiError.ts
│   │       └── ApiResponse.ts
│   │
│   ├── tsconfig.json
│   ├── package.json
│   └── .env.example
│
├── .github/
│   └── workflows/
│       └── ci.yml                   # GitHub Actions CI/CD
│
├── .gitignore
├── .prettierrc
├── .eslintrc.cjs
├── LICENSE
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x or **yarn** >= 1.22
- **MongoDB** (local or [Atlas](https://www.mongodb.com/atlas))
- **Cloudinary** account (free tier)
- **OpenAI API Key**
- **Google OAuth** credentials
- **Google Maps API Key**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/riturajjhaba938/carSaga.git
cd carSaga

# 2. Install client dependencies
cd client
npm install

# 3. Install server dependencies
cd ../server
npm install

# 4. Setup environment variables
cp .env.example .env
# Fill in your API keys and secrets
```

### Environment Variables

Create a `.env` file in `/server`:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/carsaga

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# OpenAI
OPENAI_API_KEY=your_openai_key

# Google Maps
GOOGLE_MAPS_API_KEY=your_maps_key

# Razorpay (Future)
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### Running Locally

```bash
# Start backend (from /server)
npm run dev

# Start frontend (from /client)
npm run dev
```

Frontend runs on `http://localhost:5173` | Backend runs on `http://localhost:5000`

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT (Vite + React)                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │  Spline  │ │  React   │ │  dnd-kit │ │  Framer  │       │
│  │   3D     │ │   Flow   │ │  DnD     │ │  Motion  │       │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘       │
│       └─────────────┴────────────┴─────────────┘            │
│                          │                                  │
│         Redux Toolkit ◄──┤──► React Router                  │
│                          │                                  │
│              Axios ◄─────┘                                  │
└─────────────────────────┬───────────────────────────────────┘
                          │ REST API (JSON)
┌─────────────────────────┴───────────────────────────────────┐
│                   SERVER (Node.js + Express)                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │  JWT +   │ │ OpenAI   │ │Cloudinary│ │ Razorpay │       │
│  │  OAuth   │ │  GPT     │ │  Upload  │ │ Payments │       │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘       │
│       └─────────────┴────────────┴─────────────┘            │
│                          │                                  │
│                     Mongoose ODM                            │
└─────────────────────────┬───────────────────────────────────┘
                          │
                  ┌───────┴───────┐
                  │   MongoDB     │
                  │   Atlas       │
                  └───────────────┘
```

---

## 🎯 Frontend Libraries — Purpose Map

| Library | Where It Shines |
|---|---|
| **Spline** | 3D interactive car model on Landing hero + Vehicle Report detail view |
| **React Flow** | Visual verification pipeline — drag nodes: Photo Scan → VIN Check → AI Report → Maintenance Plan |
| **dnd-kit** | Multi-photo drag & drop upload zone on Car Verification page |
| **Framer Motion** | Page transitions, card animations, hover effects, layout animations |
| **Lottie React** | Loading spinners, success confetti, "verified" pulse, analysis progress |
| **Lenis** | Ultra-smooth landing page scroll experience |
| **Recharts** | Maintenance cost projections, value trajectory charts |
| **Nivo** | History timelines, multi-car comparison dashboards |
| **Google Maps** | Nearby mechanics, inspection center locator with pins + directions |
| **shadcn/ui** | Consistent, accessible UI primitives (buttons, dialogs, inputs, badges) |
| **MUI** | Data tables, complex form components, date pickers |
| **Redux Toolkit** | Global state for auth, car data, chat history, reports |
| **Formik + Yup** | Form handling and validation across auth, VIN input, booking forms |
| **React Hot Toast / Sonner** | Toast notifications for async actions (upload success, report ready) |

---

## 🔗 Related Links

| Resource | Link |
|---|---|
| 🎨 Figma Design | [View Design](https://www.figma.com/design/I4WSQhkRpO8OeMHZ74LbJA/Untitled?node-id=0-1&m=dev&t=twF7jXSbdBc32ii4-1) |
| ▶️ Figma Prototype | [View Prototype](https://www.figma.com/proto/I4WSQhkRpO8OeMHZ74LbJA/Untitled?node-id=0-1&t=twF7jXSbdBc32ii4-1) |
| 🚀 Live Demo | _Coming Soon_ |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/riturajjhaba938">Rituraj</a>
</p>