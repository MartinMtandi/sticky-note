import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { defaultTheme as theme } from '../../utils/theme';
import Color from '../Color';
import { Member } from '../../utils/types';

describe('Color Component', () => {
    const member = {
        id: 1,
        name: 'John Doe',
        colorHeader: '#ff5733',
        colorBody: '#33c1ff',
        colorText: '#ffffff',
    };

    const mockOnClick = vi.fn();

    const renderColor = (member: Member, isActive = false) => {
        return render(
          <ThemeProvider theme={theme}>
            <Color 
              member={member} 
              isActive={isActive} 
              onClick={mockOnClick} 
            />
          </ThemeProvider>
        );
      };

    it('renders the color button with correct background color', () => {
        renderColor(member);

        const colorButton = screen.getByRole('button');
        expect(colorButton).toHaveStyle(`background-color: ${member.colorHeader}`);
    });

    it('displays the tooltip with the correct name', () => {
        renderColor(member);

        const tooltipText = screen.getByText(member.name);
        expect(tooltipText).toBeInTheDocument();
    });

    it('calls onClick when the color button is clicked', () => {
        renderColor(member);

        const colorButton = screen.getByRole('button');
        fireEvent.click(colorButton);

        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('applies active styles when isActive is true', () => {
        renderColor(member, true);
    
        const colorButton = screen.getByRole('button');
        expect(colorButton).toHaveStyle('outline: 2px solid white'); // Check for active outline style
    });
    

    it('does not apply active styles when isActive is false', () => {
        renderColor(member, false);

        const colorButton = screen.getByRole('button');
        expect(colorButton).not.toHaveStyle('outline: 2px solid white');
    });
});
