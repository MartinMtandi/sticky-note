import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import NoteCard from '../NoteCard'
import * as useNotesModule from '../../services/useNotes'
import * as useMembersModule from '../../services/useMembers'
import { Note } from '../../utils/types'

describe('NoteCard', () => {
  const mockOnDelete = vi.fn()
  const mockUpdateNote = vi.fn()
  const mockGetMember = vi.fn()

  const mockNote: Note = {
    $id: 1,
    body: 'Test note content',
    position: { x: 100, y: 100 },
    colors: {
      colorHeader: '#FF0000',
      colorBody: '#FFE0E0',
      colorText: '#333333'
    },
    memberId: 'member-1'
  }

  beforeEach(() => {
    vi.spyOn(useNotesModule, 'useNotes').mockReturnValue({
      notes: [],
      addNote: vi.fn(),
      updateNote: mockUpdateNote,
      deleteNote: vi.fn()
    })

    vi.spyOn(useMembersModule, 'useMembers').mockReturnValue({
      members: [],
      addMember: vi.fn(),
      updateMember: vi.fn(),
      deleteMember: vi.fn(),
      getMember: mockGetMember
    })

    vi.clearAllMocks()
  })

  it('renders note content correctly', () => {
    render(
      <NoteCard 
        note={mockNote}
        onDelete={mockOnDelete}
      />
    )

    const textArea = screen.getByDisplayValue('Test note content')
    expect(textArea).toBeInTheDocument()
  })

  it('calls onDelete when clicking delete button', () => {
    render(
      <NoteCard 
        note={mockNote}
        onDelete={mockOnDelete}
      />
    )

    const deleteButton = screen.getByRole('button')
    fireEvent.click(deleteButton)

    expect(mockOnDelete).toHaveBeenCalledTimes(1)
  })

  it('shows member name when member exists', () => {
    mockGetMember.mockReturnValue({
      id: 'member-1',
      name: 'Test Member',
      colorHeader: '#FF0000',
      colorBody: '#FFE0E0',
      colorText: '#333333'
    })

    render(
      <NoteCard 
        note={mockNote}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('Test Member')).toBeInTheDocument()
  })

  it('shows "Unassigned" when no member exists', () => {
    mockGetMember.mockReturnValue(null)

    render(
      <NoteCard 
        note={mockNote}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('Unassigned')).toBeInTheDocument()
  })
})
