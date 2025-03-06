import { FC } from 'react';
import styled from 'styled-components';
import Plus from '../icons/Plus';

interface AddButtonProps {
    onClick: () => void;
}

const AddButton: FC<AddButtonProps> = ({ onClick }) => {
    return (
        <StyledAddButton onClick={onClick}>
            <Plus />
        </StyledAddButton>
    );
};

const StyledAddButton = styled.div`
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

export default AddButton;