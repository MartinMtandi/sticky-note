import { FC, useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import Color from './Color';
import { useMembers } from '../services/useMembers';
import AddMemberModal from './AddMemberModal';

const Controls: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { members } = useMembers();

    const handleAddMember = () => {
        setIsModalOpen(true);
    };

    return (
        <ControlsContainer>
            <Button variant="add" onClick={handleAddMember} />
            {members.map((member) => (
                <Color
                    key={member.id}
                    color={member}
                />
            ))}
            <AddMemberModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
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

export default Controls;