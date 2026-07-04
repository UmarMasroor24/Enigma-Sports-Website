# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for **Enigma Sports**, a B2B custom sportswear manufacturer based in Sialkot, Pakistan. Deployed on GitHub Pages. No build system, no framework, no package manager — pure HTML5, CSS3, and vanilla JavaScript.

## Development

No build step required. Open `index.html` directly in a browser or use any static file server:

```bash
# Python (if available)
python -m http.server 8080

# Node (if available)
npx serve .
```

Deploying: push to GitHub; GitHub Pages serves directly from the repository root.

## Architecture

### Files
- `index.html` — main public website (2026 redesign; single page)
- `index_old.html` — previous version of the site, kept as backup (uses `main.css` / `main.js`)
- `styleguide.html` — internal brand design system for the OLD site (tab-based, not public-facing, ignored by the redesign)
- `404.html` — custom error page using `main.css`
- `assets/css/style.css` — all styles for the redesigned `index.html`
- `assets/css/main.css` — styles for `index_old.html` and `404.html`
- `assets/css/styleguide.css` — styles for `styleguide.html`
- `assets/js/site.js` — script for the redesigned `index.html` (see Interactions below)
- `assets/js/main.js` — script for `index_old.html`
- `assets/js/styleguide.js` — tab switching for styleguide
- `assets/img/` — placeholder mockup images (themed SVGs). Each file is named for its slot (`product-football.svg`, `about-main.svg`, `capability-facility.svg`, the `jersey-*.svg` lookbook set, …). To go live, replace the file with a real photo and update the `src` extension in `index.html`; the CSS (`.img-frame`, `.product-thumb`) uses `object-fit: cover`, so any photo aspect ratio works.
- `assets/img/favicon.svg` — SVG favicon (diamond mark in Enigma Red), referenced from the `<head>`

### Page Sections (order + `section-tag` number)
Single page, in DOM order. The `<b>` in each `.section-tag` is a manually-numbered label — if you insert/remove a section, renumber every one after it (and check the mobile menu overlay indices, which are separate).

1. Hero → 2. `#products` **02 Product Range** → 3. `#lookbook` **03 The Lookbook** (jersey mockup gallery) → 4. `#process` **04** → 5. `#why` **05** → 6. `#capabilities` **06** → 7. `#customisation` **07** → 8. `#testimonials` **08** → 9. `#faq` **09** → 10. `#contact` **10**. (`#about` is **01**, before Products.)

### Design Tokens (CSS custom properties on `:root` in `style.css`)
| Variable | Value | Usage |
|---|---|---|
| `--bg` | `#0A0A0B` | Page background |
| `--bg-2` | `#0E0E10` | Alternating section background |
| `--surface` | `#131316` | Card backgrounds |
| `--elevated` | `#1A1A1E` | Hover surfaces |
| `--line` | `#232328` | Borders / dividers |
| `--red` | `#E8112D` | ACTION accent: buttons, CTAs, nav, hover fills (Enigma Red) |
| `--red-bright` | `#FF3148` | Hover / highlight red |
| `--volt` | `#D9FF3F` | INFORMATION accent: numbers, tags, icons, stats, notes |
| `--volt-dim` | `rgba(217,255,63,0.07)` | Volt note/callout backgrounds |
| `--text` | `#F4F1EC` | Body text |
| `--text-2` | `#A8A49E` | Muted text |
| `--muted` | `#807C76` | Faint text |

**Accent rule (user-set):** red is for actions (buttons, links, hover states); volt green is for information (section-tag numbers, stat values/suffixes, list icons, kickers, FAQ plus icons, note callouts, index chips). Keep this split when adding components so the two accents don't blur together. The rule also governs **heading stroke color**: red outlines land on the selling/converting sections (Products, Why Us, Contact); volt on informational sections (About, Lookbook, Customisation, FAQ); white elsewhere. Avoid two same-colored strokes in adjacent sections.

### Typography
- **Display/headings**: `Anton` (uppercase, huge condensed headlines)
- **Body/UI**: `Space Grotesk` weights 300–700
- **Heading style rule**: headings use ONLY solid white Anton + outlined Anton (`.stroke`, with `.stroke--red` / `.stroke--volt` for colored outlines). Never colored fills or italic serif words in headings.
- `Instrument Serif` italic (`.fancy` class) is used only outside headings (CTA band marquee, footer tagline)
- All loaded from Google Fonts CDN.

### Interactions (`assets/js/site.js`)
- Preloader (`.loader`) — slides away on `body.is-loaded`; hero text reveals chain off that class
- Custom cursor (dot + lerped ring) — desktop pointer only. No magnetic/cursor-follow effects on buttons (removed at user request)
- Scroll reveals — `IntersectionObserver` adds `.in-view` to `.reveal` elements with per-batch stagger via `--d`
- Stat counters — `[data-count]` spans count up when 60% visible
- Active nav link — `IntersectionObserver` on `section[id]`
- Product rows — cursor-following `.product-flair` badge on hover
- FAQ accordion (single-open; open panel's `max-height` is recomputed on a debounced resize so it never clips), mobile fullscreen menu overlay, UI-only form handler
- All motion is gated on `prefers-reduced-motion` (both in JS checks and a CSS override block)

### Responsive Breakpoints
- `≤1024px` — tablet: nav links hidden behind burger, grids collapse, hero badge hidden
- `≤640px` — mobile: single column, stacked process/why grids, hidden product indexes

### Navigation & Routing
All navigation uses `#anchor` links — no client-side router. `html { scroll-behavior: smooth }` with `scroll-padding-top` for the fixed nav.

### Contact/Forms
The contact form in `index.html` is UI-only (submit shows a note directing to WhatsApp/email). README notes Formspree or Web3Forms as integration options — no backend is currently wired up.

### No External JS Dependencies
Only Google Fonts CDN is external. No jQuery, no utility libraries. Icons are inline SVGs (Lucide-style strokes), not emoji or icon fonts.
