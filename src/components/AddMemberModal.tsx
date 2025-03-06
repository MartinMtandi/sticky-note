import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import Typography from './Typography';

interface AddMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddMemberModal: FC<AddMemberModalProps> = ({ isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <ModalWrapper>
            <Overlay onClick={onClose} />
            <ModalContainer>
                <ModalHeader>
                    <Typography variant="subtitle1" weight="semibold">Add New Member</Typography>
                    <CloseButton onClick={onClose}>
                        <Typography variant="body2" color="secondary">×</Typography>
                    </CloseButton>
                </ModalHeader>
                <ModalBody>
                    <Typography variant="body1" color="secondary">
                        Content goes here
                    </Typography>
                </ModalBody>
                <ModalFooter>
                    <FooterButton onClick={onClose} variant="secondary">
                        <Typography variant="body2">Cancel</Typography>
                    </FooterButton>
                    <FooterButton onClick={() => {}} variant="primary">
                        <Typography variant="body2" color="white">Add Member</Typography>
                    </FooterButton>
                </ModalFooter>
            </ModalContainer>
        </ModalWrapper>,
        document.body
    );
};

const ModalWrapper = styled.div`
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
`;

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
`;

const ModalContainer = styled.div`
    position: relative;
    background-color: white;
    border-radius: 12px;
    min-width: 400px;
    max-width: 90vw;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    transform: translateY(0);
    opacity: 1;
    animation: modalAppear 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    @keyframes modalAppear {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;

const ModalHeader = styled.div`
    padding: 0.8rem 1.5rem;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
        background-color: #f5f5f5;
    }
`;

const ModalBody = styled.div`
    padding: 1.5rem;
    overflow-y: auto;
    flex: 1;
`;

const ModalFooter = styled.div`
    padding: 1.5rem;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
`;

const FooterButton = styled.button<{ variant: 'primary' | 'secondary' }>`
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    background-color: ${({ variant }) => 
        variant === 'primary' ? '#007bff' : 'transparent'};
    border: 1px solid ${({ variant }) => 
        variant === 'primary' ? '#007bff' : '#ddd'};

    &:hover {
        background-color: ${({ variant }) => 
            variant === 'primary' ? '#0056b3' : '#f5f5f5'};
    }
`;

export default AddMemberModal;
