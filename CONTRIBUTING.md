# Contributing

Anyone in the Urbanism Club can work on this site: board member or not, coder or not. People outside the club are
welcome to open issues and pull requests too.

## Three ways to help

| I want to… | Do this |
| --- | --- |
| Point out a typo, a broken link or an idea | Open an issue, or mention it at a meeting |
| Change text, photos, links or the leadership list | Use the CMS: see [Editing the site](README.md#editing-the-site-no-coding-needed). It publishes straight away |
| Change code, design or how the site is built | Open a pull request, as below |

To get access, ask a maintainer or an officer; the club's account adds you as a collaborator. Being a member is
the only requirement.

## Pull requests

1. Make a branch (or a fork, if you are not a collaborator). Don't push code to `main` directly.
2. Set up and check your work as in [Run it locally](README.md#run-it-locally). `npm run build` and `npm test`
   must both pass.
3. Open the pull request and say what changed and why. Add a screenshot if the page looks different.
4. A maintainer reviews it, usually within a week during the semester. Who has to approve what is in
   [MAINTAINERS.md](MAINTAINERS.md#who-may-merge-what).
5. A maintainer merges it. The live site updates about a minute later.

Keep pull requests small and about one thing. Add a line to `CHANGELOG.md` for anything a visitor or an editor
would notice.

## Ground rules

- Never commit a password, key, token or `.env` file.
- Only add photos you have the right to use, and only of people who are fine with being on the site.
- The club's words, name, logos and photos are not open-licensed: see [LICENSE-CONTENT.md](LICENSE-CONTENT.md).
  Code you contribute is released under the [MIT licence](LICENSE).
- Be decent to each other: see the [Code of Conduct](CODE_OF_CONDUCT.md).
