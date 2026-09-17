# The Gutter Guys® — Delaware County, PA (Website Redesign)

A complete, from-scratch redesign of the website for **The Gutter Guys® of Delaware County,
Pennsylvania** — a full-service rain gutter company in business since 1988, locally owned and
operated by Buddy Witz and Allison Orsini.

Built as a single-page, static site with **vanilla HTML, CSS and JavaScript** — no build step,
no dependencies, no frameworks.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Entry point — all page sections, semantic markup, meta tags, JSON-LD business schema |
| `styles.css` | Full design system: tokens, layout, components, responsive rules |
| `script.js` | Mobile nav, sticky header, scroll reveals, active nav tracking, form validation |
| `favicon.svg` | Inline-drawn SVG favicon (roofline + gutter + downspout mark) |

## Running it

No tooling required — open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Page sections

1. **Utility bar** — service note plus toll-free number (1-800-GUTTER-1®)
2. **Sticky header** — logo, anchor nav, call + free-estimate CTAs, mobile drawer
3. **Hero** — headline, owner intro, call/quote CTAs, credibility stat strip
4. **Trust strip** — HomeAdvisor award badges (100+ Reviews, 10 Year, Top Rated)
5. **Services** — GutterGard™ guards, cleaning, installation, repairs, half-round, copper, trim & soffit
6. **Why it matters** — the damage clogged gutters cause (rot, foundation cracks, landscaping, mold)
7. **Why The Gutter Guys** — ceramic-screw installs, 25+ colors, local owners, awards, coverage, hours
8. **Meet the owners** — Buddy Witz and Allison Orsini bios
9. **Community** — Toys for Tots, Habitat for Humanity, Breast Cancer Awareness, Boys & Girls Scouts
10. **Service area** — Delco towns plus PA / NJ / DE / MD coverage and the Newport, DE office
11. **Contact** — phone numbers, address, business hours, and a validated free-estimate form
12. **Final CTA + footer** — service links, quick links, contact details, legal links

## Contact details used

- **Toll free:** 1-800-GUTTER-1® / 1-800-488-8371
- **Local (fast free estimate):** +1 (302) 683-9385
- **Address:** 1 Old Mill Lane, Newport, DE 19804
- **Hours:** Mon–Fri 8:00 AM – 5:00 PM · Sat 8:00 AM – Noon

## Notes on implementation

- **Images.** Original brand and business assets are reused as-is: the company logos, the authentic
  photo of owners Buddy Witz and Allison Orsini, and the three HomeAdvisor award badges. All other
  photography is section-specific stock sourced from Pexels (roofline, gutter cleaning, installation,
  repair, half-round, copper drainpipe, trim & soffit, storm overflow, and a Pennsylvania roofline
  shot for the service-area block).
- **Form.** The estimate form validates on the client and confirms in-page. It is a static site with
  no backend, so the confirmation directs visitors to the published phone numbers; no data is sent
  anywhere.
- **No FAQ section** — the source content contained no question-and-answer material to carry over.
- **Accessibility.** Skip link, landmark elements, labelled form controls, `aria-live` status
  messaging, visible focus rings, and a `prefers-reduced-motion` fallback.
