import { FC, ButtonHTMLAttributes, MouseEvent } from 'react';
import styled from 'styled-components';
import Typography from './Typography';
import Plus from '../icons/Plus';
import Trash from '../icons/Trash';
import Close from '../icons/Close';
import { SearchIcon } from '../icons/Search';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: 'primary' | 'secondary' | 'add' | 'delete' | 'close' | 'search';
    darkMode?: boolean;
}

const Button: FC<ButtonProps> = ({ 
    variant = 'primary',
    darkMode = false,
    children, 
    onClick,
    ...props 
}) => {
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onClick?.(e);
    };

    if (variant === 'add') {
        return (
            <StyledButton as="button" aria-label="Add" data-testid="add-button" $variant={variant} onClick={handleClick} {...props}>
                <Plus />
            </StyledButton>
        );
    }

    if (variant === 'delete') {
        return (
            <StyledButton as="button" $variant={variant} onClick={handleClick} {...props}>
                <Trash />
            </StyledButton>
        );
    }

    if (variant === 'close') {
        return (
            <StyledButton as="button" $variant={variant} $darkMode={darkMode} onClick={handleClick} {...props}>
                <Close />
            </StyledButton>
        );
    }

    if (variant === 'search') {
        return (
            <StyledButton as="button" aria-label="Search" $variant={variant} onClick={handleClick} {...props}>
                <SearchIcon />
            </StyledButton>
        );
    }

    return (
        <StyledButton $variant={variant} onClick={handleClick} {...props}>
            <Typography variant="body2" color={variant === 'primary' ? 'white' : undefined}>
                {children}
            </Typography>
        </StyledButton>
    );
};

const StyledButton = styled.button<{ $variant: ButtonProps['variant']; $darkMode?: boolean }>`
    ${({ $variant, $darkMode }) => {
        switch ($variant) {
            case 'add':
            case 'search':
                return `
                    background-color: rgba(107, 107, 107, 1);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 40px;
                    width: 40px;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    will-change: transform, box-shadow;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    border: none;
                    margin-top: 1rem;
                    color: white;

                    &:hover {
                        transform: scale(1.1);
                        background-color: rgba(127, 127, 127, 1);
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    }

                    &:active {
                        transform: scale(0.95);
                        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
                    }
                `;
            case 'delete':
                return `
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 4px;
                    border-radius: 4px;
                    transition: background-color 0.2s ease;
                    border: none;
                    background: none;

                    &:hover {
                        background-color: rgba(0, 0, 0, 0.1);
                    }
                `;
            case 'close':
                return `
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 8px;
                    border-radius: 50%;
                    transition: all 0.2s ease;
                    border: none;
                    background: none;
                    color: ${$darkMode ? 'white' : '#18181A'};

                    &:hover {
                        background-color: ${$darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
                        transform: scale(1.1);
                    }

                    &:active {
                        transform: scale(0.95);
                    }
                `;
            default:
                return `
                    padding: 0.5rem 1rem;
                    border-radius: 6px;
                    border: none;
                    cursor: pointer;
                    transition: all 0.2s;
                    background-color: ${$variant === 'primary' ? '#66bb6a' : 'transparent'};
                    border: 1px solid ${$variant === 'primary' ? '#66bb6a' : '#ddd'};

                    &:hover {
                        background-color: ${$variant === 'primary' ? '#4caf50' : '#f5f5f5'};
                    }
                `;
        }
    }}
`;

export default Button;
