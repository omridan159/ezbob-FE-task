export const enum QueryKeyPrefix {
   getSearch = 'getSearch',
   getAutocomplete = 'getAutocomplete'
}

export const SimpleQueryKey = {
   getSearch: [QueryKeyPrefix.getSearch],
   getAutocomplete: [QueryKeyPrefix.getAutocomplete]
} as const;

export const QueryKeyFactory = {
   getSearch: (query: string, page: number) => [QueryKeyPrefix.getSearch, query, page],
   getAutocomplete: (query: string) => [QueryKeyPrefix.getAutocomplete, query]
} as const;
