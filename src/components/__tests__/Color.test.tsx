import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import Color from '../Color';

describe('Color Component', () => {
    const member = {
        id: 1,
        name: 'John Doe',
        colorHeader: '#ff5733',
        colorBody: '#33c1ff',
        colorText: '#ffffff',
    };

    it('renders the color button with correct background color', () => {
        render(<Color member={member} />);

        const colorButton = screen.getByRole('button');
        expect(colorButton).toHaveStyle(`background-color: ${member.colorHeader}`);
    });

    it('displays the tooltip with the correct name', () => {
        render(<Color member={member} />);

        const tooltipText = screen.getByText(member.name);
        expect(tooltipText).toBeInTheDocument();
    });

    it('calls onClick when the color button is clicked', () => {
        const handleClick = vi.fn();
        render(<Color member={member} onClick={handleClick} />);

        const colorButton = screen.getByRole('button');
        fireEvent.click(colorButton);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies active styles when isActive is true', () => {
        render(<Color member={member} isActive={true} />);
    
        const colorButton = screen.getByRole('button');
        expect(colorButton).toHaveStyle('outline: 2px solid white'); // Check for active outline style
    });
    

    it('does not apply active styles when isActive is false', () => {
        render(<Color member={member} isActive={false} />);

        const colorButton = screen.getByRole('button');
        expect(colorButton).not.toHaveStyle('outline: 2px solid white');
    });
});
