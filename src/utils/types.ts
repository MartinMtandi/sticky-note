import { Priority } from './constants';
import { PRIORITY_COLORS } from './constants';

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
    memberId?: number;
    priority?: Priority;
    completed?: boolean;
    taskStatus?: TaskStatus;
}

export interface ColorProps {
    color: NoteColors;
}

export interface Member extends NoteColors {
    id: number;
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
    onToggle?: (isVisible: boolean) => void; // Optional callback when search visibility changes
}

export interface StyledProps {
    $colors: NoteColors;
}

export interface CardStyledProps extends StyledProps {
    $position: { x: number; y: number };
    $completed?: boolean;
    $visible: boolean;
}

export interface NoteCardProps {
    note: Note;
    onDelete: () => void;
    id?: string;
    className?: string;
    animationDelay?: number;
}

export type ThemeColors = {
  background: string;
  linearGradiant: string;
  text: {
    primary: string;
    secondary: string;
    error: string;
    tertiary: string;
    light: string;
    dark: string;
    accent: string;
  };
  ui: {
    dark: string;
    medium: string;
    light: string;
    superLight: string;
  };
  button: {
    primary: string;
    primaryHover: string;
    secondary: string;
    secondaryHover: string;
  };
  modal: {
    background: string;
    overlay: string;
  };
  input: {
    background: string;
    border: string;
    text: string;
    placeholder: string;
  };
  priority: typeof PRIORITY_COLORS;
};

export type ThemeSpacing = {
  xs: string;
  sm: string;
  m: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
};

export type ThemeBorderRadius = {
  sm: string;
  m: string;
  md: string;
  lg: string;
  xl: string;
  round: string;
};

export type ThemeShadows = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
};

export type ThemeTransitions = {
  fast: string;
  medium: string;
  slow: string;
};

export type ThemeTypography = {
  fontFamily: string;
  fontSizes: {
    x: string;
    xs: string;
    sm: string;
    md: string;
    xm: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
  fontWeights: {
    regular: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeights: {
    tightest: number;
    tighter: number;
    tight: number;
    normal: number;
    relaxed: number;
  };
};

export type ThemeSizes = {
  controlsHeight: string;
  buttonSize: string;
  iconSize: string;
  modalMaxWidth: string;
  backgroundSize: string;
  searchSize: string;
};

export type ThemeZIndices = {
  controls: number;
  modal: number;
  tooltip: number;
  priorityKey: number;
};

export type Theme = {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  shadows: ThemeShadows;
  transitions: ThemeTransitions;
  typography: ThemeTypography;
  sizes: ThemeSizes;
  zIndices: ThemeZIndices;
};

export type TaskStatus = 
    | 'READY_FOR_DEV'
    | 'IN_PROGRESS'
    | 'WAITING_FOR_REVIEW'
    | 'QA'
    | 'READY_FOR_RELEASE'
    | 'BLOCKED'
    | 'DONE';
