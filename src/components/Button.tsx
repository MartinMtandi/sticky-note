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
    ${({ $variant, $darkMode, theme }) => {
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
                    border-radius: ${theme.borderRadius.round};
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    will-change: transform, box-shadow;
                    box-shadow: ${theme.shadows.sm};
                    border: none;
                    color: ${theme.colors.text.light};

                    &:hover {
                        transform: scale(1.1);
                        background-color: rgba(127, 127, 127, 1);
                        box-shadow: ${theme.shadows.md};
                    }

                    &:active {
                        transform: scale(0.95);
                        box-shadow: ${theme.shadows.sm};
                    }
                `;
            case 'delete':
                return `
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: ${theme.spacing.xs};
                    border-radius: ${theme.borderRadius.sm};
                    transition: background-color ${theme.transitions.fast};
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
                    padding: ${theme.spacing.sm};
                    border-radius: ${theme.borderRadius.md};
                    transition: all ${theme.transitions.fast};
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
                    padding: ${theme.spacing.sm} ${theme.spacing.md};
                    border-radius: ${theme.borderRadius.m};
                    border: none;
                    cursor: pointer;
                    transition: all 0.2s;
                    background-color: ${$variant === 'primary' ? theme.colors.button.primary : 'transparent'};
                    border: 1px solid ${$variant === 'primary' ? theme.colors.button.primary : '#ddd'};

                    &:hover {
                        background-color: ${$variant === 'primary' ? theme.colors.button.primaryHover : theme.colors.ui.superLight};
                    }
                `;
        }
    }}
`;

export default Button;
