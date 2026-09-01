# Handoff — UC Urbanism website (session of 2026-09-01)

## Where things stand

| | State |
| --- | --- |
| Repo | `~/Claude Code Stuff/uc-urbanism-website` → GitHub **ActuallyNotAPerson/uc-urbanism-website** (private) |
| Live site | https://uc-urbanism.netlify.app — Netlify site `uc-urbanism`, auto-deploys from `main` via GitHub webhook |
| Live commit | `73cbd23` (initial site + Events page + image optimization + favicon + Netlify config) |
| **Local, NOT pushed** | `aeac31b` mobile layout fixes · `0a05717` CMS + content collections, Join funnel, share cards/sitemap. `git push` publishes both. |

Everything visible on the site is verbatim from the two old sites (Canva + Geocities). `npm test` proves it after every build.

## Run it

```
npm install
npm run dev      # http://localhost:4321  (Claude preview config: .claude/launch.json → "uc-urbanism")
npm run cms      # local CMS backend; then open http://localhost:4321/admin/index.html
npm run build && npm test
```
The Astro dev server 404s on `/admin/` (directory index); use `/admin/index.html` locally. Netlify serves `/admin/` fine.

## What was built this session

1. **Site** — Astro 5 static site merging the Canva site's 3-page structure with all Geocities content; Geocities look (club blue `#007ea3`, IBM Plex Sans + Gibson via Typekit, street-network oval, 8pm–8am night theme). Leadership list = Geocities version (Canva 2025-26 board omitted by choice).
2. **Events page** — "Club Events" (Canva calendar embed as placeholder for a future club calendar) + "General Events" (the two Cincinnati Meetings and Events calendars).
3. **Performance** — images via `astro:assets` (homepage ~15 MB → <1 MB), lazy embeds, favicon set (theme-aware SVG + ico + apple-touch).
4. **Netlify** — site created, linked to repo (deploy key `6a9721c2443aba0a27062684`, GitHub webhook `673251027`), `netlify.toml` with Node 22, asset caching, security headers. Team default "Netlify login" protection was turned off **for this site only**.
5. **Mobile** — flowed the Geocities line-broken paragraphs, usable embed heights on phones, unclipped Instagram embed, wrapping nav.
6. **CMS** — Decap at `/admin`; content in `src/content/` (settings, pages, leadership, affiliates). Verified end-to-end in local mode.
7. **Join funnel** — nav "Join" button → `/join` (Netlify Forms signup + join links).
8. **SEO** — descriptions, canonical, OG/Twitter cards (`public/og-image.png`), sitemap, robots.txt, CMS field for Search Console token.

## One-time actions only the site owner can do (see README for steps)

- [ ] `git push` when ready to go live with the local commits.
- [ ] **CMS login on production**: create GitHub OAuth App (callback `https://api.netlify.com/auth/done`) and install it in Netlify → *Access & security → OAuth*; add board members as repo collaborators. (Git Gateway is deprecated, hence GitHub login.)
- [ ] **Netlify Forms**: enable form detection + add an email notification, or signups are silently dropped.
- [ ] Google Search Console verification (paste token in CMS → Site settings).

## Known content issues (flagged, deliberately left as-is)

- SharePoint slide embed on Resources asks visitors to sign in (document permissions).
- Club calendar embed shows "events from one or more calendars could not be shown" (a private feed).
- Instagram embed on Connect shows **@apastudents**, not the club — copied verbatim from Geocities.
- Typo "Builiding" in the meeting address — verbatim from Geocities.
- Leadership list is the older Geocities one; the Canva site had a 2025-26 board.

## Ideas discussed but not done

Club-owned GitHub org + shared Netlify ownership (survive turnover) · custom domain · consolidate calendars into one club-owned calendar and host the slide deck as a PDF · redirect the old Canva/Geocities sites here · content collections for events/projects archives.

## Tooling notes

- Netlify CLI is installed and logged in as the site owner; folder is linked to site `<site id>`.
- `gh` is authenticated as ActuallyNotAPerson.
- Source captures of the old sites (HTML, extracted text, all Canva media) live only in this session's scratchpad; the repo has everything that matters.
