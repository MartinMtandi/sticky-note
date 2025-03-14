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
  top: ${({ $floating, theme }) => ($floating ? "0" : theme.spacing.md)};
  left: ${({ $floating, theme }) => ($floating ? `calc(100% + ${theme.spacing.xl})` : "auto")};
  right: ${({ $floating, theme }) => ($floating ? "auto" : theme.spacing.md)};
  background: ${({theme}) => theme.colors.ui.dark};
  padding: ${({theme}) => theme.spacing.md};
  border-radius: ${({theme}) => theme.borderRadius.md};
  box-shadow: ${({theme}) => theme.shadows.md};
  width: ${({theme}) => theme.sizes.searchSize};
  z-index: 10001;
  transform: ${({ $floating }) => ($floating ? "translateY(0%)" : "none")};
`;

const SearchInput = styled.input`
  width: calc(100% - ${({theme}) => theme.spacing.md});
  padding: ${({theme}) => theme.spacing.sm};
  border-radius: ${({theme}) => theme.borderRadius.sm};
  border: none;
  background: ${({theme}) => theme.colors.input.background};
  color: ${({theme}) => theme.colors.input.text};
  font-size: ${({theme}) => theme.typography.fontSizes.sm};

  &:focus {
    outline: none;
    box-shadow: ${({theme}) => theme.shadows.xs};
  }
`;

const ResultsContainer = styled.div`
  margin-top: ${({theme}) => theme.spacing.m};
  max-height: 200px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${({theme}) => theme.colors.ui.dark};
    border-radius: ${({theme}) => theme.borderRadius.sm};
  }
  
  &::-webkit-scrollbar-track {
    background-color: ${({theme}) => theme.colors.ui.dark};
    border-radius: ${({theme}) => theme.borderRadius.sm};
  }
`;

const SearchResult = styled.div`
  display: flex;
  align-items: center;
  padding: ${({theme}) => theme.spacing.sm};
  cursor: pointer;
  border-radius: ${({theme}) => theme.borderRadius.sm};
  transition: background-color ${({theme}) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({theme}) => theme.colors.input.background};
  }
  
  span {
    color: ${({theme}) => theme.colors.input.text};
    font-size: ${({theme}) => theme.typography.fontSizes.sm};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const MemberDot = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: ${({theme}) => theme.borderRadius.round};
  background-color: ${props => props.$color};
  margin-right: ${({theme}) => theme.spacing.sm};
  flex-shrink: 0;
`;

const NoResults = styled.div`
  color: ${({theme}) => theme.colors.text.tertiary};
  text-align: center;
  padding: ${({theme}) => theme.spacing.sm};
  font-size: ${({theme}) => theme.typography.fontSizes.sm};
`;

export default SearchBox;
