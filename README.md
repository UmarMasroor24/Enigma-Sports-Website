# Enigma Sports — Website

Official website for **Enigma Sports**, a premium custom sportswear manufacturer based in Sialkot, Pakistan. The site showcases products, capabilities, and the order process for B2B clients including sports clubs, retailers, brands, schools, and distributors worldwide.

## Live Site

Deployed via **GitHub Pages** at: `https://<your-username>.github.io/<repo-name>/`

## Project Structure

```
enigma-sports-website/
├── index.html              # Main public-facing website
├── styleguide.html         # Internal brand design system (not indexed)
├── 404.html                # Custom 404 error page
├── .nojekyll               # Disables GitHub Pages Jekyll processing
├── .gitignore
├── README.md
└── assets/
    ├── css/
    │   ├── main.css        # Styles for index.html
    │   └── styleguide.css  # Styles for styleguide.html
    └── js/
        ├── main.js         # Scripts for index.html
        └── styleguide.js   # Scripts for styleguide.html
```

## Tech Stack

- **HTML5** — semantic structure
- **CSS3** — custom properties, Grid, Flexbox, responsive design (no framework)
- **Vanilla JavaScript** — mobile menu, smooth scroll, active nav on scroll
- **Google Fonts** — Bebas Neue (display), DM Sans (body)
- **No build tools** — pure static files, deploy as-is

## Deploying to GitHub Pages

1. Push this repository to GitHub
2. Go to **Settings → Pages**
3. Under **Source**, select `Deploy from a branch`
4. Choose `main` branch, `/ (root)` folder
5. Click **Save** — the site will be live within a minute

> The `.nojekyll` file ensures GitHub Pages serves the files without running Jekyll, which is important for paths starting with underscores.

## Contact Form

The enquiry form on the homepage is currently a static UI. To make it functional, integrate a form service such as [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com) — both work with static GitHub Pages sites and require no backend.

## Design

Brand design system documented in `styleguide.html`:
- **Colors:** Dark foundation (#0A0A0A) with Enigma Red accent (#C8102E)
- **Typography:** Bebas Neue for headings, DM Sans for body
- **Approach:** No prices, no cart — all CTAs lead to WhatsApp or email

## Contact

- **Email:** info@enigmasports.com
- **WhatsApp:** +92 300 123 4567
- **Location:** Sialkot, Punjab, Pakistan
