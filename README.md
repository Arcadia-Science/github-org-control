# github-org-control

This repository implements a simple cron job that makes sure all Arcadia Science GitHub repos have default branch protection rules for the `main` branch.

## Motivation

<!-- TODO: Add more details -->

This repository is heavily inspired by [this Stack Overflow answer](https://stackoverflow.com/questions/54222881/enable-branch-protection-rules-in-github-at-the-organisation-level).

const DEFAULT_PROTECTION_RULES = {
allow_force_pushes: false, // Permits force pushes to the protected branch by anyone with write access to the repository.
allow_deletions: false, // Allows deletion of the protected branch by anyone with write access to the repository.
enforce_admins: true, // Enforce all configured restrictions for administrators
required_pull_request_reviews: {
// Require at least one approving review on a pull request, before merging.
dismiss_stale_reviews: false,
require_code_owner_reviews: false,
require_last_push_approval: false,
required_approving_review_count: 1,
},
required_status_checks: null,
restrictions: null,
};

## Getting started

Create `.env` file with:

```
// .env
GITHUB_ORG=
GITHUB_ACCESS_TOKEN=
```

Instructions on getting the GitHub access token can be found [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

Install packages using [npm](https://yarnpkg.com/en/).

```
npm install
```

Once the installation is complete, you can build the job with `npm run build` or `npm run watch`.
