// utils/githubApi.js
import axios from "axios";
import dayjs from "dayjs";

/**
 * Helper: call GitHub REST API with automatic token header.
 */
export const callRest = async (token, url, params = {}) => {
  const { data } = await axios.get(url, {
    baseURL: "https://api.github.com",
    headers: { Authorization: `Bearer ${token}` },
    params,
  });
  return data;
};

/**
 * Helper: call GitHub GraphQL API.
 */
export const callGraphQL = async (token, query, variables = {}) => {
  const { data } = await axios.post(
    "https://api.github.com/graphql",
    { query, variables },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (data.errors) throw new Error(JSON.stringify(data.errors));
  return data.data;
};

/* ------------------------------------------------------------------ */
/*  Public helper functions used by the router                        */
/* ------------------------------------------------------------------ */

/** 1️⃣  Basic profile  ------------------------------------------------ */
export const getProfile = async (token) => {
  // GET /user returns the authenticated user
  const user = await callRest(token, "/user");
  return {
    login: user.login,
    name: user.name,
    avatarUrl: user.avatar_url,
    bio: user.bio,
    publicRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
  };
};

/** 2️⃣  Repo / PR / Issue counts  ------------------------------------ */
export const getRepoCount = async (token) => {
  const { public_repos } = await callRest(token, "/user");
  return public_repos;
};

export const getTotalPRs = async (token, login) => {
  // Search API – type:pr author:USERNAME
  const { total_count } = await callRest(token, "/search/issues", {
    q: `type:pr+author:${login}`,
  });
  return total_count;
};

export const getTotalIssues = async (token, login) => {
  const { total_count } = await callRest(token, "/search/issues", {
    q: `type:issue+author:${login}`,
  });
  return total_count;
};

/** 3️⃣  Total commits & streak via GraphQL  -------------------------- */
export const getTotalCommits = async (token) => {
  const query = `
    query {
      viewer {
        contributionsCollection {
          contributionCalendar { totalContributions }
        }
      }
    }
  `;
  const data = await callGraphQL(token, query);
  return data.viewer.contributionsCollection.contributionCalendar
    .totalContributions;
};

/** 4️⃣  Weekly stats (last 7 days)  ---------------------------------- */
export const getWeeklyStats = async (token) => {
  const to = dayjs().endOf("day").toISOString();
  const from = dayjs().subtract(7, "day").startOf("day").toISOString();

  const query = `
    query($from: DateTime!, $to: DateTime!) {
      viewer {
        contributionsCollection(from: $from, to: $to) {
          totalCommitContributions
          totalPullRequestContributions
          totalPullRequestReviewContributions
          totalIssueContributions
        }
      }
    }
  `;
  const data = await callGraphQL(token, query, { from, to });
  const c = data.viewer.contributionsCollection;
  return {
    commits: c.totalCommitContributions,
    prs: c.totalPullRequestContributions,
    reviews: c.totalPullRequestReviewContributions,
    issues: c.totalIssueContributions,
  };
};
