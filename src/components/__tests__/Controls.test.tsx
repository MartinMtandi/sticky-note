import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Controls from '../Controls'
import * as useMembersModule from '../../services/useMembers'

// Mock the AddMemberModal component
vi.mock('../modals/AddMemberModal', () => ({
  default: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => 
    isOpen ? <div data-testid="add-member-modal">
      <button onClick={onClose}>Close Modal</button>
    </div> : null
}))

describe('Controls', () => {
  const mockOnActiveMemberChange = vi.fn()
  const mockMembers = [
    {
      id: 'member-1',
      name: 'Test Member 1',
      colorHeader: '#FF0000',
      colorBody: '#FFE0E0',
      colorText: '#333333'
    }
  ]

  beforeEach(() => {
    vi.spyOn(useMembersModule, 'useMembers').mockReturnValue({
      members: mockMembers,
      addMember: vi.fn(),
      updateMember: vi.fn(),
      deleteMember: vi.fn(),
      getMember: vi.fn()
    })
    vi.clearAllMocks()
  })

  it('renders add member button', () => {
    render(
      <Controls 
        onActiveMemberChange={mockOnActiveMemberChange}
      />
    )

    const addButton = screen.getByRole('button', { name: /add/i })
    expect(addButton).toBeInTheDocument()
  })

  it('renders member color buttons', () => {
    render(
      <Controls 
        onActiveMemberChange={mockOnActiveMemberChange}
      />
    )

    const colorButtons = screen.getAllByRole('button')
    // Add button + 1 member color button
    expect(colorButtons).toHaveLength(2)
  })

  it('selects member when clicking color button', () => {
    render(
      <Controls 
        onActiveMemberChange={mockOnActiveMemberChange}
      />
    )

    const colorButtons = screen.getAllByRole('button')
    // First button is add button, second is member color
    fireEvent.click(colorButtons[1])

    expect(mockOnActiveMemberChange).toHaveBeenCalledWith(mockMembers[0])
  })
})
