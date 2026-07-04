# Enigma Sports — Website

Official website for **Enigma Sports**, a premium B2B custom sportswear manufacturer based in Sialkot, Pakistan. The site showcases products, production capabilities, and the order process for clients including sports clubs, retailers, brands, universities, and distributors worldwide.

The current site is a **2026 redesign** — a single-page, dark, Awwwards-style experience. No build system, no framework, no package manager: pure HTML5, CSS3, and vanilla JavaScript.

## Live Site

Deployed via **GitHub Pages**, served directly from the repository root at:
`https://<your-username>.github.io/<repo-name>/`

## Project Structure

```
enigma-sports-website/
├── index.html              # Main public site (2026 redesign, single page)
├── index_old.html          # Previous version, kept as backup
├── styleguide.html         # Internal brand design system for the OLD site (not public)
├── 404.html                # Custom 404 error page (uses main.css)
├── .nojekyll               # Disables GitHub Pages Jekyll processing
├── README.md
├── CLAUDE.md               # Guidance for Claude Code
└── assets/
    ├── css/
    │   ├── style.css       # All styles for the redesigned index.html
    │   ├── main.css        # Styles for index_old.html and 404.html
    │   └── styleguide.css  # Styles for styleguide.html
    ├── js/
    │   ├── site.js         # Interactions for the redesigned index.html
    │   ├── main.js         # Scripts for index_old.html
    │   └── styleguide.js   # Tab switching for styleguide.html
    └── img/                # Placeholder mockup images (themed SVGs) + favicon.svg
```

The single-page site runs: hero → products → **lookbook** (jersey mockup gallery) → process → why → capabilities → customisation → testimonials → FAQ → contact.

## Tech Stack

- **HTML5** — semantic, single-page structure
- **CSS3** — custom properties (design tokens), Grid, Flexbox, fully responsive; no framework
- **Vanilla JavaScript** — preloader, custom cursor, scroll reveals, stat counters, active-nav tracking, FAQ accordion, mobile menu (see `assets/js/site.js`)
- **Google Fonts** — `Anton` (display headings), `Space Grotesk` (body/UI), `Instrument Serif` (italic accents)
- **No build tools, no dependencies** — only the Google Fonts CDN is external. Icons are inline SVGs.

## Design

- **Colors:** near-black foundation (`#0A0A0B`) with two accents — **Enigma Red** (`#E8112D`) for *actions* (buttons, links, hovers) and **Volt green** (`#D9FF3F`) for *information* (numbers, tags, stats, list icons).
- **Typography:** condensed uppercase `Anton` headings (solid white + outlined), `Space Grotesk` for body.
- **Approach:** no prices, no cart — all CTAs lead to the enquiry form, WhatsApp, or email.

Full design tokens and rules are documented in `CLAUDE.md`. `styleguide.html` documents the brand system for the *old* site and is not part of the redesign.

## Development

No build step. Open `index.html` directly in a browser, or run any static file server:

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

## Deploying to GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Source**, select `Deploy from a branch`.
4. Choose the `master` branch, `/ (root)` folder.
5. Click **Save** — the site goes live within a minute.

> The `.nojekyll` file ensures GitHub Pages serves files without running Jekyll, which matters for paths starting with underscores.

## Placeholder Images

Everything in `assets/img/` is a themed SVG placeholder named for its slot (`product-football.svg`, `about-main.svg`, `capability-facility.svg`, …). To go live with real photography, replace the file with a real photo and update the `src` extension in `index.html`. The CSS uses `object-fit: cover`, so any aspect ratio works.

## Contact Form

The enquiry form on the homepage is currently **UI-only** — submitting shows a note directing visitors to WhatsApp or email. To make it functional, integrate a static-friendly form service such as [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com); both work on GitHub Pages with no backend.

## Contact

- **Email:** info@enigmasports.com
- **WhatsApp:** +92 300 123 4567
- **Location:** Sialkot, Punjab, Pakistan
