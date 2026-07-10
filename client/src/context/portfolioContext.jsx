/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';
import Loader from '../components/atoms/Loader.jsx';
import { usePortfolio as usePortfolioData } from '../hooks/usePortfolio.js';

const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  const { data, loading, error } = usePortfolioData();

  if (loading) return <Loader fullScreen />;

  if (error) {
    return (
      <main className="page-top section">
        <div className="empty-state" role="alert">
          <h1>Unable to load portfolio</h1>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  return <PortfolioContext.Provider value={data}>{children}</PortfolioContext.Provider>;
};

export const usePortfolio = () => {
  const portfolio = useContext(PortfolioContext);

  if (!portfolio) {
    throw new Error('usePortfolio must be used within PortfolioProvider.');
  }

  return portfolio;
};
