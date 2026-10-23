# Project Discovery & Architecture Baseline: Salla7ly (صلحلي)

**Audit Date:** 2026-10-22  
**Auditor:** Antigravity Multidisciplinary UI/UX & Frontend Engineering Team  
**Application:** Salla7ly (صلحلي) — Reliable Home Maintenance & Repair Platform  
**Target Market:** Cairo / Fifth Settlement (التجمع الخامس), Egypt  

---

## 1. Executive Overview & Target Audience

Salla7ly is a web-based home maintenance and technical repair platform designed to connect homeowners and tenants in Egypt (specifically focused on the Fifth Settlement / New Cairo region) with verified, professional technicians for services including air conditioning, electrical work, plumbing, and general home maintenance.

### Core Value Propositions
1. **Estimated & Transparent Pricing (أسعار تقديرية):** Customers see service fees, inspection charges, and travel allowances upfront before booking.
2. **30-Day Guarantee (ضمان 30 يوم):** Service quality backed by a warranty on repairs.
3. **Punctual & Verified Technicians (فنيون موثوقون وموثقون):** Vetted background and technical expertise.
4. **Frictionless Booking (حجز سريع وسلس):** A multi-step flow allowing users to pick a service, describe the issue, specify their address, select a timeslot, and receive instant confirmation.

---

## 2. Technical Stack & Architecture

| Layer | Technology | Details |
|---|---|---|
| **Runtime / Tooling** | Node.js, Vite 5.4.21 | ESM-first bundling, fast HMR |
| **Framework** | React 18.3.1 | Functional components, Hooks, Context API |
| **Routing** | React Router DOM 6.28.0 | BrowserRouter, declarative Routes, URL search params |
| **Styling** | Vanilla CSS + CSS Custom Properties (`src/index.css`) | Custom design tokens, dark mode toggle (`data-theme`), responsive grid system |
| **Icons** | Lucide React 0.462.0 + Custom PNG Brand Assets | Custom service icons & brand assets extracted from design Drive |
| **Internationalization** | Custom Context-based I18n (`AppContext.jsx` + `i18n.js`) | Arabic (default, RTL) and English (LTR) bidirectional support |
| **Testing / Quality** | Vite Build (`npm run build`) | Static JSX bundling, production asset compilation |

---

## 3. Route Inventory & Navigation Map

The application follows a single-page application (SPA) model wrapped in `MainLayout`:

| Route Path | Page Component | Purpose | Key Sub-components / Sections |
|---|---|---|---|
| `/` | `Home.jsx` | Landing page / Main conversion funnel | `HeroSection`, Services Grid (4 core), `VideoSection`, `HowItWorks`, `PricingSection`, `TechniciansSection`, `GuaranteeBanner`, `Testimonials`, `FAQAccordion` |
| `/services` | `Services.jsx` | Full catalog & service search | Category tabs/chips (`all`, `ac`, `electric`, `plumbing`, `maintenance`), search input, `ServiceCard` grid |
| `/services/:id` | `ServiceDetails.jsx` | Single service deep-dive | Breadcrumbs, service hero with dynamic photo, service description, features check-list, common problems treated, sticky price calculation card with CTA to booking |
| `/booking` | `Booking.jsx` | 5-step interactive booking funnel | Stepper navigation, `BookingForm` (Service selection, Personal info, Problem description, Date/Time picker, Review & confirm), `BookingSummary` |
| `/booking/confirmation` | `BookingConfirmation.jsx` | Booking success receipt | Success badge, booking reference number, review summary card, phone callback notice, return actions |
| `/about` | `About.jsx` | Company identity & values | Mission/Vision cards, Core values grid, Team technician roster |
| `/contact` | `Contact.jsx` | Inquiries & direct contact | Interactive contact form with validation, contact details card (phone, email, address, hours), social media links |
| `*` | `NotFound.jsx` | 404 fallback | Status header, friendly message, redirect to home |

---

## 4. Shared Components & Design System Breakdown

### Layout
- **`Navbar.jsx`:** Sticky navigation bar, brand logo, main navigation links, language toggle (AR/EN), dark/light theme switch, action buttons, mobile responsive hamburger menu.
- **`Footer.jsx`:** Brand summary, quick links, contact info, social icons, copyright notice.
- **`MainLayout.jsx`:** Layout wrapper containing `ScrollManager` (handles smooth scroll to hash targets and scroll restoration on route changes).

### Common UI Components
- **`Button.jsx`:** Polymorphic button/link (`to` prop support), variants (`primary`, `accent`, `outline`, `ghost`), sizes (`sm`, `md`, `lg`).
- **`SectionTitle.jsx`:** Section heading with optional subtitle and right-aligned action link.
- **`ServiceCard.jsx`:** Interactive card displaying service icon, title, brief description, price tag, and directional detail link.
- **`TestimonialCard.jsx`:** Customer review card with rating stars, feedback quote, and customer avatar.
- **`FAQAccordion.jsx`:** Interactive single-open accordion with chevron rotation.

### State & Context
- **`AppContext.jsx`:** Manages language (`ar` / `en`), direction (`dir="rtl"` / `dir="ltr"`), theme (`light` / `dark`), persistent storage in `localStorage`.
- **`bookingValidation.js`:** Validation logic for booking steps and contact form, regex rules for phone, email, and required fields.

---

## 5. CSS Architecture & Tokens Inventory

Located in `src/index.css`:
- **Colors:**
  - `--primary`: `#21a0f9` (Light blue accent)
  - `--dark`: `#042d7c` (Deep navy brand color)
  - `--btn`: `#1d5bd8` (Primary brand blue)
  - `--btn-hover`: `#1748b0`
  - `--accent`: `#ffc21a` (Yellow CTA badge)
  - `--accent-text`: `#3a2a00`
  - `--bg`: `#f8fafc` (Slate light background)
  - `--surface`: `#ffffff`
  - `--text`: `#0f172a`
  - `--muted`: `#64748b`
  - `--border`: `#e2e8f0`
  - `--tint`: `#e8f1fe`
  - `--success`: `#15803d` / `--success-bg`: `#dcfce7`
  - `--danger`: `#dc2626`
- **Typography:**
  - Font families: `'IBM Plex Sans Arabic', 'Inter', system-ui, sans-serif`
  - Base line-height: `1.7`
- **Layout & Spacing:**
  - Container max-width: `min(1200px, 100% - 2rem)`
  - Section vertical padding: `4.5rem` (mobile: `3rem`)
  - Border radius: `16px` (`--radius`)
  - Box shadows: `0 4px 20px rgba(15, 23, 42, 0.07)`

---

## 6. Inspection Limitations & Environmental Constraints

1. **Local Node Environment:** Node.js, npm, and Vite CLI are available and operational. Builds run cleanly without errors.
2. **Headless / Non-browser Execution:** The current workspace is running in a server console without an interactive graphical browser session attached. Visual inspection is conducted via code analysis, DOM hierarchy modeling, asset inspection, and static verification.
3. **External Dependencies:** No CSS framework like Tailwind or component library (e.g. Radix, MUI) is currently loaded in `package.json`. All utility classes and component rules are written in standard CSS.
