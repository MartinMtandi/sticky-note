import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { SearchBoxProps } from "../utils/types";

const SearchBox = <T,>({
  data,
  searchQuery,
  setSearchQuery,
  onSearch,
  placeholder,
  floating = false,
  filterFunction,
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

  return (
    <SearchContainer $floating={floating} onClick={e => e.stopPropagation()}>
      <SearchInput
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleSearchInputChange}
        ref={inputRef}
      />
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

export default SearchBox;
