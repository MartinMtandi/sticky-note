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
    gap: 0.5rem;
    width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'auto'};
    box-sizing: border-box;
    min-width: 0; /* Prevent flex item from overflowing */
`;

const Label = styled.label`
    display: block;
`;

const StyledInput = styled.input<{ $hasError: boolean; $fullWidth: boolean }>`
    padding: 0.75rem 1rem;
    border-radius: 6px;
    border: 1px solid ${({ $hasError }) => $hasError ? '#d32f2f' : '#ddd'};
    font-size: 1rem;
    line-height: 1.5;
    width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'auto'};
    transition: all 0.2s;
    background-color: white;
    color: #333;
    box-sizing: border-box;
    min-width: 0; /* Prevent flex item from overflowing */
    max-width: 100%; /* Ensure input doesn't overflow its container */

    &:hover {
        border-color: ${({ $hasError }) => $hasError ? '#d32f2f' : '#999'};
    }

    &:focus {
        outline: none;
        border-color: ${({ $hasError }) => $hasError ? '#d32f2f' : '#007bff'};
        box-shadow: 0 0 0 3px ${({ $hasError }) => 
            $hasError ? 'rgba(211, 47, 47, 0.1)' : 'rgba(0, 123, 255, 0.1)'};
    }

    &::placeholder {
        color: #999;
    }

    &:disabled {
        background-color: #f5f5f5;
        cursor: not-allowed;
        border-color: #ddd;
    }
`;

const ErrorMessage = styled.div`
    margin-top: -0.25rem;
`;

export default Input;
