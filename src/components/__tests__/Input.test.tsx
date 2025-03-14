import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { ThemeProvider } from 'styled-components';
import Input from '../Input';
import { defaultTheme as theme } from '../../utils/theme';


describe('Input Component', () => {
    const mockOnChange = vi.fn();

    const renderInput = (value = '', placeholder = 'Test Input') => {
        return render(
            <ThemeProvider theme={theme}>
                <Input
                    value={value}
                    placeholder={placeholder}
                    onChange={mockOnChange}
                />
            </ThemeProvider>
        );
    };

    it('renders with correct placeholder', () => {
        renderInput('', 'Enter text');
        const input = screen.getByPlaceholderText('Enter text');
        expect(input).toBeInTheDocument();
      });
    
      it('displays the correct value', () => {
        renderInput('Test Value');
        const input = screen.getByDisplayValue('Test Value');
        expect(input).toBeInTheDocument();
      });
    
      it('calls onChange when text is entered', () => {
        renderInput();
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'New Value' } });
        expect(mockOnChange).toHaveBeenCalled();
      });
    
      it('applies correct styles from theme', () => {
        renderInput();
        const input = screen.getByRole('textbox');
        expect(input).toHaveStyle(`font-size: ${theme.typography.fontSizes.md}`);
        expect(input).toHaveStyle(`border-radius: ${theme.borderRadius.md}`);
      });
    
      it('renders with disabled state', () => {
        renderInput();
        const input = screen.getByRole('textbox');
        expect(input).not.toBeDisabled();
      });
});
