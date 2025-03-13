import { Priority } from './constants';

interface NotePosition {
    x: number;
    y: number;
}

export interface NoteColors {
    colorHeader: string;
    colorBody: string;
    colorText: string;
}

export interface Note {
    $id: number;
    body: string;
    colors: NoteColors;
    position: NotePosition;
    memberId?: string;
    priority?: Priority;
    completed?: boolean;
}

export interface ColorProps {
    color: NoteColors;
}

export interface Member extends NoteColors {
    id: string;
    name: string;
}

export interface SearchBoxProps<T> {
    data: T[];
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    onSearch: (filteredData: T[]) => void;
    placeholder: string;
    floating?: boolean; // Controls floating behavior
    filterFunction: (item: T, query: string) => boolean;
    onResultClick?: (item: T) => void; // Optional callback when a search result is clicked
    renderItem?: (item: T) => React.ReactNode; // Optional custom render function for search results
}