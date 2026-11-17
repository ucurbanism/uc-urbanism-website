# Maintainers

Who looks after this repository, what they promise, and who may merge what.

## Roles

| Role | Who | GitHub access | Can do |
| --- | --- | --- | --- |
| **Contributor** | Any club member or board member who asks | Write (collaborator) | Save drafts in the CMS; open pull requests |
| **Maintainer** | The people listed below | Write (collaborator) | Everything a contributor can, plus review and approve pull requests and tag releases |
| **Owner** | The club's GitHub account, `ucurbanism`. Its sign-in is held by the President and one other officer | Owner | Merge pull requests and publish CMS drafts (the only account that can), add and remove collaborators, change repository settings, transfer or delete the repository |

People outside the club are welcome too: fork the repository and open a pull request.

### Current maintainers

| GitHub | Role in the club | Since |
| --- | --- | --- |
| `mjs06-git` | Built the site | 2026 |

To add or retire a maintainer, open a pull request that edits this table. An owner merges it.

## The maintainers' pledge

As a maintainer of the Urbanism Club's website, I pledge to:

1. **Keep it the club's site, not mine.** I act for the club and its members, and I hand the work on in better
   shape than I found it.
2. **Keep the door open.** Any club member who asks gets contributor access. I answer questions, issues and pull
   requests within a week during the semester, and I say so when I can't.
3. **Review kindly and honestly.** I judge the change, not the person, explain what I ask for, and thank people
   for their work.
4. **Get a second pair of eyes.** Another maintainer or an owner reviews my code before I ask for it to be merged.
5. **Protect the live site.** I run the build and the tests before asking for a merge, never force-push `main`, and never
   commit a password, key or token.
6. **Protect people.** I take down a photo or a name when its subject asks, and I keep private what is sent to me
   in confidence.
7. **Write it down.** Changes go in `CHANGELOG.md`, and anything the next person needs to know goes in `HANDOFF.md`.
8. **Leave cleanly.** Before I graduate or step back, I name a successor, update this file, and make sure nothing
   depends on an account only I hold.

## Who may merge what

Only the club's account, `ucurbanism`, can merge into `main`, and every change, CMS edits included, gets there
through a pull request. Maintainers review; the owner merges.

| Change | How it arrives | Approved by, before the owner merges |
| --- | --- | --- |
| Content edited in the CMS (anything under `src/content/`) | A draft pull request the CMS opens on a `cms/…` branch, marked **Ready** by its author | The owner, when publishing |
| Content edited by hand, docs, typo fixes | Pull request | One maintainer |
| Code, design, styles, tests (`src/pages`, `src/layouts`, `src/styles`, `src/lib`, `scripts`) | Pull request | One maintainer who did not write it |
| Build, hosting, dependencies and sign-in (`package.json`, `package-lock.json`, `astro.config.mjs`, `netlify.toml`, `public/admin/`, `.github/`) | Pull request | One maintainer who did not write it, plus the owner |
| Licences, this file, `CODE_OF_CONDUCT.md` | Pull request | The owner |

For every pull request:

- `npm run build` and `npm test` pass on the branch. There is no automatic check, so the owner runs them, or
  checks that the reviewing maintainer did, before merging.
- Merge with a merge commit; the branch is deleted automatically.
- Merging to `main` publishes to the live site in about a minute. Look at the live page after merging.

**Emergencies.** If the live site is broken or shows something that must come down, open a pull request with the
fix or the revert and get it to whoever holds the `ucurbanism` sign-in at once (in person, or the board's group
chat). Nobody else can change `main`, so the owners need to be reachable.

**Releases.** A maintainer adds the entry to `CHANGELOG.md`; once it is merged, a maintainer tags the merge commit
`vX.Y.Z`. Tags are never moved or deleted.

## What GitHub enforces, and what it doesn't

GitHub enforces two rulesets (*Settings → Rules → Rulesets*):

- **Protect main:** only the **Repository admin** role (the `ucurbanism` account) can update `main`, through a
  merge or a push. Nobody, the owner included, can delete it or force-push it.
- **Protect release tags:** tags starting with `v` can be created by any collaborator but never moved or deleted.

To force-push `main` or move a tag on purpose, the owner switches the ruleset off, does it, and switches it back on.

Kept by agreement, not by the software:

- Who must approve what, in the table above. [`.github/CODEOWNERS`](.github/CODEOWNERS) asks the right people for a
  review automatically, but the owner can merge without one.
- Only the owner account can add or remove collaborators.

If the club later moves the repository into a GitHub organization, the roles above map onto its Write, Maintain
and Admin roles, and several people can be owners.

## When things go wrong

- A maintainer who breaks the pledge is spoken to by the board first. The owners may remove anyone's access.
- Conduct problems: see [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).
- Disagreements about the site that maintainers can't settle go to the board, whose decision is final.
