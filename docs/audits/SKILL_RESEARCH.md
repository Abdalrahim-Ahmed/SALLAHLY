# Phase 1: UI/UX Skill Research & Theoretical Framework

**Audit Date:** 2026-10-22  
**Auditor:** Antigravity UI/UX & Frontend Engineering Team  
**Scope:** Evaluation of 15 UI/UX Skill Repositories & Synthesis into an Unified Audit Methodology  

---

## 1. Inventory & Availability of the 15 UI/UX Skills

| # | Skill / Resource Name | Target URL | Status | Core Inspected Artifacts |
|---|---|---|---|---|
| 1 | **UXCraft — Complete UX/UI Guidelines** | `https://github.com/Seance1723/UXCraft` | **Accessible (200 OK)** | Design system rules, information hierarchy, form accessibility patterns. |
| 2 | **UX/UI Design System Guidelines** | `https://github.com/plugin87/ux-ui-agent-skills` | **Accessible (200 OK)** | Design tokens, component modularity, color role scales. |
| 3 | **UI/UX Skills Collection** | `https://github.com/taylorwinfield/ux-ui-skills` | **Accessible (200 OK)** | Master repository containing sub-skills 4 through 13. |
| 4 | **Bootstrapping Design Context** | `.../skills/bootstrapping-design-context` | **Accessible (200 OK)** | Domain grounding, data shapes, user archetypes, token baseline. |
| 5 | **Grounding Before Designing** | `.../skills/grounding-before-designing` | **Accessible (200 OK)** | Real tokens vs. invented classes, avoiding token drift, verified vocabulary. |
| 6 | **Design Judgment References** | `.../skills/design-judgment-references` | **Accessible (200 OK)** | Nielsen Heuristics (H1–H10), Rauno interaction bar, Atlassian cohesion. |
| 7 | **Flow Doc First** | `.../skills/flow-doc-first` | **Accessible (200 OK)** | Screen transitions, step-by-step state mappings, branching user flows. |
| 8 | **Designing States Not Screens** | `.../skills/designing-states-not-screens` | **Accessible (200 OK)** | 7 mandatory states: empty, loading, partial, error, edge, first-run, offline. |
| 9 | **Visual Hierarchy & Typography** | `.../skills/visual-hierarchy-and-type` | **Accessible (200 OK)** | 4 levers (size, weight, color role, space/grouping); ranked focal order. |
| 10 | **Interaction Craft** | `.../skills/interaction-craft` | **Accessible (200 OK)** | Communicative motion, optimistic/pessimistic async actions, focus management. |
| 11 | **Precision Copy & Formatting** | `.../skills/precision-copy-and-formatting` | **Accessible (200 OK)** | Documentation-grade microcopy, error formula `[What's wrong]. [What to do].`, currency/numbers. |
| 12 | **Grilling UI — UX Review** | `.../skills/grilling-ui` | **Accessible (200 OK)** | "Grill, don't glance", anchored findings, 3 severity tiers, concrete fixes. |
| 13 | **Anti-Slop UI Audit** | `.../skills/anti-slop-audit` | **Accessible (200 OK)** | 11-item checklist against AI-generated defaults, generic chrome, hover-only traps. |
| 14 | **Redesign & UX Audit** | `.../plugin87/.../redesign` | **Accessible (200 OK)** | Preservation of working functionality, incremental refactoring over rewrites. |
| 15 | **UI Design & Visual QA** | `https://github.com/mblode/agent-skills/tree/main/skills/ui-design` | **Accessible (200 OK)** | Layout grids, alignment, contrast ratios (WCAG 2.2 AA), responsive touch targets. |

---

## 2. Key Doctrinal Extractions & Principles Applicable to Salla7ly

### A. The "Grill, Don't Glance" Bar (`grilling-ui`)
- "Looks mostly fine" is a failure mode. Every screen, section, card, and input is guilty until cleared against an explicit design principle.
- Every finding must cite an exact anchor (e.g. `nielsen-heuristics.md` H1/H4/H8, WCAG 2.2 AA criterion, or token violation), state the verbatim quoted code/element, explain the exact *why*, and prescribe an immediate concrete fix.

### B. The Anti-Slop 11-Point Checklist (`anti-slop-audit`)
1. **Framework-Default Look:** Ensure custom styled components rather than unstyled defaults.
2. **Visual Hierarchy:** Eliminate flat, undifferentiated type where headings, labels, and text share identical visual weight.
3. **Centred-Everything:** Enforce deliberate RTL alignments and clear grid gutters rather than centering all content.
4. **Filler Data & Realism:** Real Egyptian addresses (Fifth Settlement districts: الحي الأول, الحي الخامس, المستثمرين, النرجس, الياسمين), valid phone formats (`010...`), accurate currency (`جنيه مصري`).
5. **Missing States:** Ensure empty search results, form errors, loading states, and confirmation receipts are comprehensively designed.
6. **Hover-Only Interactions:** Ensure hover-activated tooltips or buttons have direct touch and keyboard focus accessibility.
7. **Off-Scale Spacing:** Replace arbitrary inline pixels with CSS custom property tokens or consistent 4/8px spacing steps.
8. **Invented Tokens:** Eliminate classes or CSS variables that do not exist in `src/index.css`.
9. **Microcopy Tone:** Replace marketing cliches with calm, direct, task-oriented Arabic copy.
10. **Async Affordances:** Ensure form submissions show pending state and disable double-submission.
11. **Interaction Inconsistency:** Unify button styles, active chip states, and link arrow indicators across all views.

### C. The 4 Levers of Visual Hierarchy (`visual-hierarchy-and-type`)
- Never rely solely on font size.
- Every card and page must establish an explicit **ranked focal order**:
  1. *1st Focal Level:* Primary entity / title (Size step + Semibold/Bold + `--text` color role).
  2. *2nd Focal Level:* Current status / price / key metric (Semantic badge or `--primary`/`--btn` color + medium weight).
  3. *3rd Focal Level:* Explanatory body / short description (`--muted` color + regular weight + tight line-height).
  4. *4th Focal Level:* Secondary metadata / duration / guarantee (Icons + small type + grouped alignment).

### D. Designing States, Not Screens (`designing-states-not-screens`)
- The happy path is the trap:
  - Catalog search: Empty state when no service matches the query must provide clear guidance and a "reset filters" CTA.
  - Booking wizard: Interactive step validation errors must be associated with their input fields via `aria-describedby` and clear styling.
  - Contact form: Submission feedback state, field error states, and clear recovery instructions.

### E. Interaction Craft & Focus Management (`interaction-craft`)
- Keyboard focus indicators (`:focus-visible`) must be visible, high-contrast, and consistent across buttons, links, accordion headers, and inputs.
- Touch targets must be at least 44x44px for all mobile interactive controls (chips, date buttons, time slots, navbar menu).
- Accordion interactions must have smooth height transition or clear state toggling with proper `aria-expanded` attributes.

### F. Precision Copy & Numeric Correctness (`precision-copy-and-formatting`)
- Currency: Consistently display `جنيه مصري` formatted with proper spacing and Arabic numeral presentation where appropriate.
- Phone numbers: Clear Egyptian formatting hints (`010xxxxxxxx` or `011...`).
- Error messages: Strict adherence to `[What is wrong]. [How to fix it].` (e.g. `رقم الهاتف غير مكتمل. يرجى إدخال 11 رقماً يبدأ بـ 01`).

---

## 3. Conflict Resolution & Audit Matrix

Where recommendations between generic guidelines and the specific Salla7ly product context conflict, the following priority order governs:
1. **Core Business & Geographic Context:** Egypt / Fifth Settlement maintenance market, Egyptian Pound currency, Arabic RTL primacy.
2. **WCAG 2.2 AA Accessibility:** Non-negotiable floor for contrast, keyboard access, touch targets, and ARIA labels.
3. **Established Project Design Architecture:** Modern CSS custom properties, responsive grid system, React 18, React Router.
4. **Maintenance & Simplicity:** Prefer correcting design tokens in `src/index.css` and shared components (`Button`, `ServiceCard`, `SectionTitle`) over isolated overrides.
