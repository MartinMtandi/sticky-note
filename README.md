# Sticky Note App

A modern, collaborative sticky note application built with React and TypeScript.

## Project Architecture

### Core Components
- `NotesPage`: Main container managing notes display and member-based filtering
- `NoteCard`: Interactive note component with drag-and-drop and member colors
- `Controls`: Member selection and filtering with visual feedback
- `Button`: Multi-variant button system with consistent styling
- `ColorPalette`: Member color selection with real-time preview

### State Management
- Global contexts for notes and members state
- Local storage persistence for data
- Member-based filtering with useMemo optimization
- Proper event propagation control

## Important Fixtures

### Button System
```typescript
// Button variants with consistent transitions (0.2s ease)
type ButtonVariant = 'primary' | 'secondary' | 'add' | 'delete' | 'close'

// Primary/Secondary
- Primary: Green (#66bb6a), rectangular
- Secondary: Transparent with border
- Both support text content
- 6px border radius

// Icon Buttons
- Add: 40px circular, gray (rgba(107, 107, 107, 1))
- Delete: Transparent with trash icon, 4px padding
- Close: Circular with dark/light modes, 8px padding
```

### Member Integration
```typescript
interface Member {
  id: string
  name: string
  colorHeader: string
  colorBody: string
  colorText: string
}

// Active Member Features
- Visual selection with white outline
- Click to select/deselect
- New notes inherit member colors
- Real-time note filtering
```

## Quick Guide

### Installation
```bash
npm install
npm run dev
```

### Core Features
1. Add members with custom colors
2. Select member (shows white outline)
3. Create notes (inherits member colors)
4. Set priorities (low/medium/high)
5. Filter by member
6. Mark notes complete

## Performance

### Optimizations
- Memoized components (React.memo)
- Debounced note updates (500ms)
- Lazy-loaded modals
- Efficient filtering (useMemo)
- Local storage caching

### Best Practices
- Event delegation
- Proper cleanup
- Smart re-rendering
- Consistent transitions

## Future Improvements

### Features
1. Role based permissions
2. Rich text editing
3. Categories/tags
4. Search functionality
5. Note sharing

### Technical
1. Real-time collaboration
2. Offline support
3. Backend integration
4. Keyboard shortcuts

### Testing
1. E2E tests (Playwright & Cucumber)
2. Visual regression
3. Performance metrics
4. Accessibility testing
5. Coverage increase

## Tech Stack

- **React 18**: Frontend framework
- **TypeScript**: Type safety and better developer experience
- **Vite**: Fast build tool and development server
- **Styled Components**: CSS-in-JS styling
- **Vitest**: Unit testing framework
- **React Testing Library**: Component testing
- **ESLint**: Code linting and style enforcement

## Project Structure

```
src/
├── components/         # React components
│   ├── __tests__/       # Modal components
├── context/          # Business logic and hooks
├── utils/            # Helper functions and types
├── styles/           # Global styles
└── App.tsx           # Main application component
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Component Documentation

### NoteCard
The main component for displaying and managing individual notes.
- Props:
  - `note`: Note data (position, colors, content)
  - `onDelete`: Callback for note deletion
  - `onUpdate`: Callback for note updates
- Features:
  - Real-time content editing
  - Drag and drop positioning
  - Member color inheritance
  - Completion status toggle
  - Priority selection

### Controls
Manages member selection and note creation.
- Features:
  - Add new members
  - Select/deselect active member
  - Member color customization
  - Local state management
  - Callback propagation to parent
  - Visual feedback for member selection

### ColorPalette
Color selection component with predefined color options.
- Props:
  - `selectedColor`: Currently selected color
  - `onColorSelect`: Color selection callback
- Features:
  - Grid layout of color options
  - Visual selection feedback
  - Hover and active states
  - Smooth transitions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
