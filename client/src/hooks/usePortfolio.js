import { useEffect, useState } from 'react';
import { getPortfolio } from '../services/portfolioService.js';

export const usePortfolio = () => {
  const [state, setState] = useState({ data: null, loading: true, error: '' });

  useEffect(() => {
    let active = true;
    getPortfolio()
      .then((data) => active && setState({ data, loading: false, error: '' }))
      .catch((error) => active && setState({ data: null, loading: false, error: error.message }));

    return () => {
      active = false;
    };
  }, []);

  return state;
};
