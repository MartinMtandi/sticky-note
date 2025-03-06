import { FC, MouseEvent } from 'react';
import styled from 'styled-components';
import Trash from '../icons/Trash';

interface DeleteButtonProps {
    onDelete: (e: MouseEvent<HTMLDivElement>) => void;
}

const DeleteButton: FC<DeleteButtonProps> = ({ onDelete }) => {
    return (
        <StyledDeleteButton onClick={onDelete}>
            <Trash />
        </StyledDeleteButton>
    );
};

const StyledDeleteButton = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border-radius: 4px;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

export default DeleteButton;
