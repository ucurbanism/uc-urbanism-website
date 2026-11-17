# Changelog

## Unreleased — meeting polls on Connect

- Connect can show the club's meeting-poll site (a names-only fork of Timeful) in a new "Schedule a meeting" section
  (`/connect/#schedule`), below Events. Set its address in the CMS under Pages → Connect → "Meeting polls: poll site
  address"; while that's blank the section stays hidden.

## Unreleased — repository made ready for public release (2026-11-16)

No change to the site itself.

- Added a license: MIT for the code (`LICENSE`); the club's text, logos and photos stay reserved (`LICENSE-CONTENT.md`).
- README rewritten, with a "Taking over the site" section: who needs which access, and a handover checklist.
- `HANDOFF.md` no longer carries personal account details or local paths.
- Shared Claude Code permissions (`.claude/settings.json`); `.env` files are git-ignored.
- Build-tool security updates within the current major versions (`npm audit fix`).

## 1.6.2 — 2026-10-20

- Internal links now use the addresses Netlify actually serves, with the trailing slash (`/connect/`, `/resources/`,
  `/connect/#join`, …). Each `/connect` link used to take a 301 redirect to `/connect/` first, and on Connect itself the
  Join pill reloaded the whole page instead of scrolling down to the Join section. It scrolls again.
- The `/join` and `/events` redirects point straight at `/connect/#join` and `/connect/#events` (one redirect, not two).
- `npm test` now fails if a page links to another page without the trailing slash.

## 1.6.1 — 2026-10-20

- Fix: links from another page to a section of Connect now land on that section. The nav's Join pill and the home
  page's "Join the club" buttons (`/connect#join`) and "See upcoming events" (`/connect#events`) opened Connect at the
  top, because smooth scrolling was on while the page loaded and Chrome then skips the jump. Smooth scrolling now
  switches on once the page has loaded, so links within a page still glide (and still respect "reduce motion").

## 1.6.0 — 2026-10-20

### Structure
- **Join is now part of Connect.** The mailing-list section ("Join the mailing list", with the GroupMe button until
  the Google Form is linked) sits right below the QR codes. The nav's Join pill and the home page's "Join the club"
  buttons go to `/connect#join`; old `/join`, `/join/` and `/join/thanks/` links 301-redirect there.
- **Connect, top to bottom:** intro → QR codes → Join the mailing list → Events (new heading; agenda list, then month
  grid) → Instagram → Meetings.
- The text links under the QR codes repeated the QR labels (Instagram, GroupMe, LinkedIn), so they're no longer
  listed. A text link whose label no QR code has still shows.

### Look
- **Spacing and type normalized** site-wide:
  - after every heading: one gap (`--space-2`), whatever the heading size or whatever follows it (grids, embeds and
    figures used to sit 32px under a heading, text 12–23px);
  - before every section heading: `--space-6`; before the page title: `--space-4`;
  - line spacing: 1.6 for all running text (the lede and leadership captions had their own), 1.15 for headings;
  - one paragraph gap everywhere (taglines and link lists had a tighter one);
  - font sizes from one rem-based scale (`--text-sm/-lg/-h1/-h2/-h3`): every note, caption and tagline is the same
    small size, and each page's opening paragraph is the same lede size (Connect's wasn't).

### For editors (CMS)
- The "Join page (mailing list)" entry is gone; its fields are under **Pages → Connect → Join section**
  (Google Form link, button label, texts). Connect also has an **Events heading**.

## 1.5.1 — 2026-10-06

- Fix: `/join/thanks/` (the old mailing-list form's success page) now redirects to `/join/`. In 1.5.0 it was a
  `/join/*` catch-all pointing at `/join`, which Netlify never applied because the pattern also matches its own
  target; the page fell through to the 404.

## 1.5.0 — 2026-10-06

Changes from the board's hand-marked printout of the live site (scan dated 2026-09-06).

### Structure
- **Events is now part of Connect.** The nav is About Us · Connect · Resources, plus the Join pill (`/join`).
  Old `/events` links 301-redirect to `/connect#events`. Join stays its own page.
- **Connect, top to bottom:** events calendar as an agenda list, then a month grid → intro → QR codes →
  text links (moved up from the bottom of the page) → Instagram → Meetings.
- **One combined Google Calendar** (Urbanism Club + external events) drives both calendar views; edit the single
  URL in CMS → Pages → Connect. The extra third calendar from the old Events embed was dropped.
- Resources: "Add your project!" moved below the spreadsheet.
- **New 404 page** with the club nav, a home-page button and the GroupMe, instead of Netlify's plain one. Editable in
  CMS → Pages → 404 page. Until the Google Form is linked, the Join page's "Join the mailing list" pill leads here.
- **Mailing list moved off Netlify Forms.** The signup is now a button to a club-owned Google Form (responses collect
  in a Google Sheet); paste its link in CMS → Pages → Join page. Until a link is set, the Join page points to the
  GroupMe. The old form never stored anything: Netlify form detection was never enabled. `/join/thanks/` is gone and
  redirects to `/join`.

### Look
- Nav shows the **URBANISM CLUB wordmark only** (no skyline).
- Footer: logo and divider line removed.
- **Affiliate logos** sit centred in square tiles, in colour by day and **white at night**. Logo backgrounds were
  made transparent; PSO gets a two-tone night version (`logo_night`) because solid white lost its streetcar and bridge.
- **Leadership:** a short last row is centred.
- **Spacing pass** (headings, line spacing, section spacing) on the existing spacing scale: one paragraph rhythm site-wide,
  one block margin for figures/embeds/grids, and equal top/bottom padding on both hero blocks (which also re-centres the
  map background).
- Embeds fill the full column width, like the photos.

### Content
- Removed "To get more information… check out our Resources page!" from About. The PSO and All Aboard Ohio logos now
  link out, like APA and Strong Towns already did.
- QR codes: LinkedIn moved to last.

### For editors (CMS)
- About → **Hero image** (optional): swaps the logo graphic at the top of the home page.
- Connect → **Calendar caption** and **Google Calendar embed URL**.
- Affiliates → optional **Night-mode logo**.
- The Events page entry is gone; Join is now "Join page (mailing list)", with a **Google Form link** field.
- New **404 page** entry (heading and text).

### Still to do
- Create the mailing-list Google Form and paste its link into the CMS (steps in README).
- Colour versions of the three grayscale photos (park group, campus walk, Nodes workshop).
- A "more representative" hero graphic (use the new Hero image field).
- Instagram's profile embed stacks "followers · posts" on separate lines. That layout is inside Instagram's iframe
  and happens at every width, so it can't be changed from our CSS.

## 1.0.0 — 2026-09-15

First full site: merged the Canva and Geocities sites into Astro, Decap CMS, Join funnel, share cards, sitemap,
design-critique accessibility fixes. Tagged `v1.0.0`.
