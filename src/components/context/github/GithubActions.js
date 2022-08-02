import axios from 'axios';

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authorization: `token ${GITHUB_TOKEN}` },
});

export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  const response = await github.get(`/search/users${params}`);
  return response.data.items;
};

export const getUserAndRepos = async (userid) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10,
  });

  const [user, repos] = await Promise.all([
    github.get(`/users/${userid}`),
    github.get(`/users/${userid}/repos?${params}`),
  ]);

  return { user: user.data, repos: repos.data };
};

export const fetchUsers = async () => {
  const response = await github.get(`${GITHUB_URL}/users`);

  return response.data;
};

// new function getUserAndRepos

// export const getUser = async (userid) => {
//   const response = await fetch(`${GITHUB_URL}/users/${userid}`, {
//     headers: {
//       Authorization: `token ${GITHUB_TOKEN}`,
//     },
//   });

//   if (response.status === 404) {
//     window.location = '/notfound';
//   } else {
//     const data = await response.json();
//     return data;
//   }
// };

// export const getUserRepos = async (userid) => {
//   const response = await fetch(
//     `${GITHUB_URL}/users/${userid}/repos?${params}`,
//     {
//       headers: {
//         Authorization: `token ${GITHUB_TOKEN}`,
//       },
//     }
//   );

//   const data = await response.json();
//   return data;
// };
