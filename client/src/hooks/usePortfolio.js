import { useEffect, useState } from 'react';
import { canUseSanity, fetchPortfolioFromSanity } from '../sanity/fetchPortfolio.js';
import { normalizePortfolio } from '../sanity/normalizePortfolio.js';

const emptyPortfolio = normalizePortfolio({
  profile: {},
  projects: [],
  certificates: [],
  skills: [],
  education: [],
  experience: [],
  resume: {},
});

export const usePortfolio = () => {
  const [state, setState] = useState({
    data: emptyPortfolio,
    loading: canUseSanity,
    error: '',
  });

  useEffect(() => {
    if (!canUseSanity) return;

    let active = true;

    fetchPortfolioFromSanity()
      .then((portfolio) => {
        if (active && portfolio) {
          setState({ data: normalizePortfolio(portfolio), loading: false, error: '' });
        }
      })
      .catch((error) => {
        if (active) {
          console.warn('Unable to load portfolio content from Sanity:', error);
          setState({ data: emptyPortfolio, loading: false, error: '' });
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return state;
};
