require("dotenv").config();
import { Octokit } from "@octokit/rest";

export interface Repo {
  id: number;
  name: string;
  default_branch: string;
  owner: {
    login: string;
  };
}

const ERROR_MESSAGE = "Branch not protected";
const ORG = process.env["GITHUB_ORG"];
const GITHUB_API = new Octokit({
  auth: process.env["GITHUB_ACCESS_TOKEN"],
});

const DEFAULT_PROTECTION_RULES: any = {
  allow_force_pushes: false,
  allow_deletions: false,
  enforce_admins: true,
  required_pull_request_reviews: {
    dismiss_stale_reviews: false,
    require_code_owner_reviews: false,
    require_last_push_approval: false,
    required_approving_review_count: 1,
  },
  required_status_checks: null,
  restrictions: null,
};

async function getAllRepos(page = 1, reposList: Repo[] = []): Promise<Repo[]> {
  const { data } = await GITHUB_API.rest.repos.listForOrg({
    org: ORG,
    page,
  });

  reposList.push(...(data as Repo[]));

  if (data.length > 0) {
    return getAllRepos(page + 1, reposList);
  }

  return reposList;
}

async function getBranchProtectionRules(repo: Repo) {
  await GITHUB_API.rest.repos.getBranchProtection({
    owner: repo.owner.login,
    repo: repo.name,
    branch: repo.default_branch,
  });
}

async function updateBranchProtectionRules(repo: Repo) {
  await GITHUB_API.rest.repos.updateBranchProtection({
    owner: repo.owner.login,
    repo: repo.name,
    branch: repo.default_branch,
    ...DEFAULT_PROTECTION_RULES,
  });
}

export const enforce_branch_protection_policies = async () => {
  const repos = await getAllRepos();
  for (const repo of repos) {
    if (repo.name === "phylorthology") {
      try {
        await getBranchProtectionRules(repo);
      } catch (e) {
        // GitHub throws a 404 error with the "Branch not protected" error message
        // if the branch doesn't have any protection. So we catch the error and update
        if (e.response?.data?.message === ERROR_MESSAGE) {
          updateBranchProtectionRules(repo);
        }
      }
    }
  }
  return true;
};

if (require.main === module) {
  enforce_branch_protection_policies();
}
