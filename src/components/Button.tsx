import { FC, ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import Typography from './Typography';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: 'primary' | 'secondary';
}

const Button: FC<ButtonProps> = ({ 
    variant = 'primary',
    children, 
    ...props 
}) => {
    return (
        <StyledButton 
            $variant={variant} 
            {...props}
        >
            <Typography variant="body2" color={variant === 'primary' ? 'white' : undefined}>
                {children}
            </Typography>
        </StyledButton>
    );
};

const StyledButton = styled.button<{ $variant: 'primary' | 'secondary' }>`
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    background-color: ${({ $variant }) => 
        $variant === 'primary' ? '#66bb6a' : 'transparent'};
    border: 1px solid ${({ $variant }) => 
        $variant === 'primary' ? '#66bb6a' : '#ddd'};

    &:hover {
        background-color: ${({ $variant }) => 
            $variant === 'primary' ? '#4caf50' : '#f5f5f5'};
    }
`;

export default Button;
