import { useState } from 'react';

export const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return {
    isAuthenticated,
    setIsAuthenticated,
  };
};
