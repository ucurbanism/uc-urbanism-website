# Handoff — UC Urbanism website (updated 2026-11-16, public release)

## Where things stand

| | State |
| --- | --- |
| Repo | GitHub **mjs06-git/uc-urbanism-website** (public; code under MIT, club content reserved: see `LICENSE` and `LICENSE-CONTENT.md`). Who needs which access: README, "Taking over the site". Formerly `ActuallyNotAPerson/uc-urbanism-website`: the account was renamed by 2026-10-28. GitHub redirects the old name only until someone claims it, so use the new one everywhere (git remote, Netlify and the CMS config already do). |
| Live site | https://uc-urbanism.netlify.app — Netlify site `uc-urbanism`, auto-deploys from `main` via GitHub webhook |
| Live version | **v1.6.2** (merge of PR #5, deployed and checked 2026-10-20: one-hop `/join` and `/events` redirects, Join pill glides on Connect without a reload). Same day: v1.6.1 = PR #4, v1.6.0 = PR #3. |
| Tags | Annotated, all pushed: `v1.6.2`, `v1.6.1`, `v1.6.0`, `v1.5.1`, `v1.5.0`, `v1.0.0`. `package.json` matches the latest tag. Per-version changes: `CHANGELOG.md`. |
| Push policy | Pushing `main` deploys to the live site. The user decides when: push only when asked in that session. |
| Not live | v1.7.0 (host-agnostic build: Netlify, Cloudflare Pages, Vercel, GitHub Pages; PR #8) was merged and then reverted. The work is on branch `claude/v1.7.0-host-agnostic`. |

`npm run build && npm test` is the check before every push. `scripts/check-fidelity.mjs` verifies that the club's
text, embeds and links are on the right pages, and that retired pages (`/events`, `/join`, `/join/thanks`) are not built
again.
It guards the *current* content (it has been updated for every deliberate removal), not the original Geocities/Canva
copy verbatim.

## Run it

```
npm install
npm run dev      # http://localhost:4321
npm run cms      # local CMS backend; then open http://localhost:4321/admin/index.html
npm run build && npm test
```

- Claude Code: shared permissions are in `.claude/settings.json` (build, test and dev commands run without a prompt;
  `git push` always asks, because pushing `main` deploys).
- Local CMS: the Astro dev server 404s on `/admin/`, so use `/admin/index.html`. Open entries by clicking through from
  a collection list; deep-linking straight to an entry URL can fail before the CMS has loaded.
- Changing a content-collection schema (`src/content.config.ts`) needs a dev-server restart; otherwise new image
  fields arrive as plain strings ("Local images must be imported").

## What the site is

Astro 5 static site merging the club's old Canva site (structure) and Geocities site (content and look: club blue
`#007ea3`, IBM Plex Sans + Gibson via Typekit, street-network oval background, 8pm–8am night theme). Decap CMS at
`/admin`; all editable content is YAML under `src/content/` (settings, pages, leadership, affiliates). SEO basics,
OG image, sitemap, robots.txt, favicon set. Details in README.md.

| Page | What's on it |
| --- | --- |
| `/` About Us | Hero (logo, or the CMS `hero_image` once set), lede + CTAs, taglines, group photo on the map background, About / What is Urbanism / Goals, affiliate logo tiles, leadership grid, closing CTA |
| `/connect` | Intro → QR codes → Join the mailing list (`#join`: mailing-list pill + GroupMe pill, see below) → Events (combined Google Calendar: agenda list, then month grid) → Instagram → Meetings |
| `/resources` | Proposals, Projects, and Plans spreadsheet, then the "Add your project!" Google Form link |
| `404` | Branded "This page isn't here yet" page with home + GroupMe buttons (CMS-editable, noindex) |

Redirects (`netlify.toml`): `/events` and `/events/*` → `/connect/#events`; `/join` and `/join/*` (incl. the retired
`/join/thanks/`) → `/connect/#join` (v1.6 merged Join into Connect). **Netlify splat gotcha:** `from = "/x/*"` also matches `/x`, so never point a `/x/*` rule at `/x` (that was
the v1.5.0 bug: the rule silently never fired).

**Mailing list.** The site collects no emails itself. Netlify Forms was removed in v1.5: form detection had never
been enabled (`ignore_html_forms: true`, zero forms registered), so no signup was ever stored. The plan is a
club-owned Google Form: paste its link into CMS → Pages → Connect → Join section: Google Form link (`signup_url` in
`pages/connect.yml`) and the "Join the mailing list" pill opens it. **Until then the pill deliberately goes to the 404
page** (user's request, as a placeholder) and the page points people to the GroupMe.

## v1.6 — Join merged into Connect, spacing normalized (live)

Connect is now intro → QR codes → Join the mailing list (`#join`) → Events → Instagram → Meetings, and the nav's Join
pill goes to `/connect/#join`. Full list in `CHANGELOG.md`. Implementation notes:

- **Join content** lives in `pages/connect.yml` (`join_*`, `signup_*`, `privacy_note`); there is no `join.yml` any more.
- **Text links** under the QR codes are filtered in `connect.astro`: one whose label matches a QR label isn't shown.
- **Spacing/type tokens** in `global.css`: `--text-sm/-lg/-h1/-h2/-h3` (rem) and `--leading`/`--leading-tight`. Every
  heading has `margin-bottom: --space-2`, and a rule near the end of the content-block styles zeroes the top margin of
  grids/embeds/figures that directly follow a heading, so nothing sits further from its heading than text does.
- **Smooth scrolling is switched on after `load`** (`.smooth-scroll` class added by an inline script in
  `Base.astro`). With `scroll-behavior: smooth` on from the start, Chrome dropped the jump to a `#section` when another
  page linked there, so the Join pill opened Connect at the top (v1.6.0 shipped with that; fixed in v1.6.1). Test a
  cross-page anchor link by *clicking* it: typing a `#` address into the bar worked even with the bug.
- **Internal links end in a slash** (`/connect/`, `/resources/`, `/connect/#join`): Netlify serves pages at `/<name>/`
  and 301s `/<name>` there, which cost a redirect on every click and made the Join pill on Connect reload the page
  instead of scrolling (v1.6.2). `npm test` fails on a link to a page without the slash. `/404` is a file, so it
  stays slashless.

## v1.5 — board markup round (live)

Source: a hand-marked printout of the 2026-09-02 site (HS/LS/SS = heading/line/section
spacing; Note 1 = images full width; Note 2 = merge Events + Join into Connect). Events was merged; Join was merged
and then split back out to its own page at the user's request. Full list in `CHANGELOG.md`. Implementation notes:

- **Calendar**: one combined Google Calendar URL (`calendar_src` in `pages/connect.yml`: club calendar `0c7201b7…` +
  external-events calendar `0e8049d1…`; the old third calendar `33affcee…` was dropped). The agenda view is the same
  URL + `&mode=AGENDA`, appended in `connect.astro`.
- **Nav wordmark** `src/assets/urbanism-club-logo-wordmark{,-inverted}.png` was cropped from the full logo PNGs with
  sharp (rows below y=1073, trimmed, 16px padding, 1600px wide). The full logos remain as the home-page hero.
- **Affiliate logos** were re-saved with transparent backgrounds (near-white keyed out; APA's letters knocked out of
  its blue square). At night logos render white via a CSS filter (`.logo-mono`); PSO has a dedicated `logo_night`
  (`pso-night.png`, two-tone white) because solid white turned it into a blob. New logos should be transparent PNGs
  or SVGs (the CMS hint says so).
- **Spacing** uses the existing `--space-*` scale: sections `--space-6`, blocks `--space-4`, text `--space-2/1`.
  Both `.hero` blocks have symmetric padding, which also keeps the map background centred.
- **Every CMS media folder must exist in git** (`public/uploads/` and `src/content/pages/images/` carry a `.gitkeep`).
  If one is missing, the local CMS fails to open every entry in that collection with "Unknown error" (ENOENT in the
  `npm run cms` log). `public/uploads/` had been missing since the CMS was added.
- **Instagram**: the profile embed stacks "followers · posts" on separate lines at every width; that layout is inside
  Instagram's iframe and can't be changed from our CSS. The embed fills the column.

## Waiting on the board

- [ ] **Mailing-list Google Form**: create it from a shared club account (one required "Email" question with email
      validation; link responses to a Sheet), then paste the `forms.gle` link into CMS → Pages → Connect (Join section). If made
      under a uc.edu account, turn off "Restrict to users in University of Cincinnati". Steps in README.
- [ ] **Colour originals** of `group-park.jpg`, `campus-walk.jpg`, `club-meeting.jpg` (currently grayscale pixels).
      Replace the files in `src/assets/`; the layout already crops them to landscape at full width.
- [ ] **Hero graphic**: the markup asked for a "more representative graphic" than the skyline logo. Upload via
      CMS → About → Hero image (or set `hero_image:` in `pages/about.yml`, file in `src/content/pages/images/`).
- [ ] A photo for Henry Bogzevitz (CMS → Leadership, or a file in `src/content/leadership/photos/`).

## One-time actions only the site owner can do (see README for steps)

- [ ] **CMS login on production.** Nobody can log in at `/admin` on the live site yet. Create a GitHub OAuth App
      (callback `https://api.netlify.com/auth/done`) and install it in Netlify → *Site configuration → Access &
      security → OAuth*. Checked 2026-10-06: Netlify's auth endpoint for the site returned 404 (consistent with no
      provider), and the repo's only collaborator is its owner, `mjs06-git` (formerly `ActuallyNotAPerson`; still true 2026-10-28). Add board members as collaborators with
      Write access; each needs their own GitHub account. There is no username/password; login is GitHub only.
- [ ] Google Search Console verification (paste the token in CMS → Site settings).

## Known content issues (deliberately left as-is)

- Typo "Builiding" in the meeting address on Connect — verbatim from Geocities.
- Leadership list is the older Geocities roster; the Canva site had a 2025-26 board.
- Instagram profile embeds depend on Instagram continuing to serve `/embed/` for profiles; if it stops rendering,
  replace with a link or a single-post embed.
- The Join section on Connect is deliberately minimal (heading, one sentence, two pills), right below the QR codes.

## Ideas discussed but not done

- Move the repo to a club-owned GitHub organization and add a second Netlify owner, so the site and CMS access
  survive board turnover (today everything hangs off the user's personal accounts).
- Gate `/admin` from public view: a Netlify Edge Function with basic auth on `/admin/*` (free), or Cloudflare Access
  once the club has a custom domain. Netlify's built-in path protection needs the Pro plan. (Saving already
  requires GitHub write access; only the page itself is public.)
- Staying on Netlify was the recommendation over GitHub Pages (which loses the Decap OAuth provider, headers and
  redirects).
- Custom domain; redirects from the old Canva/Geocities sites; events/projects archives.

## Tooling notes

- With the Netlify CLI logged in as the site owner and the checkout linked (`netlify link`),
  `netlify api listSiteDeploys --data '{"site_id":"…"}'` shows deploy state; `netlify api listSiteForms` confirmed no
  forms are registered.
- The repo has no CI checks; Netlify is the only build.
- `sharp` (an Astro dependency in `node_modules`) does all one-off image work (logo inversion, wordmark crop,
  transparent affiliate logos, PNG→JPEG); no extra image tooling is installed.
- The headshots in the repo are the source of truth; the original PNGs are not kept anywhere shared.

## History

- **2026-09-01** — site built: Astro merge of the Canva + Geocities sites, image optimization, favicon, Netlify
  config, mobile fixes, Decap CMS, Join funnel, SEO.
- **2026-09-02** — nav bar inverted (nav-scoped `--nav-bg`/`--nav-fg` variables; white logo by day, blue at night),
  leadership photo grid grouped per person, Events trimmed, SharePoint embed removed from Resources, Instagram
  switched to @uc_urbanism, word-spacing fix for line-broken text (templates insert an explicit space between lines).
- **2026-09-15** — design-critique fixes (lede, CTAs, figcaptions, closing CTA, spacing scale, accessibility) →
  tagged v1.0.0.
- **2026-10-06** — v1.5.0 / v1.5.1 (see above and `CHANGELOG.md`).
- **2026-10-20** — v1.6.0: Join merged into Connect below the QR codes, doubled QR text links removed, spacing and
  type normalized; v1.6.1 fixes cross-page `#section` links; v1.6.2 makes internal links end in a slash (see above).
