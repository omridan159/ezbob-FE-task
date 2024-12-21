import { useQuery } from '@tanstack/react-query';
import { getAutocompleteSuggestions, searchQuery, SearchResponse } from '../services/search';
import { QueryKeyFactory } from './keys';

export const useSearchQuery = (query: string, page: number = 1) => {
   return useQuery<SearchResponse, Error>({
      queryKey: QueryKeyFactory.getSearch(query, page),
      queryFn: () => searchQuery(query, page),
      enabled: !!query
   });
};

export const useAutocompleteQuery = (query: string) => {
   return useQuery({
      queryKey: QueryKeyFactory.getAutocomplete(query),
      queryFn: () => getAutocompleteSuggestions(query),
      enabled: !!query
   });
};
