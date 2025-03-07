import { Member } from "../utils/types";
import styled from 'styled-components';
import { FC } from 'react';

interface ColorProps {
    member: Member;
    isActive?: boolean;
    onClick?: () => void;
}

interface StyledColorProps {
    $backgroundColor: string;
    $textColor?: string;
    $isActive?: boolean;
}

const Color: FC<ColorProps> = ({ member, isActive = false, onClick }) => {

    return (
        <ColorButton
            $backgroundColor={member.colorHeader}
            onClick={onClick}
            $isActive={isActive}
            data-tooltip={member.name}
        >
            <Tooltip $backgroundColor={member.colorBody} $textColor={member.colorText}>
                <TooltipArrow $backgroundColor={member.colorBody} />
                <TooltipText $textColor={member.colorText}>{member.name}</TooltipText>
            </Tooltip>
        </ColorButton>
    );
};

const ColorButton = styled.button<StyledColorProps>`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    background-color: ${props => props.$backgroundColor};
    cursor: pointer;
    position: relative;
    padding: 0;
    outline: ${props => props.$isActive ? '2px solid white' : 'none'};
    outline-offset: 2px;
    transition: outline 0.2s ease-in-out;

    &:hover > div {
        opacity: 1;
        visibility: visible;
    }
`;

const ColorContainer = styled.div`
    position: relative;
`;

const Tooltip = styled.div<StyledColorProps>`
    position: absolute;
    left: calc(100% + 15px);
    top: 50%;
    transform: translateY(-50%);
    background-color: ${props => props.$backgroundColor};
    padding: 0.5rem 1rem;
    border-radius: 4px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
    white-space: nowrap;
    z-index: 1000;
`;

const TooltipArrow = styled.div<StyledColorProps>`
    position: absolute;
    left: -6px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-right: 6px solid ${props => props.$backgroundColor};
`;

const TooltipText = styled.span<StyledColorProps>`
    color: ${props => props.$textColor};
    font-size: 14px;
    font-weight: 500;
`;

export default Color;