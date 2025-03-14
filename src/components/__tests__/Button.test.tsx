import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import Button from '../Button';
import { ThemeProvider } from 'styled-components';
import { defaultTheme as theme } from '../../utils/theme';
import { ButtonProps } from '../../utils/types';

describe('Button Component', () => {
  const mockOnClick = vi.fn();

  const renderButton = (variant: ButtonProps['variant'] = 'primary', disabled = false) => {
    return render(
      <ThemeProvider theme={theme}>
        <Button 
          variant={variant} 
          disabled={disabled} 
          onClick={mockOnClick}
        >
          Test Button
        </Button>
      </ThemeProvider>
    );
  };

  it('renders the Add button with a plus icon', () => {
    renderButton('add');
    const button = screen.getByTestId('add-button');
    expect(button).toBeInTheDocument();
  });

  it('renders the Delete button with a trash icon', () => {
    renderButton('delete');
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('renders the Close button with a close icon', () => {
    renderButton('close');
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('renders a primary button with text', () => {
    renderButton('primary');
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    renderButton();
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

});
