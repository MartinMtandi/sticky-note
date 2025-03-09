import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import Checkbox from '../Checkbox';

describe('Checkbox Component', () => {
    it('renders unchecked by default', () => {
        render(<Checkbox color="red" checked={false} onChange={() => {}} />);
        
        // Check if the checkbox container is rendered
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
        
        // Ensure checkmark is not present
        const checkmark = screen.queryByTestId('checkmark-icon');
        expect(checkmark).not.toBeInTheDocument();
    });

    it('renders checked state when checked=true', () => {
        render(<Checkbox  color="red" checked={true} onChange={() => {}} />);

        // Ensure checkmark is visible
        const checkmark = screen.getByTestId('checkmark-icon');
        expect(checkmark).toBeInTheDocument();
    });

    it('calls onChange when clicked', () => {
        const handleChange = vi.fn();
        render(<Checkbox color="red" checked={false} onChange={handleChange} />);

        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);

        expect(handleChange).toHaveBeenCalledTimes(1);
    });
});
