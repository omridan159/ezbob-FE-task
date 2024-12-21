import { api } from '../api';

export type SearchResult = {
   title: string;
   description: string;
   url: string;
};

export type SearchResponse = {
   query: string;
   count: number;
   duration: string;
   results: SearchResult[];
   page: number;
   totalPages: number;
};

export type AutocompleteItem = {
   title: string;
};

export async function searchQuery(query: string, page: number = 1, limit: number = 3): Promise<SearchResponse> {
   const response = await api.get<SearchResponse>('/search', {
      queryParams: { query, page, limit }
   });
   return response.data;
}

export async function getAutocompleteSuggestions(query: string): Promise<AutocompleteItem[]> {
   if (!query.trim()) {
      return [];
   }

   const response = await api.get<AutocompleteItem[]>('/search/autocomplete', {
      queryParams: { query }
   });
   return response.data;
}
