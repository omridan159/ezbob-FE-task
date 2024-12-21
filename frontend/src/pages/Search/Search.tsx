import React, { useEffect, useState } from 'react';
import SearchInput from '../../components/SearchInput/SearchInput';
import { useAutocompleteQuery } from '../../queries/search';
import { debounce } from '../../utils/debounce';
import styles from './Search.module.css';

const Search: React.FC = () => {
   const [query, setQuery] = useState('');
   const [debouncedQuery, setDebouncedQuery] = useState(query);

   useEffect(() => {
      const debouncedHandler = debounce((newQuery: string) => {
         setDebouncedQuery(newQuery);
      }, 400);

      debouncedHandler(query);

      return () => {
         debouncedHandler('');
      };
   }, [query]);

   const { data: suggestions = [] } = useAutocompleteQuery(debouncedQuery);

   return (
      <div className={styles.searchContainer}>
         <SearchInput
            onSearch={(newQuery) => setQuery(newQuery)}
            query={query}
            setQuery={setQuery}
            suggestions={suggestions}
         />
      </div>
   );
};

export default Search;
