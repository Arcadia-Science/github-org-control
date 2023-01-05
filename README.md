# github-org-control

This repository implements a simple cron job that makes sure all Arcadia Science GitHub repos have default branch protection rules for the `main` branch.

## Motivation

<!-- TODO: Add more details -->

This repository is heavily inspired by [this Stack Overflow answer](https://stackoverflow.com/questions/54222881/enable-branch-protection-rules-in-github-at-the-organisation-level).

## Getting started

Create `.env` file with:

```
// .env
GITHUB_ORG=
GITHUB_ACCESS_TOKEN=
```

Instructions on getting the GitHub access token can be found [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

Install packages using [yarn](https://yarnpkg.com/en/).

```
yarn
```

If you run into issues, you may have to create `yarn.lock` manually:

```
touch yarn.lock
```

Once the installation is complete, you can build the job with `yarn build` or `yarn watch`.
