import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchStore } from '../../store';
import styles from './SearchInput.module.css';

interface Props {
   onSearch: (query: string) => void;
   suggestions: { title: string }[];
   query: string;
   setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput: React.FC<Props> = ({ onSearch, suggestions, query, setQuery }) => {
   const { searchHistory, addToHistory, removeFromHistory } = useSearchStore();
   const [selectedIndex, setSelectedIndex] = useState<number>(-1);
   const navigate = useNavigate();

   const [showSuggestions, setShowSuggestions] = useState(false);
   const inputRef = useRef<HTMLInputElement>(null);

   useEffect(() => {
      inputRef.current?.focus();
   }, []);

   const handleEnterKeyForQuery = () => {
      onSearch(query.trim());
      addToHistory(query.trim());
      navigate(`/results?q=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
   };

   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!showSuggestions || suggestions.length === 0) {
         // If no suggestions are shown, fallback to normal Enter logic
         if (e.key === 'Enter' && query.trim()) {
            handleEnterKeyForQuery();
         }
         return;
      }

      switch (e.key) {
         case 'ArrowDown':
            e.preventDefault();
            setSelectedIndex((prevIndex) => (prevIndex + 1 < suggestions.length ? prevIndex + 1 : 0));
            break;

         case 'ArrowUp':
            e.preventDefault();
            setSelectedIndex((prevIndex) => (prevIndex - 1 >= 0 ? prevIndex - 1 : suggestions.length - 1));
            break;

         case 'Enter':
            e.preventDefault();
            if (selectedIndex !== -1) {
               handleSelectSuggestion(suggestions[selectedIndex].title);
            } else if (query.trim()) {
               handleEnterKeyForQuery();
            }
            break;

         default:
            break;
      }
   };

   const handleBlur = () => {
      setTimeout(() => setShowSuggestions(false), 200);
   };

   const handleFocus = () => {
      if (suggestions.length > 0) {
         setShowSuggestions(true);
      }
   };

   const handleSelectSuggestion = (selected: string) => {
      setQuery(selected);
      onSearch(selected);
      addToHistory(selected);
      navigate(`/results?q=${encodeURIComponent(selected)}`);
      setShowSuggestions(false);
   };

   const handleDeleteHistory = (item: string) => {
      removeFromHistory(item);
   };

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      if (value.trim()) {
         setShowSuggestions(true);
      } else {
         setShowSuggestions(false);
      }
   };

   return (
      <div className={styles.searchContainer}>
         <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            onFocus={handleFocus}
            placeholder="Search here..."
            className={styles.input}
         />

         {showSuggestions && suggestions.length > 0 && (
            <ul className={styles.suggestions}>
               {suggestions.slice(0, 10).map((item, index) => {
                  const isSelected = index === selectedIndex;
                  const isInHistory = searchHistory.some((h) => h.toLowerCase() === item.title.toLowerCase());
                  return (
                     <li key={item.title} className={`${styles.suggestion} ${isSelected ? styles.selected : ''}`}>
                        <span
                           className={isInHistory ? styles.inHistory : ''}
                           onClick={() => handleSelectSuggestion(item.title)}
                        >
                           {item.title}
                        </span>
                        {isInHistory && (
                           <button className={styles.removeBtn} onClick={() => handleDeleteHistory(item.title)}>
                              Remove
                           </button>
                        )}
                     </li>
                  );
               })}
            </ul>
         )}
      </div>
   );
};

export default SearchInput;
