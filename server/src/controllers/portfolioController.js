import { fetchPortfolioContent } from '../services/sanityService.js';

export const getPortfolio = async (_request, response, next) => {
  try {
    const portfolio = await fetchPortfolioContent();
    response.status(200).json(portfolio);
  } catch (error) {
    next(error);
  }
};
