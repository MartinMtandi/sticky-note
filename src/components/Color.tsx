import { Member } from "../utils/types";
import styled from 'styled-components';
import { FC } from 'react';

interface StyledColorProps {
    $backgroundColor?: string;
    $textColor?: string;
}

const Color: FC<{member: Member}> = ({ member }) => {

    const selectMember = () => {
        
    };
 
    return (
        <ColorContainer>
            <ColorButton
                onClick={selectMember}
                $backgroundColor={member.colorHeader}
            >
                <Tooltip $backgroundColor={member.colorBody} $textColor={member.colorText}>
                    <TooltipArrow $backgroundColor={member.colorBody} />
                    <TooltipText $textColor={member.colorText}>{member.name}</TooltipText>
                </Tooltip>
            </ColorButton>
        </ColorContainer>
    );
};

const ColorContainer = styled.div`
    position: relative;
`;

const ColorButton = styled.div<StyledColorProps>`
    background-color: ${props => props.$backgroundColor || 'grey'};
    height: 40px;
    width: 40px;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.3s;
    position: relative;

    &:hover {
        > div {
            opacity: 1;
            visibility: visible;
        }
    }
`;

const Tooltip = styled.div<StyledColorProps>`
    position: absolute;
    left: calc(100% + 12px);
    top: 50%;
    transform: translateY(-50%);
    background-color: ${props => props.$backgroundColor};
    padding: 0.5rem;
    border-radius: 8px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease-in-out;
    z-index: 10001;
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
    white-space: nowrap;
`;

export default Color;