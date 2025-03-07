import { FC, useEffect, useState, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import Typography from './Typography';
import Close from '../icons/Close';
import Input from './Input';
import ColorPalette from './ColorPalette';
import Button from './Button';
import { lightenHexColor } from '../utils';
import { Member } from '../utils/types';

interface AddMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    addMember: (member: Omit<Member, 'id'>) => void;
}

const AddMemberModal: FC<AddMemberModalProps> = ({ isOpen, onClose, addMember }) => {
    const [formData, setFormData] = useState({
        name: '',
        colorHeader: '#FFEFBE' // First color from ColorPalette
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            // Reset form when modal closes
            setFormData({ name: '', colorHeader: '#FFEFBE' });
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

    const handleSubmit = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent click from reaching NotesPage
        
        const newErrors: Record<string, string> = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Add new member with selected color
        addMember({
            name: formData.name.trim(),
            colorHeader: formData.colorHeader,
            colorBody: lightenHexColor(formData.colorHeader), 
            colorText: '#18181A'
        });

        // Reset form and close modal
        setFormData({ name: '', colorHeader: '#FFEFBE' });
        onClose();
    };

    const handleOverlayClick = (e: MouseEvent) => {
        e.stopPropagation(); // Prevent click from reaching NotesPage
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <ModalWrapper>
            <Overlay onClick={handleOverlayClick} />
            <ModalContainer onClick={e => e.stopPropagation()}>
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
                                selectedColor={formData.colorHeader}
                                onColorSelect={(color) => setFormData(prev => ({ ...prev, colorHeader: color }))}
                            />
                        </ColorSection>
                    </InputGroup>
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Add Member
                    </Button>
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

export default AddMemberModal;
