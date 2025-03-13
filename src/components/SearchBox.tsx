import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { SearchBoxProps } from "../utils/types";

// Define a common interface for objects we might search through
interface SearchableItem {
  id?: number;
  $id?: number;
  colorHeader?: string;
  name?: string;
  body?: string;
  colors?: {
    colorHeader?: string;
  };
}

const SearchBox = <T extends SearchableItem>({
  data,
  searchQuery,
  setSearchQuery,
  onSearch,
  placeholder,
  floating = false,
  filterFunction,
  onResultClick,
  renderItem,
  onToggle,
}: SearchBoxProps<T>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Auto-focus when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Notify parent component that search box is visible
    if (onToggle) {
      onToggle(true);
    }
    
    // Cleanup function to notify parent when search box is unmounted
    return () => {
      if (onToggle) {
        onToggle(false);
      }
    };
  }, [onToggle]);

  const handleSearchInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearchQuery(query);

      if (!query.trim()) {
        onSearch([]); // Clear search results when empty
      } else {
        onSearch(data.filter(item => filterFunction(item, query)));
      }
    },
    [data, onSearch, setSearchQuery, filterFunction]
  );

  // Filter items based on the search query
  const filteredItems = searchQuery.trim() 
    ? data.filter(item => filterFunction(item, searchQuery)) 
    : [];

  // Default render function for items if custom renderItem is not provided
  const defaultRenderItem = (item: T) => {
    // Try to extract a color for the dot
    const color = 
      item.colorHeader || 
      (item.colors && item.colors.colorHeader) || 
      "#cccccc";
    
    // Try to extract a name/title for the item
    const title = 
      item.name || 
      (item.body ? item.body.substring(0, 30) : "Untitled");
    
    return (
      <>
        <MemberDot $color={color} />
        <span>{title}{item.body && item.body.length > 30 ? "..." : ""}</span>
      </>
    );
  };

  return (
    <SearchContainer $floating={floating} onClick={e => e.stopPropagation()}>
      <SearchInput
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleSearchInputChange}
        ref={inputRef}
      />
      
      {(searchQuery.trim() !== "") && (
        <ResultsContainer>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <SearchResult 
                // Use item.id or item.$id or fall back to index
                key={`search-result-${item.id || item.$id || index}`}
                onClick={() => onResultClick && onResultClick(item)}
              >
                {renderItem ? renderItem(item) : defaultRenderItem(item)}
              </SearchResult>
            ))
          ) : (
            <NoResults>No results found</NoResults>
          )}
        </ResultsContainer>
      )}
    </SearchContainer>
  );
};

// Styled components with improved floating styles for Controls component
const SearchContainer = styled.div<{ $floating: boolean }>`
  position: ${({ $floating }) => ($floating ? "absolute" : "fixed")};
  top: ${({ $floating }) => ($floating ? "0" : "1rem")};
  left: ${({ $floating }) => ($floating ? "calc(100% + 2rem)" : "auto")};
  right: ${({ $floating }) => ($floating ? "auto" : "2rem")};
  background: #35363e;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  z-index: 10001;
  transform: ${({ $floating }) => ($floating ? "translateY(0%)" : "none")};
`;

const SearchInput = styled.input`
  width: calc(100% - 1rem);
  padding: 0.5rem;
  border-radius: 4px;
  border: none;
  background: #2a2b32;
  color: white;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #4d79ff;
  }
`;

const ResultsContainer = styled.div`
  margin-top: 0.75rem;
  max-height: 200px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background-color: #2a2b32;
    border-radius: 4px;
  }
`;

const SearchResult = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #2a2b32;
  }
  
  span {
    color: white;
    font-size: 0.875rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const MemberDot = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.$color};
  margin-right: 0.5rem;
  flex-shrink: 0;
`;

const NoResults = styled.div`
  color: #9ca3af;
  text-align: center;
  padding: 0.5rem;
  font-size: 0.875rem;
`;

export default SearchBox;
