// Verifies the built site still carries the original club text, embeds and links verbatim.
// Run after `npm run build`:  npm test
import { readFileSync } from 'node:fs';

const unescape = (s) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const load = (p) => unescape(readFileSync(new URL(`../dist/${p}`, import.meta.url), 'utf8'));
const textOf = (html) => html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

const pages = {
  'index.html': load('index.html'),
  'connect/index.html': load('connect/index.html'),
  'events/index.html': load('events/index.html'),
  'resources/index.html': load('resources/index.html'),
  'join/index.html': load('join/index.html'),
};

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
    'To get more information on any of these organizations, check out our Resources page!',
    'Leadership Team',
    'President and Treasurer, Fenley Jones', 'Engagement Coordinator, Matthew Sayers',
    'Education Coordinator and Strong Towns Chair, Michael Uhlemann', 'Advocacy Coordinator, AJ Domelle',
    'Advocacy Coordinator, James McDermott', 'APA (PSO) Chair, Henry Bogzevitz',
  ],
  'connect/index.html': [
    'Get Connected!',
    'We stay connected with members and the general public through social media, messaging apps, and UC sanctioned websites. Scan the QR codes or click the links below to get connected with us!',
    'Instagram', 'LinkedIn', 'GroupMe', 'GetInvolvedUC', 'Meetings',
    'Most meetings are located in the DAAP first year planning studio, Alms 6110, within the College',
    'of Design, Architecture, Art, and Planning (DAAP).',
    '348 (Alms Builiding) 342 (DAAP Building) Clifton Court, Cincinnati, Ohio 45219',
  ],
  'events/index.html': [
    'Club Events', 'General Events',
    'Check out our Calendar with Urbanism Club sponsored events, as well as other local Urbanist events!',
  ],
  'resources/index.html': ['Proposals, Projects, and Plans', 'Add your project!'],
  'join/index.html': ['Instagram', 'LinkedIn', 'GroupMe', 'GetInvolvedUC'],
};

const raw = {
  'index.html': [
    'https://www.uc.edu/campus-life/csi.html', 'https://planning.org', 'https://strongtowns.org',
    'https://www.fenleyjones.com',
  ],
  'connect/index.html': [
    'https://www.instagram.com/uc_urbanism/embed/?cr=1&v=14&wp=1396&rd=https%3A%2F%2Fuc-urbanism.netlify.app&rp=%2Fconnect',
    'https://www.instagram.com/uc_urbanism/', 'https://groupme.com/join_group/98790398/sG4VLf2B',
    'https://www.linkedin.com/company/cincinnati-urbanism-club/',
    'https://campuslink.uc.edu/organization/planning-student-organization-undergrad',
    'igsh=MWdhc3JiaDhuMTk3MA',
  ],
  'events/index.html': [
    'calendar/embed?height=600&wkst=2&ctz=America%2FKentucky%2FLouisville',
  ],
  'resources/index.html': [
    'https://forms.gle/SAtJWEXpx8rc3VcD7',
    'https://docs.google.com/spreadsheets/u/0/d/1Tm869v2oX6P1vC1LjsRj1BZLH3OpbDNuABfOtjlYxDg/htmlview#gid=0',
  ],
  'join/index.html': ['data-netlify="true"', 'name="form-name" value="mailing-list"', 'name="bot-field"'],
};

let failures = 0;
for (const [file, html] of Object.entries(pages)) {
  const t = textOf(html);
  for (const s of text[file] ?? []) if (!t.includes(s)) { console.error(`MISSING TEXT  ${file}: ${s}`); failures++; }
  for (const s of raw[file] ?? []) if (!html.includes(s)) { console.error(`MISSING EMBED/LINK  ${file}: ${s}`); failures++; }
  if (/geocities\.ws\/uc_urbanism\/pictures|my\.canva\.site\/_assets/.test(html)) { console.error(`HOTLINK  ${file}`); failures++; }
}
if (failures) { console.error(`\n${failures} fidelity failure(s)`); process.exit(1); }
console.log('Content fidelity OK: all original text, embeds and links present.');
