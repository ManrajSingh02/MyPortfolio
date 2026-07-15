import { client, canUseSanity } from "../services/sanityClient";
import { portfolioQuery } from "./portfolioQuery";

export const fetchPortfolioFromSanity = async () => {
  if (!canUseSanity || !client) {
    console.warn("Sanity is not configured.");
    return null;
  }

  try {
    const data = await client.fetch(portfolioQuery);

    console.log("Sanity Portfolio:", data);

    return data;
  } catch (error) {
    console.error("Sanity Fetch Error:", error);
    throw error;
  }
};

export { canUseSanity };