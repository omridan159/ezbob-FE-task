import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SearchResults from '../../components/SearchResults/SearchResults';
import { useSearchQuery } from '../../queries/search';
import styles from './ResultsPage.module.css';

const ResultsPage: React.FC = () => {
   const location = useLocation();
   const searchParams = new URLSearchParams(location.search);
   const initialQuery = searchParams.get('q') || '';

   const [page, setPage] = useState(1); // Track the current page
   const { data, isLoading, isError, error } = useSearchQuery(initialQuery, page);

   const handleNextPage = () => setPage((prev) => prev + 1);
   const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));

   return (
      <div className={styles.resultsPageContainer}>
         {isLoading && <p className={styles.loading}>Loading...</p>}
         {isError && <p className={styles.error}>{error instanceof Error ? error.message : 'Something went wrong!'}</p>}

         {data && (
            <>
               <SearchResults results={data.results} query={initialQuery} duration={data.duration} />
               <div className={styles.pagination}>
                  <button onClick={handlePreviousPage} disabled={page === 1}>
                     Previous
                  </button>
                  <span>
                     Page {page} of {data.totalPages}
                  </span>
                  <button onClick={handleNextPage} disabled={page === data.totalPages}>
                     Next
                  </button>
               </div>
            </>
         )}
      </div>
   );
};

export default ResultsPage;
