import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchStoreState {
   searchHistory: string[];
   addToHistory: (query: string) => void;
   removeFromHistory: (query: string) => void;
}

export const useSearchStore = create<SearchStoreState>()(
   persist(
      (set) => ({
         searchHistory: [],
         addToHistory: (query) =>
            set((state) => ({
               searchHistory: [...state.searchHistory, query]
            })),
         removeFromHistory: (query) =>
            set((state) => ({
               searchHistory: state.searchHistory.filter((item) => item.toLowerCase() !== query.toLowerCase())
            }))
      }),
      {
         name: 'search-history'
      }
   )
);
