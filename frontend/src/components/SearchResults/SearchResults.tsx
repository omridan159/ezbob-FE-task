import React from 'react';
import styles from './SearchResults.module.css';

interface SearchResult {
   title: string;
   description: string;
   url: string;
}

interface Props {
   results: SearchResult[];
   query: string;
   duration: string;
}

const SearchResults: React.FC<Props> = ({ results, query, duration }) => {
   if (!query) return null;

   return (
      <div>
         <p className={styles.meta}>
            {results.length} results for "{query}" in {duration}
         </p>
         <ul className={styles.resultList}>
            {results.map((r) => (
               <li key={r.url} className={styles.resultItem}>
                  <a href={r.url} target="_blank" rel="noreferrer" className={styles.title}>
                     {r.title}
                  </a>
                  <p className={styles.description}>{r.description}</p>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default SearchResults;
