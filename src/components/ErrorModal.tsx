import { FC, MouseEvent } from 'react';
import styled from 'styled-components';
import Button from './Button';

interface ErrorModalProps {
    isOpen: boolean;
    message: string;
    onClose: () => void;
}

const ErrorModal: FC<ErrorModalProps> = ({ isOpen, message, onClose }) => {
    const handleOverlayClick = (e: MouseEvent) => {
        e.stopPropagation(); // Prevent click from reaching NotesPage
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <Overlay onClick={handleOverlayClick}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <Message>{message}</Message>
                <Button variant="add" onClick={e => {
                    e.stopPropagation();
                    onClose();
                }} />
            </ModalContent>
        </Overlay>
    );
};

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10001;
`;

const ModalContent = styled.div`
    background-color: #35363e;
    padding: 2rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.075),
                0 2px 2px hsl(0deg 0% 0% / 0.075),
                0 4px 4px hsl(0deg 0% 0% / 0.075),
                0 8px 8px hsl(0deg 0% 0% / 0.075),
                0 16px 16px hsl(0deg 0% 0% / 0.075);
`;

const Message = styled.p`
    color: white;
    font-size: 1rem;
    margin: 0;
    text-align: center;
`;

export default ErrorModal;
