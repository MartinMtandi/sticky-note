import styled from "styled-components";
import { Priority, PRIORITY_COLORS } from "../utils/constants";
import { TASK_STATUS_COLORS, TASK_STATUS_LABELS } from "../utils/constants";
import { MouseEvent } from "react";
import { lightenHexColor } from "../utils";

interface PillProps {
  priority?: Priority;
  taskStatus?: keyof typeof TASK_STATUS_COLORS;
  onClick?: (e: MouseEvent) => void;
  disabled?: boolean;
}

export const Pill = ({
  priority,
  taskStatus,
  onClick,
  disabled,
}: PillProps) => {
  // Determine the color and label
  const color = taskStatus
    ? TASK_STATUS_COLORS[taskStatus]
    : priority
    ? PRIORITY_COLORS[priority]
    : PRIORITY_COLORS.MEDIUM;

  const label = taskStatus
    ? TASK_STATUS_LABELS[taskStatus]
    : priority || "MEDIUM";

  const title = taskStatus
    ? `${label} - Click to cycle`
    : `${label} Priority - Click to cycle`;

  return (
    <PillContainer
      $color={color}
      $taskStatus={taskStatus} // Explicitly pass taskStatus
      onClick={onClick}
      title={title}
      style={{ opacity: disabled ? 0.5 : 1 }}
      role="button"
      aria-label={title}
    >
      {label}
    </PillContainer>
  );
};

const PillContainer = styled.div<{ $color: string; $taskStatus?: string }>`
    /* Size and shape */
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    font-size: ${({ theme }) => theme.typography.fontSizes.x};
    font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
    letter-spacing: 0.5px;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    
    /* Colors */
    border: 1px solid ${props => props.$color};
    background-color: ${props => (props.$taskStatus ? props.$color : lightenHexColor(props.$color))};
    color: ${props => (props.$taskStatus ? 'white' : props.$color)};
    
    /* Interaction */
    cursor: pointer;
    transition: all ${({ theme }) => theme.transitions.fast};
    user-select: none;

    /* Hover effect - scale animation */
    &:hover {
        transform: scale(1.05);
        background-color: ${props => (props.$taskStatus ? lightenHexColor(props.$color) : props.$color)};
        color: ${props => (props.$taskStatus ? props.$color : 'white')};
    }

    /* Disabled state */
    &[style*="opacity: 0.5"] {
        cursor: not-allowed;
    }
`;

