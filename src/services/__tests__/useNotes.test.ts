import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { useNotes } from '../useNotes'
import { Note } from '../../utils/types'

describe('useNotes', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should initialize with welcome note when no saved notes exist', () => {
    const { result } = renderHook(() => useNotes())
    
    expect(result.current.notes).toHaveLength(1)
    expect(result.current.notes[0]).toMatchObject({
      body: expect.stringContaining('Welcome to Sticky Notes!'),
      colors: {
        colorHeader: "#FED0FD",
        colorBody: "#FEE5FD",
        colorText: "#18181A",
      },
      position: { x: 300, y: 50 }
    })
  })

  it('should load existing notes from localStorage', () => {
    const existingNotes: Note[] = [{
      $id: 1,
      body: 'Test Note',
      colors: {
        colorHeader: '#FF0000',
        colorBody: '#FFE0E0',
        colorText: '#333333'
      },
      position: { x: 100, y: 100 }
    }]
    localStorage.setItem('sticky-notes-data', JSON.stringify(existingNotes))

    const { result } = renderHook(() => useNotes())
    
    expect(result.current.notes).toHaveLength(1)
    expect(result.current.notes[0]).toMatchObject(existingNotes[0])
  })

  it('should add a new note', () => {
    const { result } = renderHook(() => useNotes())
    
    const newNote = {
      body: 'New Test Note',
      colors: {
        colorHeader: '#FF0000',
        colorBody: '#FFE0E0',
        colorText: '#333333'
      },
      position: { x: 100, y: 100 }
    }

    act(() => {
      result.current.addNote(newNote)
    })

    // Should have 2 notes (welcome note + new note)
    expect(result.current.notes).toHaveLength(2)
    expect(result.current.notes[1]).toMatchObject(newNote)
    expect(result.current.notes[1].$id).toBeDefined()

    // Check localStorage persistence
    const storedNotes = JSON.parse(localStorage.getItem('sticky-notes-data') || '[]')
    expect(storedNotes).toHaveLength(2)
    expect(storedNotes[1]).toMatchObject(newNote)
  })

  it('should update an existing note', () => {
    const { result } = renderHook(() => useNotes())
    
    // Add a note first
    const newNote = {
      body: 'Original Note',
      colors: {
        colorHeader: '#FF0000',
        colorBody: '#FFE0E0',
        colorText: '#333333'
      },
      position: { x: 100, y: 100 }
    }

    act(() => {
      result.current.addNote(newNote)
    })

    const noteToUpdate = {
      ...result.current.notes[1],
      body: 'Updated Note',
      position: { x: 200, y: 200 }
    }

    act(() => {
      result.current.updateNote(noteToUpdate)
    })

    expect(result.current.notes[1]).toMatchObject({
      ...noteToUpdate,
      $id: expect.any(Number)
    })

    // Check localStorage persistence
    const storedNotes = JSON.parse(localStorage.getItem('sticky-notes-data') || '[]')
    expect(storedNotes[1]).toMatchObject(noteToUpdate)
  })

  it('should delete a note', () => {
    const { result } = renderHook(() => useNotes())
    
    // Add a note first
    const newNote = {
      body: 'Note to Delete',
      colors: {
        colorHeader: '#FF0000',
        colorBody: '#FFE0E0',
        colorText: '#333333'
      },
      position: { x: 100, y: 100 }
    }

    act(() => {
      result.current.addNote(newNote)
    })

    const noteId = result.current.notes[1].$id

    act(() => {
      result.current.deleteNote(noteId)
    })

    // Should only have welcome note
    expect(result.current.notes).toHaveLength(1)
    expect(result.current.notes[0].body).toContain('Welcome to Sticky Notes!')

    // Check localStorage persistence
    const storedNotes = JSON.parse(localStorage.getItem('sticky-notes-data') || '[]')
    expect(storedNotes).toHaveLength(1)
    expect(storedNotes[0].body).toContain('Welcome to Sticky Notes!')
  })

  it('should handle note with priority and member', () => {
    const { result } = renderHook(() => useNotes())
    
    const noteWithPriorityAndMember = {
      body: 'Test Note',
      colors: {
        colorHeader: '#FF0000',
        colorBody: '#FFE0E0',
        colorText: '#333333'
      },
      position: { x: 100, y: 100 },
      priority: 'HIGH' as const,
      memberId: 'test-member-id'
    }

    act(() => {
      result.current.addNote(noteWithPriorityAndMember)
    })

    expect(result.current.notes[1]).toMatchObject({
      ...noteWithPriorityAndMember,
      $id: expect.any(Number)
    })
  })
})
