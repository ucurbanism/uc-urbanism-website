# UC Urbanism Website

Website for the Urbanism Club, a University of Cincinnati Registered Student Organization.
Live at https://uc-urbanism.netlify.app (auto-deploys from the `main` branch).

All text, photos, and embeds were carried over verbatim from the club's two prior websites:

- https://uc-urbanism.my.canva.site/
- https://geocities.ws/uc_urbanism/

Built with [Astro](https://astro.build); content is edited with [Decap CMS](https://decapcms.org).

## Pages

- `/` — About Us
- `/connect` — Get Connected (QR codes), Join the mailing list (`#join`, where the nav's Join pill goes), events
  calendar (agenda + month), Instagram, Meetings
- `/resources` — Proposals, Projects, and Plans
- `404` — branded "page not found" page, served by Netlify for any missing address (not in the sitemap)

`/events` was folded into `/connect` in v1.5 and `/join` in v1.6; Netlify redirects both, and the retired
`/join/thanks/`, to the matching section of `/connect` (see `netlify.toml`).
See [CHANGELOG.md](CHANGELOG.md) for what changed in each version.

## Editing the site (no coding needed)

Everything visible on the site lives in YAML files under `src/content/` and is editable
through the CMS at **`/admin`**:

| CMS section | What it edits | Files |
| --- | --- | --- |
| Site settings | Social/join links, QR codes, Analytics ID, Search Console token | `src/content/settings/site.yml` |
| Pages | Every heading, paragraph, and embed URL, page by page | `src/content/pages/*.yml` |
| Leadership | The Leadership Team list (one entry per person, ordered) | `src/content/leadership/*.yml` |
| Affiliate organizations | Logos and links in the Affiliates row | `src/content/affiliates/*.yml` |

Saving in the CMS commits to GitHub, which triggers a Netlify deploy (about a minute).

### Editing locally (developers)

```
npm install
npm run dev     # site at http://localhost:4321
npm run cms     # in a second terminal: local CMS backend
```
Then open http://localhost:4321/admin — edits go straight to the files in your working copy.

### One-time setup for editing on the live site

The CMS logs editors in with GitHub, so each editor needs a GitHub account with **write access to
this repository**. To enable the login (done once, by a repo/site admin):

1. GitHub → Settings → Developer settings → OAuth Apps → *New OAuth App*.
   Homepage: `https://uc-urbanism.netlify.app`. **Authorization callback URL:** `https://api.netlify.com/auth/done`.
   Copy the Client ID and generate a Client Secret.
2. Netlify → this site → *Site configuration → Access & security → OAuth → Install provider → GitHub*,
   paste the Client ID and Secret.
3. Add each board member as a collaborator on the GitHub repo. They can then sign in at `/admin`.

## Mailing list (Google Form)

The site doesn't collect emails itself. The "Join the mailing list" section on Connect (`/connect/#join`) is a button
that opens a **club-owned Google Form**, and responses collect in that form's Google Sheet. Setup, once:

1. Create a Google Form from a shared club account (not a personal one, so it survives board turnover) with one
   required *Short answer* question, "Email", using *Response validation → Text → Email address*.
   Optionally add a name and a major question.
2. *Responses → Link to Sheets* so signups land in a spreadsheet the board can share.
3. *Send → link icon → Shorten URL*, copy the `https://forms.gle/…` link.
4. Paste it into **CMS → Pages → Connect → Join section: Google Form link**.

While that field is blank, the section says the email list is coming and shows the GroupMe button instead.
If the form is created under a uc.edu account, decide on purpose whether *Restrict to users in University of
Cincinnati* stays on: it blocks anyone without a UC login (alumni, community members).

## Search engines

- `robots.txt` and `sitemap-index.xml` are generated automatically.
- To verify the site in Google Search Console, choose the *HTML tag* method and paste the token
  (the `content` value) into *Site settings → Google Search Console verification token* in the CMS.

## Checks

```
npm run build   # production build into dist/
npm test        # verifies the original club text, embeds and links are still present verbatim
```

## Structure

```
src/content/        editable content (YAML)
src/pages/          page templates
src/layouts/        shared layout (nav, head/SEO, footer, night theme)
src/assets/         photos and backgrounds (optimized at build time)
public/admin/       Decap CMS
public/media/       QR code SVGs
```
