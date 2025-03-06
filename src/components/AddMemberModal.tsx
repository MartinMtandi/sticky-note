import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import Typography from './Typography';
import Close from '../icons/Close';
import Input from './Input';
import ColorPalette from './ColorPalette';

interface AddMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddMemberModal: FC<AddMemberModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        color: '#FF9B9B' // Default color
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            // Reset form when modal closes
            setFormData({ name: '', color: '#FF9B9B' });
            setErrors({});
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = () => {
        const newErrors: Record<string, string> = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // TODO: Handle successful submission
        console.log('Form submitted:', {
            ...formData,
            id: Date.now().toString(),
            timestamp: new Date().toISOString()
        });
        onClose();
    };

    if (!isOpen) return null;

    return createPortal(
        <ModalWrapper>
            <Overlay onClick={onClose} />
            <ModalContainer>
                <ModalHeader>
                    <Typography variant="subtitle1" weight="semibold">Add New Member</Typography>
                    <CloseButton onClick={onClose}>
                        <Close />
                    </CloseButton>
                </ModalHeader>
                <ModalBody>
                    <InputGroup>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Enter full name"
                            value={formData.name}
                            onChange={handleChange}
                            error={errors.name}
                            fullWidth
                        />
                        <ColorSection>
                            <Typography variant="body2" color="secondary" className="color-label">
                                Select Color
                            </Typography>
                            <ColorPalette
                                selectedColor={formData.color}
                                onColorSelect={(color) => setFormData(prev => ({ ...prev, color }))}
                            />
                        </ColorSection>
                    </InputGroup>
                </ModalBody>
                <ModalFooter>
                    <FooterButton onClick={onClose} variant="secondary">
                        <Typography variant="body2">Cancel</Typography>
                    </FooterButton>
                    <FooterButton onClick={handleSubmit} variant="primary">
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
    width: 400px;
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
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all 0.2s;
    color: #666;

    &:hover {
        background-color: #f5f5f5;
        color: #333;
    }

    &:active {
        background-color: #eee;
        transform: scale(0.95);
    }
`;

const ColorSection = styled.div`
    margin-top: 0.5rem;
    padding: 1rem;
    background-color: #f8f9fa;
    border-radius: 8px;

    .color-label {
        margin-bottom: 0.75rem;
    }
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    box-sizing: border-box;
`;

const ModalBody = styled.div`
    padding: 1.5rem;
    overflow-y: auto;
    flex: 1;
    width: 100%;
    box-sizing: border-box;
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
