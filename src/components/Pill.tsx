import styled from 'styled-components';
import { Priority, PRIORITY_COLORS } from '../utils/constants';
import { MouseEvent } from 'react';
import { lightenHexColor } from '../utils';

interface PillProps {
    priority?: Priority;
    onClick?: (e: MouseEvent) => void;
    disabled?: boolean;
}

export const Pill = ({ priority, onClick, disabled }: PillProps) => {
    // Default to MEDIUM priority as per our design requirements
    const color = priority ? PRIORITY_COLORS[priority] : PRIORITY_COLORS.MEDIUM;
    const title = priority 
        ? `${priority.charAt(0) + priority.slice(1).toLowerCase()} Priority - Click to cycle`
        : 'Medium Priority - Click to cycle';

    return (
        <PillContainer 
            $color={color}
            onClick={onClick}
            title={title}
            style={{ opacity: disabled ? 0.5 : 1 }}
            role="button"
            aria-label={title}
            data-priority={priority || 'MEDIUM'}
        >
            {priority || 'MEDIUM'}
        </PillContainer>
    );
};

const PillContainer = styled.div<{ $color: string }>`
    /* Size and shape */
    padding: 3px 10px;
    border-radius: 5px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    
    /* Colors */
    border: 1px solid ${props => props.$color};
    background-color: ${props => lightenHexColor(props.$color)};
    color: ${props => props.$color};
    
    /* Interaction */
    cursor: pointer;
    transition: all 0.2s ease;
    user-select: none;

    /* Hover effect - scale animation */
    &:hover {
        transform: scale(1.05);
        background-color: ${props => props.$color};
        color: white;
    }

    /* Disabled state */
    &[style*="opacity: 0.5"] {
        cursor: not-allowed;
    }
`;
