import React, { FC, useState, MouseEvent, Suspense, lazy } from 'react';
import styled from 'styled-components';
import Button from './Button';
import Color from './Color';
import { useMembers } from '../context/GlobalMembersContext';
import { Member } from '../utils/types';

const AddMemberModal = lazy(() => import('./AddMemberModal'));

interface ControlsProps {
    className?: string;
    onActiveMemberChange: (member: Member | null) => void;
    activeMember: Member | null;
}

const Controls: FC<ControlsProps> = ({ className, onActiveMemberChange, activeMember }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { members, addMember } = useMembers();

    const handleAddMember = (e: MouseEvent) => {
        e.stopPropagation();
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    const handleMemberClick = (member: Member) => {
        const newActiveMember = activeMember?.id === member.id ? null : member;
        onActiveMemberChange(newActiveMember);
    };

    return (
        <ControlsContainer className={className}>
            <Button variant="add" onClick={handleAddMember} />
            {members.map((member) => (
                <Color
                    key={member.id}
                    member={member}
                    isActive={activeMember?.id === member.id}
                    onClick={() => handleMemberClick(member)}
                />
            ))}
            <Suspense fallback={null}>
                <AddMemberModal
                    isOpen={isModalOpen}
                    onClose={handleClose}
                    addMember={addMember}
                />
            </Suspense>
        </ControlsContainer>
    );
};

const ControlsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
    align-items: center;
    position: fixed;
    left: 1em;
    top: 50%;
    transform: translateY(-50%);
    background-color: #35363e;
    padding: 1em 1em;
    border-radius: 40px;
    box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% /
                    0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg
                    0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075);
    z-index: 10000;
`;

export default React.memo(Controls);