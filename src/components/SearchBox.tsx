import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { SearchBoxProps } from "../utils/types";

const SearchBox = <T extends { id: string; name: string; colorHeader: string }>({
  data,
  searchQuery,
  setSearchQuery,
  onSearch,
  placeholder,
  floating = false,
  filterFunction,
  onResultClick,
}: SearchBoxProps<T>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Auto-focus when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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

  // Filter members based on the search query
  const filteredMembers = searchQuery.trim() 
    ? data.filter(item => filterFunction(item, searchQuery)) 
    : [];

  return (
    <SearchContainer $floating={floating} onClick={e => e.stopPropagation()}>
      <SearchInput
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleSearchInputChange}
        ref={inputRef}
      />
      
      {(searchQuery.trim() !== "" && floating) && (
        <ResultsContainer>
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <SearchResult 
                key={member.id}
                onClick={() => onResultClick && onResultClick(member)}
              >
                <MemberDot $color={member.colorHeader} />
                <span>{member.name}</span>
              </SearchResult>
            ))
          ) : (
            <NoResults>No members found</NoResults>
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
  }
`;

const MemberDot = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.$color};
  margin-right: 0.5rem;
`;

const NoResults = styled.div`
  color: #9ca3af;
  text-align: center;
  padding: 0.5rem;
  font-size: 0.875rem;
`;

export default SearchBox;
