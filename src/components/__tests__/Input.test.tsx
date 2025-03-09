import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../Input';
import { describe, it, vi, expect } from 'vitest';

describe('Input Component', () => {
    it('renders with a label and input field', () => {
        render(<Input label="Name" aria-label="name-input" />);
        
        // Assert that the label and input field are rendered correctly
        const input = screen.getByLabelText('name-input');
        expect(input).toBeInTheDocument();
    });

    it('displays the error message when there is an error', () => {
        render(<Input label="Name" error="Name is required" aria-label="name-input" />);
        
        // Assert that the error message is displayed
        const errorMessage = screen.getByText('Name is required');
        expect(errorMessage).toBeInTheDocument();
    });

    it('does not display the error message when there is no error', () => {
        render(<Input label="Name" aria-label="name-input" />);
        
        // Assert that the error message is not displayed
        const errorMessage = screen.queryByText('Name is required');
        expect(errorMessage).not.toBeInTheDocument();
    });

    it('applies fullWidth when the prop is true', () => {
        render(<Input label="Name" fullWidth={true} aria-label="name-input" />);
        
        // Assert that the input field takes up 100% of the width
        const input = screen.getByLabelText('name-input');
        expect(input).toHaveStyle('width: 100%');
    });

    it('does not apply fullWidth when the prop is false', () => {
        render(<Input label="Name" fullWidth={false} aria-label="name-input" />);
        
        // Assert that the input field does not take up 100% of the width
        const input = screen.getByLabelText('name-input');
        expect(input).not.toHaveStyle('width: 100%');
    });

    it('changes border color when there is an error', () => {
        render(<Input label="Name" error="Name is required" aria-label="name-input" />);
        
        const input = screen.getByLabelText('name-input');
        
        // Assert that the input has a red border when there is an error
        expect(input).toHaveStyle('border-color: #d32f2f');
    });

    it('does not show error border when there is no error', () => {
        render(<Input label="Name" aria-label="name-input" />);
        
        const input = screen.getByLabelText('name-input');
        
        // Assert that the input has the default border color when there is no error
        expect(input).toHaveStyle('border: 1px solid #ddd');
    });

    it('fires onChange event when text is typed', () => {
        const handleChange = vi.fn();
        render(<Input label="Name" aria-label="name-input" onChange={handleChange} />);
        
        const input = screen.getByLabelText('name-input');
        fireEvent.change(input, { target: { value: 'John Doe' } });
        
        // Assert that the onChange handler is called when the input value changes
        expect(handleChange).toHaveBeenCalledTimes(1);
    });
});
