# Handoff — UC Urbanism website (updated 2026-09-02)

## Where things stand

| | State |
| --- | --- |
| Repo | `~/Claude Code Stuff/uc-urbanism-website` → GitHub **ActuallyNotAPerson/uc-urbanism-website** (private) |
| Live site | https://uc-urbanism.netlify.app — Netlify site `uc-urbanism`, auto-deploys from `main` via GitHub webhook |
| Live commit | `9b04e03` — everything below is deployed. `main` and `origin/main` were in sync after the 2026-09-02 push; this handoff commit is the only thing on top. |
| Push policy | Pushing deploys to the live site. The user decides when: push only when asked in that session. |

`npm test` after every build checks that the original club text, embeds and links are still present.
It has been edited this session to match deliberate content removals (see below), so it now
guards the *current* content, not the original Geocities/Canva copy verbatim.

## Run it

```
npm install
npm run dev      # http://localhost:4321
npm run cms      # local CMS backend; then open http://localhost:4321/admin/index.html
npm run build && npm test
```

- Claude preview config lives in the *parent* folder: `~/Claude Code Stuff/.claude/launch.json`, name `uc-urbanism`
  (runs `npm --prefix uc-urbanism-website run dev` on port 4321). There is no `.claude/` inside the repo.
- The Astro dev server 404s on `/admin/` (directory index); use `/admin/index.html` locally. Netlify serves `/admin/` fine.
- No dev server was left running at the end of the 2026-09-02 session.

## What the site is

Astro 5 static site merging the club's old Canva site (3-page structure) and Geocities site (content and look:
club blue `#007ea3`, IBM Plex Sans + Gibson via Typekit, street-network oval background, 8pm–8am night theme).
Pages: `/` About, `/connect`, `/events`, `/resources`, `/join`. Decap CMS at `/admin`; all editable content is
YAML under `src/content/` (settings, pages, leadership, affiliates). Netlify Forms handles the `/join` signup.
SEO basics, OG image, sitemap, robots.txt, favicon set. Details in README.md.

## Changes made 2026-09-02 (all live)

1. **Top bar inverted** — nav is club blue with white text by day and white with blue text at night, the opposite
   of the page. Implemented with nav-scoped CSS variables (`--nav-bg`/`--nav-fg`) in `global.css`. The nav shows
   `src/assets/urbanism-club-logo-inverted.png` (white logo, generated from the original by swapping blue↔white
   per pixel with sharp) by day and the original blue logo at night; both are rendered and toggled by CSS.
2. **Leadership photo grid** — `src/pages/index.astro` renders one circular-photo card per *person*: entries are
   grouped by name, so Michael Uhlemann's two roles show as "Education Coordinator and Strong Towns Chair".
   Photos live in `src/content/leadership/photos/*.jpg` (converted from PNGs the user supplied) and are referenced
   by an optional `photo` field (schema in `src/content.config.ts`, CMS field added). Anyone without a photo gets a
   blue initials circle — currently only **Henry Bogzevitz**.
3. **Events page** — now: "Club Events" heading → one-line intro → the Cincinnati Meetings and Events Google
   Calendar; then "General Events" heading → italic "More to come" placeholder (CMS field `more_text`). Removed:
   the old multi-source club calendar embed, the small agenda-list embed, the "most complete calendar of community
   engagement…" caption, and the "Click on the calendar below…" sentence. Content keys renamed to `club_calendar_src`.
   Note the calendar under "Club Events" is still the city-wide feed; swap the URL in the CMS when the club has its own.
4. **Resources** — SharePoint slide-deck embed removed (it demanded a sign-in). Only the Google Sheets project list
   and the "Add your project!" form link remain. Unused embed CSS variants (`embed--short`, `embed--ratio`) deleted.
5. **Connect** — Instagram embed switched from @apastudents to **@uc_urbanism**; stale Geocities referrer params dropped.
6. **Word-spacing bug fixed site-wide** — line-broken text fields (`intro_lines`, `meetings_lines`) are rendered as
   inline `<p>`s and Astro emitted no whitespace between them, so words ran together ("thecity"). Templates now
   insert an explicit space between lines.

Previous session (2026-09-01) built everything else: site, Events page, image optimization, favicon, Netlify
config, mobile fixes, CMS, Join funnel, SEO. Those were pushed live on 2026-09-02 together with the above.

## One-time actions only the site owner can do (see README for steps)

- [ ] **CMS login on production**: create a GitHub OAuth App (callback `https://api.netlify.com/auth/done`) and
      install it in Netlify → *Site configuration → Access & security → OAuth*; add board members as repo
      collaborators with Write access. Until then the Login button at `/admin` fails. (Git Gateway and Netlify
      Identity are deprecated, hence GitHub login.)
- [ ] **Netlify Forms**: enable form detection and add an email notification, or `/join` signups are silently dropped.
- [ ] Google Search Console verification (paste the token in CMS → Site settings).
- [ ] A photo for Henry Bogzevitz (upload via CMS → Leadership, or drop a file in `src/content/leadership/photos/`).

## Known content issues (deliberately left as-is)

- Typo "Builiding" in the meeting address on Connect — verbatim from Geocities.
- Leadership list is the older Geocities roster; the Canva site had a 2025-26 board.
- Instagram profile embeds depend on Instagram continuing to serve `/embed/` for profiles; if it stops rendering,
  replace with a link or a single-post embed.

## Ideas discussed but not done

- Gate `/admin` from public view: a Netlify Edge Function with basic auth on `/admin/*` (free), or Cloudflare Access
  once the club has a custom domain (per-person allow list). Netlify's built-in path protection needs the Pro plan.
- Hosting on GitHub Pages instead of Netlify is possible but loses Netlify Forms, the Decap OAuth provider, custom
  headers and redirects; recommendation was to stay on Netlify and instead create a club-owned GitHub org + add a
  second Netlify owner so the site survives board turnover.
- Custom domain; club-owned calendar; redirects from the old Canva/Geocities sites; events/projects archives.

## Tooling notes

- Netlify CLI is installed and logged in as the site owner; the folder is linked to site
  `<site id>`. `netlify api listSiteDeploys` is a quick way to check deploy state.
- `gh` is authenticated as ActuallyNotAPerson.
- `sharp` (an Astro dependency in `node_modules`) was used for one-off image work (logo inversion, PNG→JPEG); no
  extra image tooling is installed.
- Original headshot PNGs are in `~/Downloads/*_website_pic.png`; the repo copies are the source of truth now.
