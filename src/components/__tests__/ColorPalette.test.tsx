import { render, screen, fireEvent } from '@testing-library/react';
import ColorPalette from '../ColorPalette';
import { describe, it, vi, expect } from 'vitest';
import { colors } from '../../utils/constants';
import { ThemeProvider } from 'styled-components';
import { defaultTheme as theme } from '../../utils/theme';

describe('ColorPalette', () => {
    const mockOnColorSelect = vi.fn();

    const renderColorPalette = (selectedColor = '#FFEFBE') => {
        return render(
          <ThemeProvider theme={theme}>
            <ColorPalette 
              selectedColor={selectedColor} 
              onColorSelect={mockOnColorSelect} 
            />
          </ThemeProvider>
        );
      };
      
    it('renders color buttons', () => {
        renderColorPalette();

        // Check if color buttons are rendered with aria-label based on their color
        colors.forEach((color) => {
            expect(screen.getByLabelText(color)).toBeInTheDocument();
        });
    });

    it('applies border to the selected color', () => {
        const selectedColor = colors[2];
        renderColorPalette(selectedColor);
        const selectedButton = screen.getAllByRole('button')[2];
        expect(selectedButton).toHaveStyle(`border: 2px solid #333`);
    });

    it('does not apply border to non-selected colors', () => {
        const selectedColor = colors[2];
        renderColorPalette(selectedColor);
        const nonSelectedColorButton = screen.getAllByRole('button')[3];

        // Ensure the non-selected button has no border
        expect(nonSelectedColorButton).toHaveStyle('border: 2px solid transparent');
    });

    it('calls onColorSelect when a color is clicked', () => {
        renderColorPalette();
        const firstColorButton = screen.getAllByRole('button')[0];
        fireEvent.click(firstColorButton);
        expect(mockOnColorSelect).toHaveBeenCalledWith(colors[0]);
    });

    it('renders with correct color values', () => {
        renderColorPalette();
        const colorButtons = screen.getAllByRole('button');
        colors.forEach((color, index) => {
          expect(colorButtons[index]).toHaveStyle(`background-color: ${color}`);
        });
    });
});
