import { FC } from 'react';
import styled from 'styled-components';
import { PRIORITY_COLORS } from '../utils/constants';

interface PriorityDotProps {
    $color: string;
}

const TaskPriorityKey: FC = () => {
    return (
        <Container>
            <Title>Task Priority Key</Title>
            <PriorityList>
                <PriorityItem>
                    <PriorityDot $color={PRIORITY_COLORS.HIGH} />
                    <PriorityLabel>High Priority</PriorityLabel>
                </PriorityItem>
                <PriorityItem>
                    <PriorityDot $color={PRIORITY_COLORS.MEDIUM} />
                    <PriorityLabel>Medium Priority</PriorityLabel>
                </PriorityItem>
                <PriorityItem>
                    <PriorityDot $color={PRIORITY_COLORS.LOW} />
                    <PriorityLabel>Low Priority</PriorityLabel>
                </PriorityItem>
            </PriorityList>
        </Container>
    );
};

const Container = styled.div`
    position: fixed;
    top: 1rem;
    left: 1rem;
    background-color: #35363e;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    z-index: 1000;
    box-shadow: 
        0 1px 1px hsl(0deg 0% 0% / 0.075),
        0 2px 2px hsl(0deg 0% 0% / 0.075),
        0 4px 4px hsl(0deg 0% 0% / 0.075),
        0 8px 8px hsl(0deg 0% 0% / 0.075),
        0 16px 16px hsl(0deg 0% 0% / 0.075);
`;

const Title = styled.h3`
    margin: 0 0 0.75rem 0;
    color: white;
    font-size: 1rem;
    font-weight: 500;
`;

const PriorityList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const PriorityItem = styled.li`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const PriorityDot = styled.div<PriorityDotProps>`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${props => props.$color};
`;

const PriorityLabel = styled.span`
    color: white;
    font-size: 0.875rem;
`;

export default TaskPriorityKey;
