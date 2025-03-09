import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import Button from '../Button';

describe('Button Component', () => {
  it('renders the Add button with a plus icon', () => {
    render(<Button variant="add" />);
    const button = screen.getByTestId('add-button');
    expect(button).toBeInTheDocument();
  });

  it('renders the Delete button with a trash icon', () => {
    render(<Button variant="delete" />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('renders the Close button with a close icon', () => {
    render(<Button variant="close" />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('renders a primary button with text', () => {
    render(<Button variant="primary">Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button variant="primary" onClick={handleClick}>Click Me</Button>);

    // Use getByRole instead of getByText
    const button = screen.getByRole('button', { name: /click me/i });

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });


  it('prevents event propagation on click', () => {
    const parentClick = vi.fn();
    const childClick = vi.fn();
    
    render(
        <div onClick={parentClick}>
            <Button variant="add" onClick={childClick} />
        </div>
    );

    // Find the button by aria-label or test id
    const button = screen.getByRole('button', { name: /add/i }) || screen.getByTestId('add-button');

    fireEvent.click(button);

    expect(childClick).toHaveBeenCalledTimes(1);
    expect(parentClick).not.toHaveBeenCalled();  // Ensures event.stopPropagation() worked
  });

});
