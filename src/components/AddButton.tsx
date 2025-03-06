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
    transition: 0.3s;

    &:hover {
        height: 45px;
        width: 45px;
    }
`;

export default AddButton;