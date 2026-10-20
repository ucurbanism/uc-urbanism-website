// Verifies the built site still carries the original club text, embeds and links verbatim.
// Run after `npm run build`:  npm test
import { existsSync, readFileSync } from 'node:fs';

const unescape = (s) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const load = (p) => unescape(readFileSync(new URL(`../dist/${p}`, import.meta.url), 'utf8'));
const textOf = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    // Stripping an inline tag before punctuation ("</a>,") leaves a stray space.
    .replace(/\s+([,.;:!?])/g, '$1');

const pages = {
  'index.html': load('index.html'),
  'connect/index.html': load('connect/index.html'),
  'resources/index.html': load('resources/index.html'),
  '404.html': load('404.html'),
};

// v1.5 merged Events into Connect and dropped the form's thank-you page; v1.6 merged Join into Connect.
// Netlify redirects the old URLs.
const removed = ['events/index.html', 'join/index.html', 'join/thanks/index.html'];

const text = {
  'index.html': [
    'University of Cincinnati Registered Student Organization',
    'Student chapter of the American Planning Association (Planning Student Organization)',
    'UC Urbanism Strong Towns Local Conversation',
    'Urbanism Club aims to connect students and other members of the Uptown community; through',
    'discussions with local experts and others in the know; sharing new projects and ideas; and group',
    'projects and activities. Host to the University of Cincinnati student chapter of the American Planning',
    'Association(APA) (Planning Student Organization(PSO)), and the UC Urbanism Strong Towns Local',
    'Conversation, we support UC DAAP planning students, and embody Strong Towns principles.',
    'About us',
    'Urbanism Club is a student-led, community organization that aims to connect students and other members of the Uptown community who are interested in urbanism.',
    'Our members learn about and advocate for better communities through: discussions with local experts and community organizations, projects focused on regional issues, volunteer opportunities, workshops, and more.',
    'What is Urbanism?',
    'Urbanism refers to the way of life or characteristics or a city or town. We think of it as “being of the city,” an active participant in your locality.',
    'Our Main Goals', 'Educate', 'Connect', 'Advocate',
    'Provide opportunities to learn more about urban challenges, initiatives, organizations, and more from the area and beyond.',
    'Create a space for individuals interested in urbanism to connect with each other, local experts, community organizers, and more.',
    'Support local initiatives and organizations by volunteering, campaigning, and sharing resources.',
    'Affiliate Organizations',
    'Urbanism Club is home to the University of Cincinnati Planning Student Organization, officially registered with the American Planning Organization. Additionally, we are an official local StrongTowns Conversation, alongside friend of the club Civic Cincinnati, and an All Aboard Ohio Affiliate Club.',
    'Leadership Team',
    'Fenley Jones, President and Treasurer', 'Matthew Sayers, Engagement Coordinator',
    'Michael Uhlemann, Education Coordinator and Strong Towns Chair', 'AJ Domelle, Advocacy Coordinator',
    'James McDermott, Advocacy Coordinator', 'Henry Bogzevitz, APA (PSO) Chair',
  ],
  'connect/index.html': [
    'Get Connected!',
    'We stay connected with members and the general public through social media, messaging apps, and UC sanctioned websites. Scan the QR codes or click the links below to get connected with us!',
    'Check out our Calendar with Urbanism Club sponsored events, as well as other local Urbanist events!',
    'Instagram', 'LinkedIn', 'GroupMe', 'GetInvolvedUC', 'Join the mailing list', 'Events', 'Meetings',
    'Most meetings are located in the DAAP first year planning studio, Alms 6110, within the College',
    'of Design, Architecture, Art, and Planning (DAAP).',
    '348 (Alms Builiding) 342 (DAAP Building) Clifton Court, Cincinnati, Ohio 45219',
  ],
  'resources/index.html': ['Proposals, Projects, and Plans', 'Add your project!'],
  '404.html': ["This page isn't here yet"],
};

const raw = {
  'index.html': [
    'https://www.uc.edu/campus-life/csi.html', 'https://planning.org', 'https://strongtowns.org',
    'https://www.fenleyjones.com',
    // The Join pill and the home-page CTAs open the mailing-list section on Connect.
    'href="/connect/#join"',
  ],
  'connect/index.html': [
    'https://www.instagram.com/uc_urbanism/embed/?cr=1&v=14&wp=1396&rd=https%3A%2F%2Fuc-urbanism.netlify.app&rp=%2Fconnect',
    'https://www.instagram.com/uc_urbanism/', 'https://groupme.com/join_group/98790398/sG4VLf2B',
    'https://www.linkedin.com/company/cincinnati-urbanism-club/',
    'https://campuslink.uc.edu/organization/planning-student-organization-undergrad',
    'igsh=MWdhc3JiaDhuMTk3MA',
    // Combined club + external-events Google Calendar, in agenda and month views
    'calendar/embed?src=0c7201b7a265d7809dcac374d572cce797f89a0913afd9aa8158019dabd465cd%40group.calendar.google.com',
    'src=0e8049d1f2999f161c00b7806575afbc40fc1aa8c555fc41b6440c77eea03f4d%40group.calendar.google.com',
    'mode=AGENDA',
    'id="join"', 'id="events"', 'id="meetings"',
  ],
  'resources/index.html': [
    'https://forms.gle/SAtJWEXpx8rc3VcD7',
    'https://docs.google.com/spreadsheets/u/0/d/1Tm869v2oX6P1vC1LjsRj1BZLH3OpbDNuABfOtjlYxDg/htmlview#gid=0',
  ],
};

let failures = 0;
for (const [file, html] of Object.entries(pages)) {
  const t = textOf(html);
  for (const s of text[file] ?? []) if (!t.includes(s)) { console.error(`MISSING TEXT  ${file}: ${s}`); failures++; }
  for (const s of raw[file] ?? []) if (!html.includes(s)) { console.error(`MISSING EMBED/LINK  ${file}: ${s}`); failures++; }
  if (/geocities\.ws\/uc_urbanism\/pictures|my\.canva\.site\/_assets/.test(html)) { console.error(`HOTLINK  ${file}`); failures++; }
}
// Netlify serves each page at /<name>/; a link to /<name> costs a 301 first (and reloads Connect for its own #join).
for (const [file, html] of Object.entries(pages)) {
  for (const [, name] of html.matchAll(/href="\/([^"/#?.]+)(?:#[^"]*)?"/g)) {
    if (existsSync(new URL(`../dist/${name}/index.html`, import.meta.url))) { console.error(`NO TRAILING SLASH  ${file}: /${name} (link to /${name}/)`); failures++; }
  }
}
for (const p of removed) {
  if (existsSync(new URL(`../dist/${p}`, import.meta.url))) { console.error(`STALE PAGE  ${p} (should redirect to /connect)`); failures++; }
}
if (failures) { console.error(`\n${failures} fidelity failure(s)`); process.exit(1); }
console.log('Content fidelity OK: all original text, embeds and links present.');
