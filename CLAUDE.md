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
- `index.html` — main public website (single page, ~43 KB)
- `styleguide.html` — internal brand design system (tab-based, not public-facing)
- `404.html` — custom error page using `main.css`
- `assets/css/main.css` — all styles for `index.html`
- `assets/css/styleguide.css` — styles for `styleguide.html`
- `assets/js/main.js` — 36-line script: mobile menu toggle, smooth scroll, IntersectionObserver for active nav
- `assets/js/styleguide.js` — 14-line script: tab switching for styleguide

### Design Tokens (CSS custom properties on `:root`)
| Variable | Value | Usage |
|---|---|---|
| `--bg` | `#0A0A0A` | Page background |
| `--surface` | `#111111` | Card/section backgrounds |
| `--elevated` | `#1A1A1A` | Modal/overlay surfaces |
| `--border` | `#1E1E1E` | Borders |
| `--accent` | `#C8102E` | Primary CTA, highlights (Enigma Red) |
| `--text-primary` | `#F0EDE8` | Body text |
| `--text-secondary` | `#B0ABA6` | Muted text |
| `--text-muted` | `#6E6A66` | Faint/disabled text |

### Typography
- **Display/headings**: `Bebas Neue` (Google Fonts CDN)
- **Body/UI**: `DM Sans` weights 300–700 (Google Fonts CDN)

### Responsive Breakpoints
- `≤1024px` — tablet: 2-column grids collapse, hero visuals hidden
- `≤768px` — mobile: hamburger menu, single column, reduced padding
- `≤480px` — small mobile: stacked CTAs, tighter spacing

### Navigation & Routing
All navigation uses `#anchor` links — no client-side router. The IntersectionObserver in `main.js` adds `.active` to nav links as sections scroll into view (threshold: 0.4).

### Contact/Forms
The contact form in `index.html` is UI-only. README notes Formspree or Web3Forms as integration options — no backend is currently wired up.

### No External JS Dependencies
Only Google Fonts CDN is external. No jQuery, no utility libraries.
