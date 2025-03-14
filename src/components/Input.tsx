import { FC, InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import Typography from './Typography';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
}

const Input: FC<InputProps> = ({ 
    label, 
    error, 
    fullWidth = false,
    id,
    ...props 
}) => {
    return (
        <InputWrapper $fullWidth={fullWidth}>
            {label && (
                <Label htmlFor={id}>
                    <Typography variant="body1" color="secondary">
                        {label}
                    </Typography>
                </Label>
            )}
            <StyledInput 
                id={id}
                $hasError={!!error}
                $fullWidth={fullWidth}
                aria-label="name-input"
                {...props}
            />
            {error && (
                <ErrorMessage>
                    <Typography variant="caption" color="error">
                        {error}
                    </Typography>
                </ErrorMessage>
            )}
        </InputWrapper>
    );
};

const InputWrapper = styled.div<{ $fullWidth: boolean }>`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
    width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'auto'};
    box-sizing: border-box;
    min-width: 0; /* Prevent flex item from overflowing */
`;

const Label = styled.label`
    display: block;
`;

const StyledInput = styled.input<{ $hasError: boolean; $fullWidth: boolean }>`
    padding: ${({ theme }) => theme.spacing.m} ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    border: 1px solid ${({ $hasError, theme }) => $hasError ? theme.colors.text.error : '#ddd'};
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    line-height: ${({ theme }) => theme.typography.lineHeights.normal};
    width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'auto'};
    transition: all 0.2s;
    background-color: white;
    color: ${({ theme }) => theme.colors.text.primary};
    box-sizing: border-box;
    min-width: 0; /* Prevent flex item from overflowing */
    max-width: 100%; /* Ensure input doesn't overflow its container */

    &:hover {
        border-color: ${({ $hasError, theme }) => $hasError ? theme.colors.text.error : '#999'};
    }

    &:focus {
        outline: none;
        border-color: ${({ $hasError, theme }) => $hasError ? theme.colors.text.error : '#007bff'};
        box-shadow: 0 0 0 3px ${({ $hasError }) => 
            $hasError ? 'rgba(211, 47, 47, 0.1)' : 'rgba(0, 123, 255, 0.1)'};
    }

    &::placeholder {
        color: #999;
    }

    &:disabled {
        background-color: ${({theme}) => theme.colors.ui.superLight};
        cursor: not-allowed;
        border-color: #ddd;
    }
`;

const ErrorMessage = styled.div`
    margin-top: -0.25rem;
`;

export default Input;
