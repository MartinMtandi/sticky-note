import { FC, MouseEvent } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import Button from '../Button';

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

    return createPortal(
        <Overlay onClick={handleOverlayClick}>
            <Modal onClick={e => e.stopPropagation()}>
                <Message>{message}</Message>
                <Button 
                    variant="close" 
                    darkMode={true}
                    onClick={e => {
                        e.stopPropagation();
                        onClose();
                    }} 
                />
            </Modal>
        </Overlay>,
        document.body
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
    animation: fadeIn 0.2s ease-in-out;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const Modal = styled.div`
    background-color: #35363e;
    padding: 2rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    max-width: 400px;
    margin: 0 1rem;
    box-shadow: 
        0 1px 1px hsl(0deg 0% 0% / 0.075),
        0 2px 2px hsl(0deg 0% 0% / 0.075),
        0 4px 4px hsl(0deg 0% 0% / 0.075),
        0 8px 8px hsl(0deg 0% 0% / 0.075),
        0 16px 16px hsl(0deg 0% 0% / 0.075);
`;

const Message = styled.p`
    margin: 0;
    text-align: center;
    color: white;
    font-size: 16px;
    font-weight: 500;
`;

export default ErrorModal;
