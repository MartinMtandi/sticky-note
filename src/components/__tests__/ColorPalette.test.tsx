import { render, screen, fireEvent } from '@testing-library/react';
import ColorPalette from '../ColorPalette';
import { describe, it, vi, expect } from 'vitest';
import { colors } from '../../utils/constants';

const mockOnColorSelect = vi.fn();

describe('ColorPalette', () => {
    it('renders color buttons', () => {
        render(<ColorPalette selectedColor="#FFEFBE" onColorSelect={mockOnColorSelect} />);

        // Check if color buttons are rendered with aria-label based on their color
        colors.forEach((color) => {
            expect(screen.getByLabelText(color)).toBeInTheDocument();
        });
    });

    it('applies border to the selected color', () => {
        render(<ColorPalette selectedColor="#FFEFBE" onColorSelect={mockOnColorSelect} />);

        // Find the button using the aria-label corresponding to the selected color
        const selectedColorButton = screen.getByLabelText('#FFEFBE');

        // Ensure the selected button has the correct border style
        expect(selectedColorButton).toHaveStyle('border: 2px solid #333');
    });

    it('does not apply border to non-selected colors', () => {
        render(<ColorPalette selectedColor="#FFEFBE" onColorSelect={mockOnColorSelect} />);

        // Find the button using the aria-label corresponding to a non-selected color
        const nonSelectedColorButton = screen.getByLabelText('#AFDA9F');

        // Ensure the non-selected button has no border
        expect(nonSelectedColorButton).toHaveStyle('border: 2px solid transparent');
    });

    it('calls onColorSelect when a color is clicked', () => {
        render(<ColorPalette selectedColor="#FFEFBE" onColorSelect={mockOnColorSelect} />);

        // Click a color button
        fireEvent.click(screen.getByLabelText('#AFDA9F'));

        // Ensure onColorSelect was called with the correct color
        expect(mockOnColorSelect).toHaveBeenCalledWith('#AFDA9F');
    });

    it('applies active styles when isSelected is true', () => {
        render(<ColorPalette selectedColor="#FFEFBE" onColorSelect={mockOnColorSelect} />);

        // Check if the button for the selected color has the "active" style
        const selectedColorButton = screen.getByLabelText('#FFEFBE');
        expect(selectedColorButton).toHaveStyle('border: 2px solid #333');
    });
});
