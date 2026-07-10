import { portfolioQuery } from '../sanity/portfolioQuery.js';

const projectId = process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || 'm32es5ry';
const dataset = process.env.SANITY_DATASET || process.env.VITE_SANITY_DATASET || 'production';
const apiVersion = process.env.SANITY_API_VERSION || process.env.VITE_SANITY_API_VERSION || '2026-07-06';

export const fetchPortfolioContent = async () => {
  const url = new URL(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`);
  url.searchParams.set('query', portfolioQuery);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Sanity request failed with status ${response.status}.`);
  }

  const payload = await response.json();
  return payload.result;
};
