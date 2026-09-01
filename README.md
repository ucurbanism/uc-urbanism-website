# UC Urbanism Website

Website for the Urbanism Club, a University of Cincinnati Registered Student Organization.
Live at https://uc-urbanism.netlify.app (auto-deploys from the `main` branch).

All text, photos, and embeds were carried over verbatim from the club's two prior websites:

- https://uc-urbanism.my.canva.site/
- https://geocities.ws/uc_urbanism/

Built with [Astro](https://astro.build); content is edited with [Decap CMS](https://decapcms.org).

## Pages

- `/` — About Us
- `/connect` — Get Connected, Meetings
- `/events` — Club Events (calendar placeholder) and General Events
- `/resources` — Proposals, Projects, and Plans
- `/join` — Mailing-list signup + join links

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

## Mailing-list form (Netlify Forms)

The signup form on `/join` is handled by Netlify Forms. One-time setup in the Netlify UI:

1. *Forms → Enable form detection* (then trigger a deploy).
2. *Site configuration → Notifications → Form submission notifications → Add notification → Email*
   to get each signup by email. Submissions are also listed under *Forms* in the Netlify UI.

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
