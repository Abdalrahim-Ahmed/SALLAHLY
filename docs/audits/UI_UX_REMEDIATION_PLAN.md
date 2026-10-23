# UI/UX Remediation Plan: Salla7ly (صلحلي)

**Date:** 2026-10-22  
**Framework:** Phased Remediation Matrix with Architectural Integrity Preservation  
**Source of Truth:** `docs/audits/UI_UX_AUDIT_REPORT.md`  

---

## 1. Remediation Sequencing & Priority Tiers

| Phase / Order | Finding IDs | Category | Primary Target Files | Implementation Risk |
|---|---|---|---|---|
| **Phase A: Critical Accessibility & Usability** | FINDING-01, FINDING-02, FINDING-03 | Focus contrast, Mobile stepper, ISO date formatting | `src/index.css`, `src/pages/Booking.jsx`, `src/components/booking/BookingForm.jsx` | Low (isolated CSS + view logic) |
| **Phase B: High-Impact Responsive & State Fixes** | FINDING-04, FINDING-05, FINDING-06, FINDING-07, FINDING-08 | Price bidi format, Catalog grid, Empty search recovery, Mobile sticky CTA, ARIA slot semantics | `src/index.css`, `src/pages/Services.jsx`, `src/pages/ServiceDetails.jsx`, `src/components/booking/BookingForm.jsx`, `src/components/layout/Navbar.jsx` | Low to Medium |
| **Phase C: Interaction Polish & Consistency** | FINDING-09, FINDING-10, FINDING-11, FINDING-12, FINDING-13 | Navbar escape/backdrop, Pricing line-item order, Touch targets >=44px, Async submit states, Semantic breadcrumbs | `src/components/layout/Navbar.jsx`, `src/components/home/HeroSection.jsx`, `src/pages/Contact.jsx`, `src/pages/ServiceDetails.jsx`, `src/index.css` | Low |
| **Phase D: Copy, Theming & Micro-refinement** | FINDING-14, FINDING-15, FINDING-16, FINDING-17, FINDING-18 | Egyptian dialect copy, Confirmation quick actions, Dark mode tokens, Card polish, Dynamic route titles | `src/pages/About.jsx`, `src/pages/NotFound.jsx`, `src/pages/BookingConfirmation.jsx`, `src/components/common/ServiceCard.jsx`, `src/components/layout/MainLayout.jsx`, `src/index.css` | Very Low |

---

## 2. Component Modification Matrix

### 1. `src/index.css` (Design Tokens & Core Classes)
- **Resolved Findings:** FINDING-01, FINDING-02, FINDING-04, FINDING-07, FINDING-11, FINDING-16, FINDING-17
- **Modifications:**
  - Update `:focus-visible` with high-contrast token (`var(--btn)` in light mode, `var(--primary)` in dark mode).
  - Add dark-mode `--dark: #0a1733;` token.
  - Implement `.price-tag` and numeric formatting classes without bidi collision.
  - Implement responsive mobile stepper rules (`@media (max-width: 640px)`).
  - Add mobile sticky CTA bar styling for service details (`.mobile-booking-bar`).
  - Upgrade touch target padding and min-heights for `.chip`, `.slot`, `.btn-sm` (>=44px on mobile).
  - Add drawer backdrop and transition classes for mobile navigation.

### 2. `src/components/layout/Navbar.jsx`
- **Resolved Findings:** FINDING-08, FINDING-09
- **Modifications:**
  - Add `aria-expanded={open}` and `aria-label` to menu toggle button.
  - Add Escape key listener and backdrop element to close drawer on outside click.
  - Trap/restore focus on drawer state change.

### 3. `src/components/booking/BookingForm.jsx` & `src/pages/Booking.jsx`
- **Resolved Findings:** FINDING-02, FINDING-03, FINDING-08, FINDING-12
- **Modifications:**
  - Add localized Arabic date formatting helper (`formatArabicDate(isoDate)`).
  - In Step 3 (Slots): Add `aria-pressed={isSelected}` and accessible role attributes.
  - In `Booking.jsx`: Render compact mobile step progress header on small viewports.
  - Add async submit simulation with loading spinner and disabled state during confirmation transition.

### 4. `src/pages/Services.jsx`
- **Resolved Findings:** FINDING-05, FINDING-06
- **Modifications:**
  - Change grid to `grid grid-4` on desktop and auto-balanced layout.
  - Refactor empty search state: add professional Egyptian copy and an explicit "عرض جميع الخدمات" (Show all services) reset button.

### 5. `src/pages/ServiceDetails.jsx`
- **Resolved Findings:** FINDING-07, FINDING-10, FINDING-13
- **Modifications:**
  - Add semantic breadcrumbs with `<nav aria-label="مسار التصفح"><ol>...`.
  - Harmonize price line-item order (Service fee -> Inspection fee -> Travel fee).
  - Add responsive sticky bottom booking bar for mobile viewports (<768px).

### 6. `src/components/home/HeroSection.jsx`
- **Resolved Findings:** FINDING-10
- **Modifications:**
  - Harmonize estimate line-item order: 1. سعر الخدمة, 2. رسوم المعاينة, 3. رسوم الانتقال.

### 7. `src/pages/BookingConfirmation.jsx`
- **Resolved Findings:** FINDING-03, FINDING-15
- **Modifications:**
  - Localized Arabic date presentation.
  - Add quick action buttons: "نسخ رقم الحجز" (Copy Ref ID with toast notice) and "مشاركة عبر واتساب" (WhatsApp share).

### 8. `src/pages/Contact.jsx`
- **Resolved Findings:** FINDING-12
- **Modifications:**
  - Add simulated async loading state (`isSubmitting`) with button spinner and disabled attribute.

### 9. `src/pages/About.jsx` & `src/pages/NotFound.jsx`
- **Resolved Findings:** FINDING-14
- **Modifications:**
  - Refine microcopy to consistent Egyptian Modern Arabic.

### 10. `src/components/layout/MainLayout.jsx`
- **Resolved Findings:** FINDING-18
- **Modifications:**
  - Add dynamic page title helper based on route location.

---

## 3. Verification & Acceptance Checkpoints

Before considering the remediation complete:
1. **Zero Build Errors:** `npm run build` must compile without errors or warnings.
2. **Contrast Verification:** All focus rings, text, and badges clear WCAG 2.2 AA contrast in both light and dark themes.
3. **Responsive Verification:** Tested at 320px, 375px, 768px, 1024px, and 1440px without horizontal overflow or broken wrapping.
4. **Interactive State Verification:** All form submissions show visual pending states; empty states provide clear single-click recovery.
5. **No Regressions:** All existing routes, features, and core data remain 100% operational.
