import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { useMembers } from '../useMembers'

describe('useMembers', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should initialize with empty members array', () => {
    const { result } = renderHook(() => useMembers())
    expect(result.current.members).toEqual([])
  })

  it('should add a new member', () => {
    const { result } = renderHook(() => useMembers())
    
    act(() => {
      result.current.addMember({
        name: 'Test Member',
        colorHeader: '#FF0000',
        colorBody: '#FFE0E0',
        colorText: '#333333'
      })
    })

    expect(result.current.members).toHaveLength(1)
    expect(result.current.members[0]).toMatchObject({
      name: 'Test Member',
      colorHeader: '#FF0000',
      colorBody: '#FFE0E0',
      colorText: '#333333'
    })
    expect(result.current.members[0].id).toMatch(/^member-\d+$/)
  })

  it('should update an existing member', () => {
    const { result } = renderHook(() => useMembers())
    
    act(() => {
      result.current.addMember({
        name: 'Test Member',
        colorHeader: '#FF0000',
        colorBody: '#FFE0E0',
        colorText: '#333333'
      })
    })

    const memberId = result.current.members[0].id

    act(() => {
      result.current.updateMember(memberId, {
        id: memberId,
        name: 'Updated Member',
        colorHeader: '#00FF00',
        colorBody: '#E0FFE0',
        colorText: '#333333'
      })
    })

    expect(result.current.members[0]).toMatchObject({
      id: memberId,
      name: 'Updated Member',
      colorHeader: '#00FF00',
      colorBody: '#E0FFE0',
      colorText: '#333333'
    })
  })

  it('should delete a member', () => {
    const { result } = renderHook(() => useMembers())
    
    act(() => {
      result.current.addMember({
        name: 'Test Member',
        colorHeader: '#FF0000',
        colorBody: '#FFE0E0',
        colorText: '#333333'
      })
    })

    const memberId = result.current.members[0].id

    act(() => {
      result.current.deleteMember(memberId)
    })

    expect(result.current.members).toHaveLength(0)
  })

  it('should get member by id', () => {
    const { result } = renderHook(() => useMembers())
    
    act(() => {
      result.current.addMember({
        name: 'Test Member',
        colorHeader: '#FF0000',
        colorBody: '#FFE0E0',
        colorText: '#333333'
      })
    })

    const memberId = result.current.members[0].id
    const member = result.current.getMember(memberId)

    expect(member).toMatchObject({
      id: memberId,
      name: 'Test Member',
      colorHeader: '#FF0000',
      colorBody: '#FFE0E0',
      colorText: '#333333'
    })
  })

  it('should persist members in localStorage', () => {
    const { result } = renderHook(() => useMembers())
    
    act(() => {
      result.current.addMember({
        name: 'Test Member',
        colorHeader: '#FF0000',
        colorBody: '#FFE0E0',
        colorText: '#333333'
      })
    })

    const storedMembers = JSON.parse(localStorage.getItem('sticky-notes-members') || '[]')
    expect(storedMembers).toHaveLength(1)
    expect(storedMembers[0]).toMatchObject({
      name: 'Test Member',
      colorHeader: '#FF0000',
      colorBody: '#FFE0E0',
      colorText: '#333333'
    })
    expect(storedMembers[0].id).toMatch(/^member-\d+$/)
  })
})
