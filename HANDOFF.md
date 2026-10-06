# Handoff — UC Urbanism website (updated 2026-10-06)

## Where things stand

| | State |
| --- | --- |
| Repo | `~/Claude Code Stuff/uc-urbanism-website` → GitHub **ActuallyNotAPerson/uc-urbanism-website** (private) |
| Live site | https://uc-urbanism.netlify.app — Netlify site `uc-urbanism`, auto-deploys from `main` via GitHub webhook |
| Live commit | `5889917` (2026-09-15, "Fix conversion path and accessibility foundations from design critique") — on `main` and `origin/main`, so deployed. |
| Version | **v1.5.0** in `package.json` (branch `claude/review-pdf-handwritten-changes-21947e`, not yet merged, tagged or deployed). **v1.0.0** = annotated tag on `5889917`. Tag `v1.5.0` after merging to `main`; tags are local until pushed. What changed per version: `CHANGELOG.md`. |
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
Pages (since v1.5): `/` About, `/connect` (events calendars, links, meetings), `/resources`, `/join` (mailing list).
`/events` 301s to `/connect#events` and `/join/*` (the old thank-you page) to `/join`, via `netlify.toml`. Decap CMS at `/admin`;
all editable content is YAML under `src/content/` (settings, pages, leadership, affiliates). The mailing list is a
button to a club-owned Google Form (`signup_url` in `pages/join.yml`); the site has no form handling of its own.
Netlify Forms was dropped in v1.5: form detection had never been enabled (`ignore_html_forms: true`), so no signup
was ever stored.
SEO basics, OG image, sitemap, robots.txt, favicon set. Details in README.md.

## v1.5 — board markup round (2026-10-06, not yet deployed)

Source: `~/Downloads/Changes 2-1.pdf`, a hand-marked printout of the live site (HS/LS/SS = heading/line/section
spacing; Note 1 = images full width; Note 2 = merge Events + Join into Connect — Join was merged, then split back out to its own page at the user's
request on 2026-10-06; Events stays merged). Full list in `CHANGELOG.md`. Notes:

- **Calendar**: one combined Google Calendar URL (`calendar_src` in `pages/connect.yml`, club `0c7201b7…` + external
  events `0e8049d1…`); the agenda view is the same URL + `&mode=AGENDA`, added in `connect.astro`.
- **Nav wordmark** `src/assets/urbanism-club-logo-wordmark{,-inverted}.png` was cropped from the full logo with sharp
  (rows below y=1073, trimmed, 16px padding, 1600px wide). The full logos remain as the home-page hero.
- **Affiliate logos** were re-saved with transparent backgrounds (sharp, near-white keyed out; APA's letters knocked out
  of its blue square). Night mode renders logos white with a CSS filter (`.logo-mono`); PSO has a dedicated
  `logo_night` (`pso-night.png`, two-tone white) because a solid-white PSO was an unreadable blob.
- **Instagram**: the "followers · posts" stack is Instagram's layout inside its iframe at every width — not fixable from
  our CSS; the embed now just fills the column.
- Changing a content-collection schema (`src/content.config.ts`) needs a dev-server restart; otherwise new image
  fields arrive as plain strings ("Local images must be imported").
- **Every CMS media folder must exist in git** (`public/uploads/`, `src/content/pages/images/` now carry a `.gitkeep`).
  If one is missing, the local CMS fails to open every entry in that collection with "Unknown error" (ENOENT in
  the `npm run cms` log). `public/uploads/` had been missing since the CMS was added. Also: open entries by clicking
  through from the collection list; deep-linking straight to an entry URL can fail before the CMS has loaded.

### Waiting on the board
- [ ] Colour originals of `group-park.jpg`, `campus-walk.jpg`, `club-meeting.jpg` (currently grayscale pixels).
      Replace the files in `src/assets/`; the layout already crops them to landscape at full width.
- [ ] The mailing-list Google Form link (see one-time actions below).
- [ ] A "more representative" hero graphic → CMS About → Hero image (or `hero_image:` in `pages/about.yml`).
- [ ] After deploy: `curl -I https://uc-urbanism.netlify.app/events` should 301 to `/connect#events`, and
      `/join/thanks/` to `/join`.

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
- [ ] **Mailing-list Google Form**: create it from a shared club account and paste its link into CMS → Pages →
      Join page → Google Form link (steps in README). Until then the page shows the GroupMe button.
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
- Hosting on GitHub Pages instead of Netlify is possible but loses the Decap OAuth provider, custom
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
