# Sticky Note App

A modern, collaborative sticky note application built with React, TypeScript, and Vite. This application allows teams to create, manage, and organize digital sticky notes with member-specific colors and priorities.

## Features

### Note Management
- Create and position sticky notes anywhere on the canvas
- Edit note content in real-time
- Delete notes with a single click
- Mark notes as completed
- Set note priorities (Low, Medium, High)
- Drag and drop functionality for note positioning
- Notes inherit active member's colors for visual organization

### Member System
- Add team members with customizable colors
- Member-specific note styling:
  - Header color
  - Body color (automatically lightened from header color)
  - Text color (#18181A)
- Visual member selection with active state:
  - White outline around active member's color
  - Click to select/deselect member
  - Error feedback when creating notes without active member
  - State managed locally in Controls component
  - Changes propagated to parent via callbacks
- Member attribution for notes
- Clean component hierarchy with proper prop passing
- Proper separation of member identity and note colors

### Modern UI/UX
- Responsive design
- Smooth animations and transitions
- Color palette selection
- Error handling with modal feedback:
  - Dark background (#35363e)
  - White text with medium weight
  - Consistent box shadow
  - Smooth fade animation
  - Close icon button
  - Overlay click to close
  - Properly isolated from other click events
- Clean and intuitive interface
- Consistent styling with styled-components
- Proper event propagation control
- Smooth fade animations for modals
- rem units for consistent spacing

### Performance Optimizations
- Component Memoization:
  - NoteCard wrapped with React.memo
  - Prevents re-renders when props haven't changed
  - Especially important for note list rendering
- Callback Optimizations:
  - Event handlers memoized with useCallback
  - Improved dependency arrays in NotesPage
  - Reduced unnecessary function recreations
- Note Filtering:
  - Optimized useMemo dependency array
  - Only re-filters when notes or activeMember.id changes
  - Prevents unnecessary filtering operations
- Event Handler Improvements:
  - Debounced note saving (500ms timeout)
  - Memoized click handlers
  - Better event propagation control
- State Management:
  - Efficient updates using functional setState
  - Proper cleanup of timeouts
  - Optimized localStorage interactions
- Code Splitting:
  - Lazy loaded modals using React.lazy
  - Modals only load when needed
  - Smaller initial bundle size
  - Proper Suspense boundaries
  - Centralized modal exports in modals/index.ts

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
│   ├── __tests__/     # Component tests
│   └── modals/        # Modal components
├── services/          # Business logic and hooks
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

### First-Time User Experience

When you first open the application, you'll see a welcome note with the following instructions:

```
Welcome to Sticky Notes! 📝

🎯 Quick Tips:

1. Add Team Members:
   • Click the "+" button
   • Enter their name and pick a color

2. Add a New Note:
   • Select a member color on the Control panel and click anywhere on the canvas

3. Filter Notes by Member:
   • Click a member's color
   • The notes will be filtered to show only notes assigned to that member
   • To remove the filter select the same member again

4. Assign Priority:
   • Click on the dot next to the Member name on the note
   • This will toggle between different Priority states

Try it out! Drag me around and create more notes!
```

This initial note demonstrates key features:
- Draggable functionality
- Member color styling
- Note formatting
- Priority system
- Interactive instructions

### Running Tests

```bash
npm test
# or
yarn test
```

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
  - Error handling for invalid states
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

### Input
Form input component with built-in validation and styling.
- Props:
  - `label`: Optional input label
  - `error`: Error message display
  - `fullWidth`: Width control option
- Features:
  - Error state styling
  - Label support
  - Customizable width
  - Consistent styling

### Modals
- **AddMemberModal**: 
  - Member creation interface
  - Name input validation
  - Color selection
  - Form state management
  - Error handling
  - Smooth animations
- **ErrorModal**: 
  - Error message display
  - Dark theme
  - Backdrop blur
  - Click-outside handling
  - Smooth fade animation

### Portal Implementation
All modals use React Portal for optimal rendering:
- Direct rendering to document.body
- Proper stacking context management
- Improved accessibility
- Clean DOM structure
- No interference with main app layout

Features:
- Semi-transparent overlay with blur effect
- Centered positioning
- Dark theme (#35363e background)
- Consistent box shadows
- Smooth transitions and animations
- Responsive padding and margins
- Proper event isolation
- z-index management

## State Management

The application uses React's built-in state management with hooks:
- `useNotes`: Manages note data and operations
- `useMembers`: Handles member management
- Local component state for UI interactions
- Optimized state updates with proper dependency management

## Testing Strategy

The application follows a comprehensive testing approach:

### Component Tests
- **NoteCard Tests**:
  - Rendering note content
  - Delete functionality
  - Member name display
  - Unassigned state handling
  - Content updates

- **Controls Tests**:
  - Add member button rendering
  - Member color button display
  - Member selection functionality
  - Error state handling

- **Input Tests**:
  - Label rendering
  - Error message display
  - Value changes
  - Disabled state
  - Full width styling
  - Props forwarding

- **ColorPalette Tests**:
  - Color button rendering
  - Selection handling
  - Grid layout
  - Hover states
  - Color application

### Testing Best Practices
- Use of data-testid for reliable element selection
- Mock implementations for external dependencies
- Proper cleanup between tests
- Event propagation verification
- Style and animation testing
- Accessibility checks
- Comprehensive coverage of user interactions
- Error state validation
- Props and callback verification

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Future Improvements

### Backend Integration
- Replace localStorage with Real Database:
  - Implement RESTful API endpoints:
    * GET /api/notes - Fetch all notes
    * POST /api/notes - Create new note
    * PUT /api/notes/:id - Update note
    * DELETE /api/notes/:id - Delete note
    * GET /api/members - Fetch all members
    * POST /api/members - Create new member
  - Add proper error handling for API calls:
    * Network failures
    * Validation errors
    * Rate limiting
    * Authentication errors
  - Implement retry mechanisms:
    * Exponential backoff
    * Request queuing
    * Failure recovery
  - Add loading states for async operations:
    * Skeleton loading for notes
    * Progress indicators for actions
    * Optimistic updates
- Performance Optimizations:
  - Implement caching for API responses:
    * In-memory cache for frequent requests
    * Service worker for offline support
    * Cache invalidation strategies
  - Add request debouncing:
    * Note position updates
    * Content changes
    * Filter operations
  - Implement optimistic updates:
    * Note creation
    * Position changes
    * Member assignments
  - Add offline support with service workers:
    * Offline-first architecture
    * Background sync
    * Conflict resolution

### Task Management Improvements
- Task Assignment Features:
  - Add task reassignment functionality:
    * Drag and drop between members
    * Member selection dropdown
    * Bulk reassignment
    * Assignment history tracking
  - Support unassigned tasks:
    * Default gray styling
    * "Unassigned" filter option
    * Self-assignment capability
    * Task claiming with confirmation
  - Add task metadata:
    * Time estimates
    * Due dates
    * Priority levels
    * Dependencies
  - Task organization:
    * Grouping by status
    * Sorting options
    * Custom filters
    * Saved views
- Task Workflow:
  - Status tracking:
    * Custom status workflows
    * Status change history
    * Automatic transitions
  - Time management:
    * Time tracking
    * Progress indicators
    * Burndown charts
    * Capacity planning
  - Notifications:
    * Assignment notifications
    * Due date reminders
    * Status change alerts
    * @mentions

### Testing Enhancements
- Increase Test Coverage:
  - Add tests for remaining components:
    * AddMemberModal portal rendering and form validation
    * ErrorModal backdrop interactions
    * TaskPriorityKey component
    * Typography component
  - Implement integration tests for complex workflows:
    * Member creation to note assignment flow
    * Note filtering and member selection
    * Priority changes and completion states
  - Add snapshot testing for UI components:
    * Color variations in notes
    * Modal animations and transitions
    * Member color button states
  - Test error boundaries and edge cases:
    * Network failures
    * Invalid color values
    * Member deletion with assigned notes
  - Test performance optimizations:
    * Verify React.memo effectiveness
    * Test useMemo dependency optimizations
    * Validate callback memoization
- End-to-End Testing:
  - Implement E2E tests using Playwright:
    * Test drag and drop functionality
    * Verify modal interactions
    * Test member color selection
    * Validate note positioning
  - Add Cucumber for behavior-driven development:
    * Define feature files for core functionality
    * Create step definitions
    * Add test scenarios for:
      - Member management
      - Note creation and editing
      - Priority management
      - Filtering and organization
  - Create test scenarios for common user journeys:
    * First-time user onboarding
    * Team member collaboration
    * Task management workflow
  - Test cross-browser compatibility:
    * Verify styled-components rendering
    * Test modal portals
    * Validate drag and drop
  - Add visual regression testing:
    * Component styling consistency
    * Theme application
    * Animation states
    * Modal transitions

### UI/UX Improvements
- Theme Support:
  - Add light/dark theme toggle:
    * System preference detection
    * Smooth theme transitions
    * Persistent theme choice
    * Automatic color adjustments
  - Implement theme context:
    * ThemeProvider component
    * useTheme hook
    * Theme tokens system
    * Component-level theming
  - Create consistent theme tokens:
    * Color palette system
    * Typography scale
    * Spacing units
    * Shadow levels
    * Border radiuses
  - Add theme persistence:
    * localStorage sync
    * System preference sync
    * User preference override
  - Support system theme preference:
    * Media query listener
    * Auto theme switching
    * Theme preview
    * Reset to system option

### State Management
- Implement Global State:
  - Migrate to Context API:
    * Create separate contexts:
      - NotesContext
      - MembersContext
      - ThemeContext
      - UIContext
    * Custom hooks for each context:
      - useNotes
      - useMembers
      - useTheme
      - useUI
    * Context providers hierarchy
    * Performance optimizations
  - Alternative Redux Implementation:
    * Store configuration:
      - Notes slice
      - Members slice
      - Theme slice
      - UI slice
    * Action creators:
      - Note operations
      - Member management
      - Theme changes
      - UI state updates
    * Middleware setup:
      - Logger
      - Thunk for async
      - Local storage sync
      - Performance monitoring
  - Add proper state persistence:
    * Selective state persistence
    * Migration strategies
    * State rehydration
    * Error recovery
  - Implement undo/redo functionality:
    * Action history
    * State snapshots
    * Batch operations
    * Memory optimization
  - Add state debugging tools:
    * Redux DevTools integration
    * Action logging
    * State time-travel
    * Performance profiling
  - Optimize state updates:
    * Memoization strategies
    * Selector optimization
    * Batch updates
    * React.Suspense integration

### Additional Features
- Member Management:
  - Add member roles and permissions:
    * Role-based access control
    * Custom permissions
    * Team leads and admins
    * Audit logging
  - Implement member availability status:
    * Real-time status updates
    * Capacity indicators
    * Time zone support
    * Away messages
  - Add member workload tracking:
    * Task count metrics
    * Time allocation
    * Burndown charts
    * Capacity warnings
  - Support team organization:
    * Multiple teams
    * Team hierarchies
    * Cross-team collaboration
    * Team dashboards
  - Member color management:
    * Custom color palettes
    * Color validation
    * Automatic contrast checking
    * Color scheme templates

- Task Enhancements:
  - Add file attachments:
    * Drag and drop upload
    * File preview
    * Size limitations
    * Progress indicators
  - Support rich text editing:
    * Markdown support
    * Code snippets
    * Checklists
    * Tables
  - Add task comments:
    * Threaded discussions
    * @mentions
    * File attachments
    * Emoji reactions
  - Implement task templates:
    * Predefined workflows
    * Custom fields
    * Template categories
    * Bulk creation
  - Add recurring tasks:
    * Schedule configuration
    * Exception handling
    * Series management
    * Template updates

- Collaboration:
  - Add real-time updates:
    * WebSocket integration
    * Presence indicators
    * Concurrent editing
    * Change notifications
  - Implement collaborative editing:
    * Operational transforms
    * Conflict resolution
    * Version history
    * Change highlighting
  - Add activity history:
    * Audit trails
    * Change logs
    * User attribution
    * Timeline view
  - Support @mentions:
    * User suggestions
    * Team mentions
    * Email notifications
    * Mobile push
  - Add notifications:
    * Custom preferences
    * Delivery channels
    * Batch notifications
    * Mute options

### Performance Optimizations
- Caching and Data Management:
  - Implement service worker caching:
    * Static assets
    * API responses
    * Offline support
    * Cache invalidation
  - Add request caching:
    * In-memory cache
    * Persistent storage
    * Cache strategies
    * TTL management
  - Optimize bundle size:
    * Code splitting
    * Tree shaking
    * Dynamic imports
    * Asset optimization
  - Add code splitting for routes:
    * Lazy loading
    * Prefetching
    * Route-based chunks
    * Component libraries
  - Implement virtual scrolling:
    * Window virtualization
    * Infinite scroll
    * Placeholder rendering
    * Scroll position restoration

- Component Optimizations:
  - Enhanced memoization:
    * React.memo with custom comparators
    * useMemo dependency optimization
    * Callback memoization
    * Props normalization
  - Event handler improvements:
    * Debounced updates
    * Throttled events
    * Event delegation
    * Cleanup optimization
  - State updates batching:
    * Transaction batching
    * State coalescing
    * Update prioritization
    * React.Suspense integration

### Analytics and Monitoring
- Add Performance Monitoring:
  - Implement error tracking:
    * Error boundary logging
    * API error tracking
    * Performance bottlenecks
    * User experience issues
  - Add usage analytics:
    * Feature adoption rates
    * User engagement metrics
    * Drop-off points
    * Session duration
  - Track performance metrics:
    * Load times
    * Time to interactive
    * First contentful paint
    * Largest contentful paint
  - Monitor API response times:
    * Endpoint latency
    * Cache hit rates
    * Error rates
    * Network performance
- User Analytics:
  - Track feature usage:
    * Most used features
    * Feature combinations
    * User workflows
    * Time spent per feature
  - Implement A/B testing:
    * UI variations
    * Feature experiments
    * Performance improvements
    * User preferences
  - Add user feedback collection:
    * In-app surveys
    * Feature requests
    * Bug reports
    * Satisfaction scores
  - Monitor user engagement:
    * Active users
    * Session frequency
    * Task completion rates
    * User retention

### Documentation
- Enhance Documentation:
  - Add API documentation:
    * OpenAPI/Swagger specs
    * Authentication flows
    * Rate limiting
    * Error codes
  - Create user guides:
    * Getting started
    * Advanced features
    * Best practices
    * Troubleshooting
  - Add component storybook:
    * Interactive examples
    * Props documentation
    * Theme variations
    * Usage guidelines
  - Include setup guides:
    * Development setup
    * Production deployment
    * Environment configuration
    * CI/CD pipelines
  - Document best practices:
    * Code style guide
    * Testing strategies
    * Performance tips
    * Security guidelines

### Accessibility Improvements
- ARIA Implementation:
  - Add proper ARIA roles:
    * Modal dialogs
    * Navigation elements
    * Form controls
    * Live regions
  - Implement keyboard navigation:
    * Focus management
    * Keyboard shortcuts
    * Focus trapping in modals
    * Skip links
  - Add screen reader support:
    * Descriptive labels
    * Status announcements
    * Error messages
    * Dynamic content updates
- Color and Contrast:
  - Implement high contrast mode:
    * WCAG 2.1 compliance
    * Custom color schemes
    * Text contrast ratios
    * Focus indicators
  - Add color blindness support:
    * Alternative color schemes
    * Pattern differentiation
    * Icon support
    * Non-color indicators
- Motion and Animation:
  - Respect reduced motion:
    * Motion preferences
    * Alternative transitions
    * Static alternatives
    * Smooth degradation
  - Add animation controls:
    * Pause/play options
    * Speed controls
    * Skip animations
    * Progress indicators

These improvements would enhance the application's functionality, reliability, and user experience while making it more suitable for production use in larger teams and ensuring accessibility for all users.
