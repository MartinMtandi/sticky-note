import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Input from '../Input'

describe('Input', () => {
  it('renders input with label', () => {
    render(
      <Input 
        label="Test Label"
        id="test-input"
        data-testid="test-input"
      />
    )

    expect(screen.getByText('Test Label')).toBeInTheDocument()
    expect(screen.getByTestId('test-input')).toBeInTheDocument()
  })

  it('renders input without label when not provided', () => {
    render(
      <Input 
        id="test-input"
        data-testid="test-input"
      />
    )

    expect(screen.queryByRole('label')).not.toBeInTheDocument()
    expect(screen.getByTestId('test-input')).toBeInTheDocument()
  })

  it('shows error message when error prop is provided', () => {
    const errorMessage = 'This field is required'
    render(
      <Input 
        id="test-input"
        error={errorMessage}
        data-testid="test-input"
      />
    )

    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  it('handles value changes', () => {
    const handleChange = vi.fn()
    render(
      <Input 
        id="test-input"
        onChange={handleChange}
        data-testid="test-input"
      />
    )

    const input = screen.getByTestId('test-input')
    fireEvent.change(input, { target: { value: 'test value' } })

    expect(handleChange).toHaveBeenCalled()
  })

  it('applies disabled styles when disabled', () => {
    render(
      <Input 
        id="test-input"
        disabled
        data-testid="test-input"
      />
    )

    const input = screen.getByTestId('test-input')
    expect(input).toBeDisabled()
  })

  it('applies full width styles when fullWidth is true', () => {
    render(
      <Input 
        id="test-input"
        fullWidth
        data-testid="test-input"
      />
    )

    const input = screen.getByTestId('test-input')
    expect(input).toHaveStyle({ width: '100%' })
  })

  it('forwards additional props to input element', () => {
    render(
      <Input 
        id="test-input"
        data-testid="test-input"
        placeholder="Enter text"
        maxLength={10}
      />
    )

    const input = screen.getByTestId('test-input')
    expect(input).toHaveAttribute('placeholder', 'Enter text')
    expect(input).toHaveAttribute('maxLength', '10')
  })
})
