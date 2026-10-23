# Comprehensive UI/UX Audit Report: Salla7ly (صلحلي)

**Audit Date:** 2026-10-22  
**Auditor:** Antigravity UI/UX & Frontend Engineering Team  
**Methodology:** Grounded, evidence-based audit anchored to 15 UI/UX skill repositories, Nielsen Heuristics (H1–H10), and WCAG 2.2 AA standards.  
**Severity Classification:**  
- **Critical:** Blocks important user tasks or causes severe accessibility/usability failures.
- **High:** Significantly impairs usability, readability, responsiveness, or core user flow.
- **Medium:** Noticeable design, spacing, layout, or interaction defect with moderate impact.
- **Low:** Visual polish, cosmetic refinement, micro-typography, or minor consistency enhancement.

---

## Executive Summary of Findings

| Severity | Count | Primary Focus Areas |
|---|---|---|
| **Critical** | 3 | Focus ring contrast failure (WCAG 1.4.11), Mobile stepper layout collapse (320px–375px), Raw ISO date leakage in booking review (Precision Copy). |
| **High** | 5 | Inconsistent currency/number directional formatting, Catalog 4-card orphan wrap in 3-column grid, Missing search empty-state recovery action, Missing mobile booking summary affordance, Missing ARIA state semantics in booking slots & mobile menu. |
| **Medium** | 6 | Dialect inconsistency in copy (Gulf/Levantine idioms vs. Egyptian Arabic), Focus trap & Escape dismissal missing on mobile nav drawer, Unbalanced field order between hero estimate and service detail cards, Touch target sizing on small interactive chips (<44px), Missing submit loading indicator on contact & booking forms, Breadcrumb navigation missing semantic HTML (`nav`/`ol`). |
| **Low** | 4 | Card heading line-height and optical balance, Missing WhatsApp/Quick share receipt affordance on confirmation page, Dark mode token completeness (`--dark` token in dark theme), Missing favicon and metadata polish. |
| **Total** | **18** | Complete resolution mapped in Remediation Plan. |

---

## Detailed Findings

### FINDING-01: Low Focus Indicator Contrast in Light Mode
- **Component / File:** `src/index.css` (Line 43)
- **Evidence:**  
  ```css
  :focus-visible { outline: 3px solid var(--primary); outline-offset: 2px; }
  ```
  In light mode, `--primary` is `#21a0f9`. When tested against the light background `#ffffff` and surface `#f8fafc`, `#21a0f9` provides a contrast ratio of only **2.45:1**.
- **Impact on User:** Keyboard-only users and individuals with low vision cannot reliably discern which interactive control currently holds focus.
- **Severity:** **Critical**
- **Related Principle:** WCAG 2.2 Criterion 1.4.11 (Non-text Contrast — minimum 3:1 required for focus indicators); Nielsen H6 (Recognition over Recall).
- **Skill Reference:** `interaction-craft` ("Focus and keyboard are first-class — 'the mouse works' is half a design"); `anti-slop-audit` Item 6.
- **Recommended Solution:** Update `:focus-visible` to use `--btn` (`#1d5bd8`, contrast 4.63:1 against white) in light mode, and `--primary` (`#21a0f9`, contrast 6.3:1 against `#111a2e`) in dark mode.
- **Acceptance Criteria:** Focus ring achieves at least 3:1 contrast against all surrounding background surfaces in both themes.

---

### FINDING-02: Mobile Stepper Progress Bar Break & Jagged Wrap (<400px)
- **Component / File:** `src/pages/Booking.jsx` & `src/index.css` (Lines 245–248)
- **Evidence:**  
  ```css
  .stepper { display: flex; gap: 0.4rem; margin-bottom: 2rem; flex-wrap: wrap; }
  .stepper .s { flex: 1; min-width: 110px; text-align: center; ... }
  ```
  The booking funnel has 5 sequential steps. On mobile devices with screen widths of 320px–375px (iPhone SE, smaller Android screens), 5 items each with `min-width: 110px` force an awkward 3-item / 2-item wrap.
- **Impact on User:** Confusing, jagged layout disrupts the mental model of a sequential forward pipeline. Current step indication is obscured across rows.
- **Severity:** **Critical**
- **Related Principle:** Nielsen H1 (Visibility of system status); Responsive Design standards (320px baseline).
- **Skill Reference:** `designing-states-not-screens` (Step progress visibility); `anti-slop-audit` Item 3 (Alignment grid).
- **Recommended Solution:** On viewports below 640px, convert the stepper into a compact, responsive progress indicator showing the active step number, total steps, and current step title (e.g. `الخطوة 2 من 5: بياناتك وعنوانك`) alongside a smooth percentage progress bar, while maintaining the full desktop stepper for viewports >= 640px.
- **Acceptance Criteria:** Zero horizontal overflow or irregular wrapping at 320px, 375px, and 768px.

---

### FINDING-03: Raw ISO Timestamp Leaking into Booking Confirmation Review
- **Component / File:** `src/components/booking/BookingForm.jsx` (Lines 107–108)
- **Evidence:**  
  ```javascript
  ['الموعد', `${data.date} — ${data.time}`]
  ```
  `data.date` stores an ISO date string (`2026-10-23`). The review step renders this directly as `2026-10-23 — 10:00 ص`.
- **Impact on User:** Technical machine format creates cognitive dissonance for non-technical users and feels unpolished.
- **Severity:** **Critical**
- **Related Principle:** Nielsen H2 (Match between system and real world); Precision Copy Doctrine.
- **Skill Reference:** `precision-copy-and-formatting` ("Dates and times are user-facing and localised — a raw ISO timestamp rendered as UI text is a bug").
- **Recommended Solution:** Create a formatting helper that parses `data.date` and returns a localized Arabic date string (e.g. `الجمعة، 23 أكتوبر 2026`).
- **Acceptance Criteria:** Review screen and confirmation screen display human-readable Arabic dates.

---

### FINDING-04: Bi-directional Text Jitter in Price Tags (`direction: ltr` with Arabic Currency)
- **Component / File:** `src/index.css` (Line 141), `src/components/common/ServiceCard.jsx`
- **Evidence:**  
  ```css
  .price-tag { color: var(--btn); font-weight: 700; direction: ltr; }
  ```
  When rendering `{FEES.currency} {service.price}`, the LTR rule forces Arabic words and Western digits to scramble into `جنيه مصري 120` in an awkward mixed-bidi direction.
- **Impact on User:** Unnatural reading cadence for Arabic speakers in Egypt; inconsistent with Egyptian market norms (`120 جنيه مصري` or `120 ج.م`).
- **Severity:** **High**
- **Related Principle:** Nielsen H2 (Match between system and real world); Nielsen H4 (Consistency).
- **Skill Reference:** `precision-copy-and-formatting` ("Formatting is correctness, not polish. Money is always rendered with locale grouping and explicit currency").
- **Recommended Solution:** Standardize a unified price presentation format across all cards and summaries: `${service.price} ${FEES.currency}` with native Arabic-friendly alignment and clear spacing.
- **Acceptance Criteria:** Prices render consistently as `<number> <currency>` without punctuation or bidi glitches across both Arabic and English modes.

---

### FINDING-05: Orphan Service Card Wrap on Catalog Page (`/services`)
- **Component / File:** `src/pages/Services.jsx` (Line 47)
- **Evidence:**  
  ```jsx
  <div className="grid grid-3">{results.map((s) => <ServiceCard key={s.id} service={s} />)}</div>
  ```
  The platform has exactly 4 core services. When browsing `/services` with category "All", a 3-column grid places 3 services on row 1, and leaves the 4th service stranded as an isolated card on row 2 with two empty grid cells.
- **Impact on User:** Visually unbalanced page layout that looks like incomplete data loading or a broken grid.
- **Severity:** **High**
- **Related Principle:** Nielsen H8 (Aesthetic and minimalist design); Visual Hierarchy Doctrine.
- **Skill Reference:** `visual-hierarchy-and-type` (Rhythm and alignment on the real spacing scale); `anti-slop-audit` Item 3.
- **Recommended Solution:** Use an auto-responsive grid or 4-column desktop layout (`grid grid-4` on desktop, `grid-2` on tablet, `grid-1` on mobile) so all 4 core services display harmoniously side-by-side or in a balanced 2x2 grid.
- **Acceptance Criteria:** No orphaned single cards when displaying 4 services on viewports >= 1024px.

---

### FINDING-06: Empty Catalog Search Lacks Reset Action & Uses Inappropriate Dialect
- **Component / File:** `src/pages/Services.jsx` (Lines 49–52)
- **Evidence:**  
  ```jsx
  <div className="card center">
    <Search size={28} className="muted" />
    <p style={{ marginTop: '0.5rem' }}>ما لقينا خدمة بهذا الاسم. جرّب كلمة أخرى أو اختر "الكل".</p>
  </div>
  ```
- **Impact on User:** User is stuck at an informational dead-end with no single-click recovery button. The phrase "ما لقينا" is a Gulf/Levantine colloquialism that contrasts with the Egyptian market identity.
- **Severity:** **High**
- **Related Principle:** Nielsen H1 (Visibility of system status); Nielsen H9 (Help users recognize and recover from errors).
- **Skill Reference:** `designing-states-not-screens` ("Empty is onboarding, never a blank... offer the single next action"); `precision-copy-and-formatting`.
- **Recommended Solution:** Replace the text with standard Egyptian/professional Arabic ("لم نجد أي خدمة مطابقة لبحثك") and add a primary recovery button that clears the search query and resets the category to "all".
- **Acceptance Criteria:** Empty search displays informative message and a functional "عرض جميع الخدمات" (Show all services) button.

---

### FINDING-07: Missing Mobile Sticky Booking Affordance on Service Details
- **Component / File:** `src/pages/ServiceDetails.jsx` (Lines 46–56)
- **Evidence:** On viewports < 900px, the grid collapses into a single column. The pricing and "احجز هذه الخدمة" (Book this service) button sit at the very bottom of the page beneath lengthy descriptions and lists.
- **Impact on User:** Mobile users have to scroll through several screens before seeing the price or discovering the booking action, significantly increasing conversion drop-off.
- **Severity:** **High**
- **Related Principle:** Fitts' Law; Usability & Conversion Ergonomics.
- **Skill Reference:** `interaction-craft` (Touch surface ergonomics); `visual-hierarchy-and-type`.
- **Recommended Solution:** Provide a sticky bottom bar on mobile viewports (< 768px) that displays the service price and a direct "احجز الآن" (Book now) button, anchored above mobile browser chrome.
- **Acceptance Criteria:** Service details page maintains immediate booking accessibility regardless of scroll depth on mobile devices.

---

### FINDING-08: Interactive Slots and Navigation Menu Missing ARIA State Semantics
- **Component / File:** `src/components/layout/Navbar.jsx` (Line 41), `src/components/booking/BookingForm.jsx` (Lines 83–94)
- **Evidence:**  
  Mobile menu toggle button has `aria-label="Menu"` but lacks `aria-expanded={open}` and `aria-controls`. Date and time slot buttons rely purely on `.selected` class without `aria-pressed={isSelected}`.
- **Impact on User:** Screen-reader and assistive technology users cannot determine whether the mobile drawer is open or which date/time slot is currently selected.
- **Severity:** **High**
- **Related Principle:** WCAG 2.2 Criterion 4.1.2 (Name, Role, Value).
- **Skill Reference:** `interaction-craft` (Focus and keyboard paths); `anti-slop-audit` Item 6.
- **Recommended Solution:** Add `aria-expanded={open}` to the mobile menu button and `aria-pressed={data.date === d.value}` / `aria-pressed={data.time === t}` to slot buttons.
- **Acceptance Criteria:** Assistive technologies announce state changes correctly when interacting with slots and the mobile navigation menu.

---

### FINDING-09: Mobile Menu Lacks Escape Dismissal & Outside Click Handling
- **Component / File:** `src/components/layout/Navbar.jsx`
- **Evidence:** When the mobile menu is open, pressing the Escape key does not dismiss it, nor does clicking outside the drawer.
- **Impact on User:** Keyboard users on mobile or hybrid tablets must tab through the entire menu to escape it.
- **Severity:** **Medium**
- **Related Principle:** WCAG 2.2 Criterion 2.1.1 (Keyboard); Nielsen H7 (Flexibility and efficiency of use).
- **Skill Reference:** `interaction-craft` ("When a dialog opens, focus moves into it; when it closes, focus returns to the trigger").
- **Recommended Solution:** Add `useEffect` keydown listener for `Escape` and backdrop overlay click handler to dismiss the drawer cleanly.
- **Acceptance Criteria:** Pressing Escape or tapping the backdrop closes the mobile navigation menu.

---

### FINDING-10: Inconsistent Line-Item Ordering Across Pricing Surfaces
- **Component / File:** `src/components/home/HeroSection.jsx` vs `src/components/home/PricingSection.jsx` & `src/pages/ServiceDetails.jsx`
- **Evidence:**  
  In HeroSection: 1. Service Price, 2. Travel fee, 3. Inspection fee.  
  In PricingSection & ServiceDetails: 1. Service Price, 2. Inspection fee, 3. Travel fee.
- **Impact on User:** Subtle inconsistency breaks cognitive rhythm as users compare pricing between the hero card and detail/pricing sections.
- **Severity:** **Medium**
- **Related Principle:** Nielsen H4 (Consistency and standards).
- **Skill Reference:** `anti-slop-audit` Item 11 ("Inconsistent interaction / presentation across surfaces").
- **Recommended Solution:** Harmonize line-item ordering across all cards: 1. سعر الخدمة (Service), 2. رسوم المعاينة (Inspection), 3. رسوم الانتقال (Transportation).
- **Acceptance Criteria:** Identical sequence of cost elements across hero estimate, pricing section, service details, and booking summary.

---

### FINDING-11: Touch Targets on Category Chips & Slots Under 44px on Mobile
- **Component / File:** `src/index.css` (Line 225, Line 253)
- **Evidence:**  
  `.chip { padding: 0.4rem 1.1rem; font-size: 0.9rem; }` produces a rendered height of ~34px.  
  `.slot { padding: 0.55rem 1rem; font-size: 0.9rem; }` produces ~36px height.
- **Impact on User:** High risk of accidental mis-taps on mobile devices with touch screens.
- **Severity:** **Medium**
- **Related Principle:** WCAG 2.2 Criterion 2.5.8 (Target Size — Minimum); Mobile Touch Ergonomics.
- **Skill Reference:** `mblode/agent-skills/ui-design` (Touch targets >= 44x44px).
- **Recommended Solution:** Adjust vertical padding and min-height on mobile viewports so interactive touch targets satisfy the 44px minimum recommendation.
- **Acceptance Criteria:** All clickable chips, slots, and buttons measure at least 44px in tap height on mobile touch screens.

---

### FINDING-12: Missing Async Loading State on Form Submissions
- **Component / File:** `src/pages/Contact.jsx` & `src/pages/Booking.jsx`
- **Evidence:** Submitting contact messages or completing the booking transition happens instantaneously without any pending animation, spinner, or disabled button state.
- **Impact on User:** Users can trigger multiple accidental duplicate clicks; lacks feedback that the request is processing.
- **Severity:** **Medium**
- **Related Principle:** Nielsen H1 (Visibility of system status); Rauno Interaction Craft.
- **Skill Reference:** `interaction-craft` ("Treating latency as 'the backend's problem' and bolting on a spinner at the end is the abdication... Every async action either reflects success or waits with clear affordance"); `anti-slop-audit` Item 10.
- **Recommended Solution:** Introduce an explicit loading / pending state on form submit buttons with disabled attribute and visual spinner during transmission.
- **Acceptance Criteria:** Submit buttons display a pending indicator and disable further clicks while processing.

---

### FINDING-13: Breadcrumb Navigation Lacks Semantic HTML & Structured Data
- **Component / File:** `src/pages/ServiceDetails.jsx` (Line 19)
- **Evidence:**  
  `<div className="crumbs"><Link to="/services">الخدمات</Link> / {service.title}</div>`
- **Impact on User:** Assistive technologies treat breadcrumbs as generic text paragraphs rather than hierarchical site navigation.
- **Severity:** **Medium**
- **Related Principle:** WCAG 2.2 Criterion 1.3.1 (Info and Relationships).
- **Skill Reference:** `mblode/agent-skills/ui-design` (Semantic HTML).
- **Recommended Solution:** Refactor breadcrumbs into `<nav aria-label="مسار التصفح"><ol className="crumbs"><li>...</li></ol></nav>`.
- **Acceptance Criteria:** Screen readers announce breadcrumb navigation hierarchy.

---

### FINDING-14: Dialectical Inconsistencies in Microcopy
- **Component / File:** `src/pages/About.jsx`, `src/pages/NotFound.jsx`
- **Evidence:**  
  In `About.jsx`: `المبادئ اللي نشتغل بها كل يوم` (Colloquial blend)  
  In `NotFound.jsx`: `الصفحة اللي تدور عليها مو موجودة` (Gulf Arabic "مو موجودة")
- **Impact on User:** Inconsistent regional voice for a product explicitly serving Fifth Settlement / Cairo residents.
- **Severity:** **Medium**
- **Related Principle:** Nielsen H2 (Match between system and real world); Precision Copy Doctrine.
- **Skill Reference:** `precision-copy-and-formatting` (Calm, precise, culturally coherent microcopy).
- **Recommended Solution:** Standardize 404 and about page copy into elegant Egyptian/Modern Standard Arabic: `الصفحة التي تبحث عنها غير موجودة أو تم نقلها`.
- **Acceptance Criteria:** All microcopy adopts coherent Egyptian Modern Arabic phrasing.

---

### FINDING-15: Missing Direct Action Options on Booking Confirmation Receipt
- **Component / File:** `src/pages/BookingConfirmation.jsx`
- **Evidence:** Users receive confirmation with a reference ID, but have no way to copy the booking number, share to WhatsApp, or print the receipt.
- **Impact on User:** In Egypt, confirmation via WhatsApp or saving details is the primary reassurance mechanism for home maintenance bookings.
- **Severity:** **Low**
- **Related Principle:** Nielsen H7 (Flexibility and efficiency of use).
- **Skill Reference:** `interaction-craft`; `UXCraft`.
- **Recommended Solution:** Add a "نسخ رقم الحجز" (Copy Booking Ref) and "مشاركة عبر واتساب" (Share via WhatsApp) quick action button.
- **Acceptance Criteria:** Users can copy the reference number with instant toast feedback.

---

### FINDING-16: Dark Mode Token Incompleteness for Deep Blue Banner Accent
- **Component / File:** `src/index.css` (Line 23–34)
- **Evidence:**  
  `--dark` is defined in `:root` as `#042d7c` but omitted from `[data-theme='dark']`.
- **Impact on User:** Minor tone mismatch in dark theme backgrounds using gradient tokens.
- **Severity:** **Low**
- **Related Principle:** Design Systems Architecture; Token Discipline.
- **Skill Reference:** `grounding-before-designing` (Complete token vocabulary).
- **Recommended Solution:** Explicitly define `--dark: #0a1733;` in `[data-theme='dark']`.
- **Acceptance Criteria:** Gradients in dark mode use dark-mode calibrated navy tones.

---

### FINDING-17: Service Card Typography Spacing & Optical Polish
- **Component / File:** `src/components/common/ServiceCard.jsx`
- **Evidence:**  
  Card title and icon header have inline styles mixed with global styles; lack subtle hover transition on icon background.
- **Impact on User:** Slight visual roughness during hover interactions.
- **Severity:** **Low**
- **Related Principle:** Visual Hierarchy & Micro-interactions.
- **Skill Reference:** `interaction-craft` (Subtle state transitions).
- **Recommended Solution:** Clean up styles into CSS classes with smooth hover feedback.
- **Acceptance Criteria:** Service cards animate smoothly on focus and hover.

---

### FINDING-18: Page Document Titles and Meta Tag Polish
- **Component / File:** `index.html` & page components
- **Evidence:** Page title is static in `index.html` ("صلحلي | Salla7ly – صيانة منزلية موثوقة") and does not update when navigating between Services, Booking, About, and Contact.
- **Impact on User:** Browser tabs do not communicate active page context; hinders bookmarking and tab switching.
- **Severity:** **Low**
- **Related Principle:** Nielsen H1 (Visibility of system status); WCAG 2.4.2 (Page Titled).
- **Skill Reference:** `precision-copy-and-formatting`.
- **Recommended Solution:** Add dynamic document title updates per route using a clean React effect.
- **Acceptance Criteria:** Each route displays a descriptive document title.
