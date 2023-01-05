# github-org-control

This repository implements a simple cron job that makes sure all Arcadia Science GitHub repos have default branch protection rules for the `main` branch.

## Motivation

When a user within the Arcadia Science organization creates a new Github repository, that repository does not have any branch protections. This means the user can push/force push to any branch. This is suboptimal because we'd like most major changes to go through code review. GitHub conveniently offers easily customizable branch protection rules, but these can only be set at the repository level and no organization-wide defaults exist.

Here we don't want to modify existing branch protection rules of a repo. Each repo has its own unique needs and should be customizable. But if a repo doesn't have any controls, we want to set bare-minimum defaults. [This script](src/branch_protection.ts) run on a [cron job](.github/workflows/cron.yml) does just that.

This repository is heavily inspired by [this Stack Overflow answer](https://stackoverflow.com/questions/54222881/enable-branch-protection-rules-in-github-at-the-organisation-level). The main difference is the update behavior and the tooling choice of using GitHub official REST API wrapper.

## Defaults

Here the "protected branch" mostly is `main`. But there may be some exceptions to this rule because of past choices or nf-core standards. So we use the repo metadata to determine what the base branch is.

By default:

- We don't permit force pushes to the protected branch by anyone with write access to the repository.
- We don't allow the deletion of the protected branch by anyone with write access to the repository.
- We require at least one approving review on a pull request before merging.
- We don't enforce status checks on each repository (not every repo has these and these should be configured at the single repo level)
- We enforce all these settings to every user, including admins.

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
