# Handoff — UC Urbanism website (updated 2026-10-28, v1.7 host-agnostic branch)

## Where things stand

| | State |
| --- | --- |
| Repo | `~/Claude Code Stuff/uc-urbanism-website` → GitHub **mjs06-git/uc-urbanism-website** (private). Formerly `ActuallyNotAPerson/uc-urbanism-website`: the account was renamed by 2026-10-28. GitHub redirects the old name only until someone claims it, so use the new one everywhere (git remote, Netlify and the CMS config already do). |
| Live site | https://uc-urbanism.netlify.app — Netlify site `uc-urbanism`, auto-deploys from `main` via GitHub webhook |
| Live version | **v1.6.2** (`04b2157`, merge of PR #5, deployed and checked 2026-10-20: one-hop `/join` and `/events` redirects, Join pill glides on Connect without a reload). Same day: v1.6.1 = PR #4 (`04974f3`), v1.6.0 = PR #3 (`00d3e98`). |
| Tags | Annotated, all pushed: `v1.6.2` (`04b2157`), `v1.6.1` (`04974f3`), `v1.6.0` (`00d3e98`), `v1.5.1`, `v1.5.0` (`31e04b5`), `v1.0.0` (`5889917`). `package.json` matches the latest tag. Per-version changes: `CHANGELOG.md`. |
| In progress | **v1.7.0, host-agnostic build**, on branch `claude/host-agnostic-build` (pushed, no PR, not merged, not tagged). `main` and the live site are still v1.6.2. See the v1.7 section below. |
| Push policy | Pushing `main` deploys to the live site. The user decides when: push only when asked in that session. Other branches don't deploy (Netlify builds `main` only). |
| Left running | Nothing. The v1.7 session stopped its preview, Cloudflare-emulator, dev and CMS servers. Two Netlify *draft* deploys from that session remain (`host-agnostic-check--uc-urbanism.netlify.app`, `host-agnostic-check2--…`); they are not production and can be deleted in Netlify → Deploys. |

`npm run build && npm test` is the check before every push. `scripts/check-fidelity.mjs` verifies that the club's
text, embeds and links are on the right pages, that the retired pages (`/events`, `/join`, `/join/thanks`) are built
only as forward pages to the right Connect section, that `_headers`/`_redirects` reach `dist/`, and that `robots.txt`
and the canonical links agree on the site address.
It guards the *current* content (it has been updated for every deliberate removal), not the original Geocities/Canva
copy verbatim.

## Run it

```
npm install
npm run dev      # http://localhost:4321
npm run cms      # local CMS backend; then open http://localhost:4321/admin/index.html
npm run build && npm test
```

- Claude preview config for the main checkout lives in the *parent* folder: `~/Claude Code Stuff/.claude/launch.json`,
  name `uc-urbanism` (runs `npm --prefix uc-urbanism-website run dev` on port 4321). The repo has no `.claude/`.
  The v1.5 work was done in a worktree (`.claude/worktrees/review-pdf-handwritten-changes-21947e`) with its own
  untracked launch config `uc-urbanism-v1.5` on port 4331; that branch is merged and can be deleted.
  The v1.6 work was done in `.claude/worktrees/22x6-pixel-art-9777fd` (untracked launch config
  `uc-urbanism-connect-join`, port 4341); its branches (`claude/connect-join-page-redesign-4d8807`,
  `claude/fix-anchor-landing`, `claude/trailing-slash-links`) are merged and can be deleted.
  The v1.7 work was done in `.claude/worktrees/website-hosting-alternatives-4b1fa7` on `claude/host-agnostic-build`,
  with an untracked launch config holding `uc-urbanism-host-preview` (`npm run preview`, port 4351),
  `uc-urbanism-host-cloudflare` (`npx wrangler@4 pages dev dist`, port 8788), `uc-urbanism-host-dev` (port 4352) and
  `uc-urbanism-host-cms` (`npm run cms`, port 8081).
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

Redirects: `/events` → `/connect/#events`; `/join` and the retired `/join/thanks/` → `/connect/#join` (v1.6 merged
Join into Connect). Through v1.6 they lived in `netlify.toml`; v1.7 builds them as forward pages (`redirects` in
`astro.config.mjs`) plus real 301s in `public/_redirects` and `vercel.json` (details in the v1.7 section). **Netlify
splat gotcha:** `/x/*` also matches `/x`, so never point a `/x/*` rule at `/x` (that was the v1.5.0 bug: the rule
silently never fired).

**Mailing list.** The site collects no emails itself. Netlify Forms was removed in v1.5: form detection had never
been enabled (`ignore_html_forms: true`, zero forms registered), so no signup was ever stored. The plan is a
club-owned Google Form: paste its link into CMS → Pages → Connect → Join section: Google Form link (`signup_url` in
`pages/connect.yml`) and the "Join the mailing list" pill opens it. **Until then the pill deliberately goes to the 404
page** (user's request, as a placeholder) and the page points people to the GroupMe.

## v1.7 — host-agnostic build (branch `claude/host-agnostic-build`, not merged)

`dist/` no longer needs Netlify. Hosting setup per host is in the README (Hosting). Implementation notes:

- **Site address**: `site` in `astro.config.mjs` is `process.env.SITE_URL`, defaulting to
  `https://uc-urbanism.netlify.app`, the only place that default is written. `robots.txt` is generated by
  `src/pages/robots.txt.ts`. The Instagram embed's `rd=` still names netlify.app (Instagram's referrer field, harmless).
- **Redirects, three layers**: (1) Astro `redirects` build `dist/events/index.html` etc. as instant-refresh pages
  (`noindex`, canonical), so they work on any host. The sitemap filter leaves them out. (2) `public/_redirects` with
  plain `301`: Cloudflare applies it before files, so one hop. **Don't use `301!`**: Cloudflare (wrangler 4.155)
  rejects every rule with it ("Valid status codes are 200, 301, …"), and the forward pages take over. (3) `vercel.json`.
- **Netlify behaviour changed**: Netlify skips a non-forced rule when a file exists there, so `/events` → 301 `/events/`
  → forward page → `/connect/#events` (was one 301). `/events/x` (no file) still gets the single 301. Checked on a draft
  deploy. Forcing it would need `301!` (breaks Cloudflare) or forced rules in a `netlify.toml`. A test of the latter
  with `netlify deploy --no-build` was inconclusive, because a CLI upload may not read `netlify.toml` at all.
- **Headers**: `public/_headers` (Netlify + Cloudflare, same syntax) and `vercel.json`; verified on both checked hosts.
  `netlify.toml` was deleted: the Netlify dashboard already has `npm run build` → `dist`, and Node comes from
  `.node-version` (22). `package.json` `engines` is `>=22` (Vercel reads it; local Node is 26).
- **CMS**: `admin/index.html` uses `CMS_MANUAL_INIT` and `CMS.init({config: {site_url, display_url}})` set to
  `location.origin` (merged into `config.yml`). `config.yml` has a commented `base_url` for a login Worker
  (sveltia-cms-auth); unset means Netlify's provider, as before. Checked locally: collections load, header links to
  the local origin.
- **GitHub Pages**: `.github/workflows/github-pages.yml` runs only by hand (`workflow_dispatch`), so it never fails
  while Pages is off. Actions pinned to the majors current on 2026-10-28 (checkout v7, setup-node v7,
  upload-pages-artifact v5, deploy-pages v5). Not run yet; Vercel not deployed yet either.

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

Source: `~/Downloads/Changes 2-1.pdf`, a hand-marked printout of the 2026-09-02 site (HS/LS/SS = heading/line/section
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

- [ ] **CMS login on production.** Nobody can log in at `/admin` on the live site yet. Two routes (README → CMS login):
      a sveltia-cms-auth Cloudflare Worker that works on any host (recommended since v1.7; set `base_url` in
      `config.yml`), or a GitHub OAuth App (callback `https://api.netlify.com/auth/done`) installed in Netlify →
      *Site configuration → Access & security → OAuth* (Netlify only). Checked 2026-10-06: Netlify's auth endpoint for the site returned 404 (consistent with no
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
- Moving off Netlify: v1.7 makes it possible without code changes. Cloudflare Pages is the closest fit (reads the
  same `_headers`/`_redirects`, free, one-hop redirects). GitHub Pages can't send headers and needs a custom domain and,
  for this private repo, a paid plan. README → Hosting → Moving hosts has the checklist.
- Custom domain; redirects from the old Canva/Geocities sites; events/projects archives.

## Tooling notes

- Netlify CLI is installed and logged in as the site owner; the main checkout is linked to site
  `<site id>`. `netlify api listSiteDeploys --data '{"site_id":"…"}'` shows deploy state;
  `netlify api listSiteForms` confirmed no forms are registered. A non-production check of a local build:
  `netlify deploy --no-build --dir dist --site <id> --alias <name>` (no `--prod`) gives `https://<name>--uc-urbanism.netlify.app`.
- Cloudflare's behaviour can be checked locally with `npx --yes wrangler@4 pages dev dist` (no account needed; its log
  lists invalid `_redirects` rules).
- `gh` is authenticated as mjs06-git (formerly ActuallyNotAPerson). The repo has no CI checks; Netlify is the only build
  (the GitHub Pages workflow runs only by hand).
- `sharp` (an Astro dependency in `node_modules`) does all one-off image work (logo inversion, wordmark crop,
  transparent affiliate logos, PNG→JPEG); no extra image tooling is installed.
- Original headshot PNGs are in `~/Downloads/*_website_pic.png`; the repo copies are the source of truth now.

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
- **2026-10-28** — v1.7.0 on `claude/host-agnostic-build` (not merged): host-agnostic build with settings for
  Netlify, Cloudflare Pages, Vercel and GitHub Pages (see above).
