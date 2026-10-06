# Changelog

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
