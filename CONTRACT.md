# FocusForge Webshop — Project Specification

> Contract-driven development reference document.  
> All decisions in this file are final unless explicitly overridden by the developer.  
> This document covers TU Wien "Internetrecht & Webshop" assignment exercises 0–3 and structural decisions for 4–6.

---

## Exercise 0 — Product & Company Definition

### Product: FocusForge

A distraction-blocking focus timer for students and developers.

**Core features:**

- Pomodoro-style timer with customizable work/break intervals
- Website & app blocker during focus sessions _(Pro only)_
- Session history & productivity statistics
- Minimal, keyboard-driven UI
- Mobile app (no web UI for the software itself — webshop only)

**Business model: Freemium**

| Tier | Price                   | Features                                             |
| ---- | ----------------------- | ---------------------------------------------------- |
| Free | €0                      | Basic timer, no blocking, 7-day history              |
| Pro  | €4.99/month or €39/year | Site blocking, unlimited history, CSV export, themes |

**Target audience:** Students and developers who need structured focus sessions.

---

### Company: FocusForge GmbH

| Field     | Value                                    |
| --------- | ---------------------------------------- |
| Name      | FocusForge GmbH                          |
| Location  | Vienna, Austria                          |
| Employees | 3 (1 founder + 2 fictitious co-founders) |
| Founded   | 2024                                     |

---

## Exercise 1 — Accessibility (WCAG 2.2 AA)

### Requirements

The site must conform to **WCAG 2.2 Level AA**. Key criteria to implement:

| Area                 | Requirement                                                                            |
| -------------------- | -------------------------------------------------------------------------------------- |
| Color contrast       | ≥ 4.5:1 for normal text, ≥ 3:1 for large text                                          |
| Keyboard navigation  | All interactive elements reachable via Tab, activated via Enter/Space                  |
| Focus indicators     | Visible, styled focus outline on all focusable elements (custom amber glow, on-brand)  |
| Alt text             | All `<img>` elements have descriptive `alt` attributes; decorative images use `alt=""` |
| Heading structure    | Logical `h1 → h2 → h3` hierarchy, no levels skipped                                    |
| Form labels          | Every `<input>` has an associated `<label>`                                            |
| Error identification | Form errors described in text, not color alone                                         |
| Language             | `<html lang="de">` on all pages                                                        |
| No seizure risk      | No content flashing > 3 times/second                                                   |
| Resize text          | Page usable at 200% zoom without horizontal scrolling                                  |
| Skip navigation      | Hidden skip-to-main link visible on focus                                              |
| Semantic HTML        | Use `<nav>`, `<main>`, `<header>`, `<footer>`, `<button>` correctly                    |

### Barrierefreiheitserklärung

A formal accessibility statement must be included (as a section in `/impressum`). It must contain:

- Conformance level claimed: WCAG 2.2 AA
- Date of last review
- Any known limitations
- Contact email for accessibility feedback
- How to request an accessible alternative

### Design & Accessibility Compatibility

The charcoal + amber palette is pre-validated for contrast:

- Background `#1a1a1a` + text `#F5A623` → passes 4.5:1 easily
- Custom focus ring: amber glow (`box-shadow: 0 0 0 3px #F5A623`)
- No accessibility compromises needed for the chosen aesthetic

### Tooling (for QA pass after build)

- [WAVE](https://wave.webaim.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/) browser extension

---

## Exercise 2 — Copyright (Urheberrecht)

### Media Inventory

All media must be documented. Current inventory:

| Asset                | Type       | Created with   | Author                    | Copyright status                                                                                            | Commercial use              |
| -------------------- | ---------- | -------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------- | --------------------------- |
| Wortbildmarke (logo) | Image/PNG  | Google Gemini  | Jonathan Löscher (prompt) | No UrhG protection (§ 1 UrhG — no _persönliche geistige Schöpfung_); Google waives ownership per Gemini ToS | ✅ Permitted per Gemini ToS |
| Bildmarke (icon)     | Image/PNG  | Google Gemini  | Jonathan Löscher (prompt) | Same as above                                                                                               | ✅ Permitted per Gemini ToS |
| Formmarke (shape)    | Image/PNG  | Google Gemini  | Jonathan Löscher (prompt) | Same as above                                                                                               | ✅ Permitted per Gemini ToS |
| All page texts       | Text       | Human-authored | Jonathan Löscher          | © Jonathan Löscher, all rights reserved                                                                     | N/A (own work)              |
| Fonts                | Font files | TBD            | TBD                       | Must be documented when chosen — prefer Google Fonts (OFL) or similar open license                          | ✅ Verify per font          |

> **Note on AI-generated images:** Under Austrian law (§ 1 UrhG) and current CJEU case law, purely AI-generated content does not qualify for copyright protection as it lacks human authorship. Google explicitly does not claim ownership of Gemini outputs (Gemini Terms of Service, 2025). Commercial use is permitted. All AI-generated images carry an invisible SynthID watermark per Google policy.

> **EU AI Act disclosure obligation:** Per Art. 50 EU AI Act, AI-generated images must be labelled as such. All AI-generated assets on the site must carry a visible or accessible disclosure.

### Where this lives on the site

Documented in the **Mediennachweise & Urheberrecht** section of `/impressum`.

### Remaining media to source (with required license)

When adding further media (e.g. background textures, icons, UI sounds), use only:

- **Images/graphics:** Wikimedia Commons (CC0 or CC BY), Unsplash (Unsplash License), or own work
- **Icons:** Lucide, Heroicons, or Phosphor Icons (MIT)
- **Fonts:** Google Fonts (OFL) or similar
- **Sounds/music:** freesound.org (CC0) or ZapSplat (free license)
- Document every asset added in the media inventory table above

---

## Exercise 3 — Brand (Marke)

### Three Markenformen

#### 1. Wortbildmarke (primary logo)

- **Form:** "FocusForge" wordmark + icon combined
- **Icon concept:** Stylized anvil with a flame emerging from the top; flame subtly incorporates a clock hand / stopwatch needle silhouette
- **Typography:** Bold geometric sans-serif (sharp, heavy weight — evokes "forge" metaphor)
- **Colors:** Deep charcoal background `#1a1a1a`, icon + text in electric amber/gold `#F5A623`
- **Style:** Flat vector, no gradients, no drop shadows
- **Usage:** Website header, marketing material, primary brand identity

**Image generation prompt:**

> Minimalist logo design for a productivity software brand called "FocusForge". The logo consists of a bold geometric sans-serif wordmark "FocusForge" paired with a compact icon to its left: a stylized anvil with a small flame emerging from its top, where the flame subtly incorporates the silhouette of a clock or timer hand. Deep charcoal background (#1a1a1a), icon and text in electric amber/gold (#F5A623). Clean, sharp edges, no gradients, no shadows. Flat vector style. Professional, modern, suitable for a tech startup.

---

#### 2. Bildmarke (standalone icon)

- **Form:** Pure symbol, no text
- **Icon concept:** Same anvil-flame-clock icon as the Wortbildmarke, isolated
- **Colors:** `#1a1a1a` background, `#F5A623` icon
- **Style:** Flat vector, perfectly symmetrical, readable at 32×32px
- **Usage:** Favicon, app icon, social media profile picture

**Image generation prompt:**

> Minimalist standalone icon for a productivity software brand. A stylized anvil with a flame rising from its top center, the flame shaped to subtly resemble a clock hand or stopwatch needle. Deep charcoal (#1a1a1a) background, icon in electric amber/gold (#F5A623). Perfectly symmetrical, bold and simple enough to be readable at 32x32 pixels. Flat vector style, no text, no gradients, no drop shadows. Suitable as an app icon or favicon.

---

#### 3. Formmarke (abstract geometric shape)

- **Form:** Abstract standalone geometric shape — no text, no representational elements
- **Shape concept:** Bold regular hexagon with a single clean vertical rectangular notch cut from the top edge (evokes a clock segment removed; also echoes bolt head / industrial tooling)
- **Colors:** `#1a1a1a` background, `#F5A623` shape
- **Style:** Perfectly geometric, mathematically precise, flat vector
- **Usage:** Watermark, background pattern, embossing, decorative element
- **Trademark strength:** High — abstract shapes are the legally strongest mark type

**Image generation prompt:**

> Abstract geometric trademark shape, no text, no icons. A bold regular hexagon with a single clean vertical rectangular notch cut out from the top edge, like a segment removed from a clock face. Deep charcoal (#1a1a1a) background, shape in electric amber/gold (#F5A623). Perfectly geometric, sharp corners, mathematically precise. Flat vector, completely abstract, no representational elements. Isolated on background, centered.

---

### Nizza Classifications

| Class         | Description                                      | Applies to                               |
| ------------- | ------------------------------------------------ | ---------------------------------------- |
| **Klasse 9**  | Computer software (downloadable)                 | The FocusForge mobile app                |
| **Klasse 42** | Software as a service; providing online software | The freemium/subscription delivery model |

### Trademark Infringement Checklist

Before finalizing any brand element, verify against [EUIPO eSearch](https://euipo.europa.eu/eSearch/), [TMview](https://www.tmview.org/), and [Madrid Monitor](https://www.wipo.int/madrid/monitor/):

- ✅ **Color:** Charcoal + amber — avoid red/white (Todoist proximity), pure orange (Firefox proximity)
- ✅ **Name:** "FocusForge" — verify no identical/similar mark in Klasse 9/42
- ✅ **Icon:** Anvil + flame — verify no similar figurative mark in the register
- ✅ **Shape:** Notched hexagon — verify no similar geometric mark registered
- ✅ **No well-known marks referenced** in any visual element

### About Us Page (`/about`)

Must contain:

- Company story / founding narrative
- Presentation of all three Markenformen with visual display
- Explanation of each mark's meaning and design rationale
- Nizza class assignments with brief explanation

---

## Site Architecture

### Pages

| Route               | Page                                                           | Exercises covered |
| ------------------- | -------------------------------------------------------------- | ----------------- |
| `/`                 | Landing / Shop (hero, features, pricing teaser)                | 1, 2              |
| `/preise`           | Pricing page (Free vs Pro comparison + mocked checkout)        | 0, AGB            |
| `/checkout-success` | Mocked checkout success page                                   | 0, AGB            |
| `/about`            | About Us (brand story, Markenformen, Nizza)                    | 3                 |
| `/lizenz`           | License page                                                   | 4                 |
| `/datenschutz`      | Privacy policy                                                 | 5                 |
| `/agb`              | General terms of service + subscription terms + Widerrufsrecht | AGB               |
| `/kontakt`          | Contact page                                                   | 6                 |
| `/impressum`        | Impressum + Urheberrecht + Barrierefreiheitserklärung          | 2, 6, 1           |

---

## Legal Text Requirements Summary

| Document                       | Location               | Required because of             |
| ------------------------------ | ---------------------- | ------------------------------- |
| Impressum                      | `/impressum`           | § 24 Mediengesetz (Austria)     |
| Barrierefreiheitserklärung     | `/impressum` (section) | WCAG / best practice            |
| Mediennachweise & Urheberrecht | `/impressum` (section) | Exercise 2                      |
| Datenschutzerklärung           | `/datenschutz`         | DSGVO                           |
| AGB incl. Widerrufsrecht       | `/agb`                 | FAGG (Austria), EU consumer law |
| Lizenzbestimmungen             | `/lizenz`              | Exercise 4                      |

### Key legal notes for AGB / checkout

- **Widerrufsrecht:** 14-day right of withdrawal applies to digital purchases. Can be excluded if user explicitly consents to immediate delivery and acknowledges waiver at checkout (mandatory checkbox).
- **Subscription info:** Must clearly state minimum duration, renewal date, how to cancel.
- **DSGVO basis for accounts:** Art. 6(1)(b) — contract performance.
- **AI Act Art. 50:** All AI-generated images must be labelled as AI-generated on the site.

---

## Design System

### Colors

| Token                | Hex       | Usage                                        |
| -------------------- | --------- | -------------------------------------------- |
| `--color-bg`         | `#1a1a1a` | Page background                              |
| `--color-surface`    | `#242424` | Card / surface background                    |
| `--color-accent`     | `#F5A623` | Primary accent, CTA buttons, brand color     |
| `--color-text`       | `#F0F0F0` | Body text                                    |
| `--color-text-muted` | `#A0A0A0` | Secondary text                               |
| `--color-focus`      | `#F5A623` | Focus ring (`box-shadow: 0 0 0 3px #F5A623`) |

### Typography

- Display / headings: distinctive geometric or industrial font (not Inter, not Space Grotesk)
- Body: refined, readable serif or humanist sans
- All fonts must be sourced under OFL or equivalent open license — document in media inventory

### General constraints

- Static site — no backend required
- All interactive processes (login, checkout, subscription) are mocked
- Mobile-first, fully responsive
- Semantic HTML throughout (`<nav>`, `<main>`, `<header>`, `<footer>`, `<button>`, `<label>`)
- `<html lang="de">` on all pages
- All pages must pass WAVE / axe DevTools with zero critical errors

---

## Out of Scope (for now)

- Exercise 4 (Lizenz page content) — deferred
- Exercise 5 (Datenschutzerklärung content) — deferred
- Actual backend, payment processing, or user authentication
