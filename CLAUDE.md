# CLAUDE.md — technical conventions for this repo

Professional website for Dra. Natalia Asquino, periodoncista, with practices in Montevideo and Punta del Este.

This file covers how to work **on the code in this repository**. It is the technical reference; read it before making changes.

---

## Stack

- **Astro** (static output) + **Tailwind CSS**.
- Tailwind runs through **PostCSS** (`postcss.config.mjs`), not an Astro integration. `@astrojs/tailwind` was dropped in the Astro 7 upgrade — it peers at `astro ^3 || ^4 || ^5` and has no Astro 6/7-compatible release. Tailwind is pinned to the **3.x LTS** line; moving to Tailwind 4 is a separate, deliberate migration (it relocates the palette tokens below into CSS-first `@theme` blocks).
- **Content:** Markdown collections under `src/content/`.
- **Hosting:** GitHub Pages, custom domain `dranataliaasquino.com.uy`.
- **No backend, no forms, no booking integration.** Contact is `mailto:` and `wa.me/` only. GitHub Pages is static-only; keeping it that way is what makes the site free, fast, and low-maintenance.

## Commands

Requires Node 22.12+ (the deploy workflow pins Node 22). Astro 6 raised the floor from Node 20; the build will not run on older versions.

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at http://localhost:4321 |
| `npm run build` | Static build into `./dist/` |
| `npm run preview` | Preview the build locally |

**`npm run build` must pass before any PR.** Expected output: **23 pages**. If the count changes, something was added or broken — find out which before proceeding.

## Deploy model — never push to main

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages **on every push to `main`**. A push to `main` is a publication to the live site.

- **Never commit or push to `main` directly.**
- All changes go through a **draft PR**, reviewed by Federico, who merges.
- Deploy takes 2–3 minutes after merge.

## Single source of truth

`src/site.config.ts` holds contact info, locations, navigation, and the `LIVE` flag. Edit values there — they propagate to every page, including the JSON-LD. **Never hardcode addresses, phone numbers, or hours in individual pages.**

`LIVE` is the master visibility switch (currently `true`): when `false`, every page emits `noindex, nofollow` and analytics is not injected. Note `public/robots.txt` is static and does **not** follow `LIVE` — it has to be edited by hand.

## Known non-issues — do not "fix" these

Two things look like defects and are not. Both have been investigated; please don't spend a maintenance cycle rediscovering them.

**1. The `casos` collection is declared but intentionally empty.**
`src/content.config.ts` declares a `casos` collection with no `src/content/casos/` directory, so every build prints:

```
[WARN] [glob-loader] The base directory "/abs/path/to/src/content/casos/" does not exist.
```

This is **by design**. The collection is a forward declaration for planned clinical-cases work: no page queries it yet, `src/pages/casos/index.astro` is a static `noindex` placeholder, and the privacy page is already written around the policy. The warning is cosmetic and honestly reports a pending feature.

Do not attempt to silence it. In particular, **creating an empty placeholder folder does not work** — it only changes the message to `No files found matching "**/*.md,!**/_*/**/*.md,!**/_*.md"`. An underscore-prefixed `_ejemplo.md` does not work either, since the glob excludes `_*.md`. Only a real `.md` case file will silence it, and that should be a real case, not a fabrication.

**2. `udelar.edu.uy` fails automated link checks but is correct.**
Used as the `alumniOf` URL in the JSON-LD on `/sobre-natalia/`. Automated checkers report it as unreachable (curl exit code `000`). The link is **fine**: their server sends only the leaf certificate and omits the intermediate, so strict clients cannot build a chain to the issuer (Abitab/IDdigital, a Uruguayan CA absent from most default trust stores). Browsers normally recover via AIA fetching. Verify with `curl -k` before concluding anything actually changed. **Known false positive — do not change the URL.**

## Content policy

- **Language:** Spanish (es-UY) only. No i18n infrastructure.
- **Tone:** professional but warm; clinical authority without coldness. No marketing fluff, no exclamation marks, no emojis, no English loanwords where Spanish equivalents exist.
- **Headings:** always serif, sentence case — never Title Case, never ALL CAPS.
- **Editorial:** `%` rather than "por ciento"; always "Dra. Asquino", abbreviated; spell out one to nine, numerals from 10 up.
- **Alt text:** always descriptive Spanish, never "imagen" or empty.
- **Clinical cases must be non-identifiable** — radiographs, diagrams, intraoral images without facial features. No patient names, no identifying images. Because nothing identifiable is published, no signed-consent process exists; publishing an identifiable image would void that and require building one first. `privacidad.astro` states this publicly.
- **No testimonials.** Ethically sensitive in dentistry.
- **Never promise a publication cadence** anywhere on the site.

## Design system

Palette "Sage & Sand" — tokens in `tailwind.config.mjs`:

- `cream` `#F4F1EA` — page background
- `sage-100` `#DDE5D6` — soft surfaces, panels
- `sage-600` `#5C6B58` — secondary text, links
- `sage-900` `#2E3A2C` — headings, primary text

The WhatsApp **button** uses the dark brand color `#075E54` for WCAG AA contrast (6.5:1; the bright `#25D366` gives 1.9:1 on white). The WhatsApp **icon** SVG keeps `#25D366` — icons are exempt from text-contrast rules and it preserves brand recognition.

Type: Inter (sans, body) + Source Serif 4 (serif, headings), via Google Fonts. No gradients, no shadows, no rounded photos — flat, clean, sober. Use the `Section` component with `padding="lg"` for top-level sections.

## Content workflow

**Drafts live outside this repo**, on the Cowork OS side (OneDrive), where Natalia can reach and edit them. The repo receives Markdown, never Word.

1. Natalia drafts in Word, in the Cowork `content-drafts/` folder.
2. Federico approves.
3. The draft is converted to Markdown, given front-matter, and written into `src/content/articulos/` (or `casos/`).
4. **The `.docx` never moves or gets copied into the repo.** It stays on the Cowork side.

Article front-matter is validated by `src/content.config.ts` — a missing field fails the build:

```markdown
---
title: "Cómo tener una correcta higiene bucal"
description: "Resumen breve; se usa en la lista y en la meta description."
pubDate: 2026-05-14
audience: pacientes   # pacientes | colegas
draft: false          # true excludes it from the build
---
```

The filename is the slug: `higiene-bucal.md` → `/articulos/higiene-bucal/`.

## Weekly maintenance routine

A cloud agent runs a maintenance pass every Monday and opens a **draft PR**. Scope: **safe fixes only** (dependency patch/minor bumps, `npm audit fix` at lockfile level, build check, internal link scan). Anything needing judgment — a semver-major upgrade, a content change, an ambiguous link — is reported in the PR body for Federico, not applied.

**The cloud sandbox has no open network egress**, so it cannot verify external links; only an allowlist (npm and similar) is reachable. External-link liveness must be checked from a local run with open network access. See the `udelar.edu.uy` note above before reporting link failures.

## Commit conventions

- **English**, always — subject and body, whatever the change touches.
- **Imperative mood, specific subject.** Good: `Fix CSS @import order warning`. Bad: `Updates`, `Fix`, `Cambios`.
- **Subject ≤72 characters.** Detail goes in the body.
- **One commit = one logical change.** An article edit and a nav change are two commits.
- **Never commit half-finished work.**

## Settled decisions — do not relitigate without a trigger

1. **Stack = Astro.** Not WordPress, Wix, Squarespace, or Webflow.
2. **Hosting = GitHub Pages.** Not Netlify or Vercel.
3. **Spanish only.**
4. **No booking integration**, and the site has no relationship with any booking product.
5. **Palette = Sage & Sand.**
6. **Clinical cases: non-identifiable material only** — no consent infrastructure required.
7. **Analytics = Umami Cloud**, cookieless, so no consent banner. GA4 was rejected as overkill for an informational site. The script is injected only when `LIVE === true`, so dev traffic never pollutes metrics.
8. **Sitemap drops `lastmod`** on purpose (see the comment in `astro.config.mjs`): the site is evergreen and institutional, and we don't want Google surfacing a build date as a publication date.
9. **No per-city landing pages.** The single `/consultorios/` page covers both cities; the Maps pack already serves per-city intent.
