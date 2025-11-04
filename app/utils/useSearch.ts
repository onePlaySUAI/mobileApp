import { useState, useEffect } from 'react';

interface UseSearchProps {
  initialPage?: 'search' | 'library';
}

export const useSearch = (initialPage?: 'search' | 'library') => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');
  const page = initialPage || 'search';

  // Reset when page changes
  useEffect(() => {
    setIsSearching(false);
    setSearchText('');
  }, [page]);

  const toggleSearch = () => {
    if (isSearching) {
      setIsSearching(false);
      setSearchText('');
    } else {
      setIsSearching(true);
    }
  };

  const clearSearch = () => {
    setIsSearching(false);
    setSearchText('');
  };

  return {
    isSearching,
    searchText,
    setSearchText,
    toggleSearch,
    clearSearch,
  };
};