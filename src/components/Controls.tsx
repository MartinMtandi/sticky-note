import React, { FC, useState, MouseEvent, Suspense, lazy, useMemo } from 'react';
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
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredMembers = useMemo(() => {
        if (!searchQuery) return members;
        return members.filter(member => 
            member.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [members, searchQuery]);

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

    const handleSearchClick = () => {
        setSearchVisible(prev => !prev);
        setSearchQuery('');
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <ControlsContainer className={className}>
            <Button variant="add" onClick={handleAddMember} />
            {members.length > 1 && (
                <ButtonWrapper>
                    <Button variant="search" onClick={handleSearchClick} />
                    {searchVisible && (
                        <FloatingSearchBox>
                            <SearchInput
                                type="text"
                                placeholder="Search members..."
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                                autoFocus
                            />
                            <MemberList>
                                {filteredMembers.map((member) => (
                                    <MemberListItem key={member.id} onClick={() => handleMemberClick(member)}>
                                        <ColorDot $color={member.colorHeader} />
                                        <MemberName>{member.name}</MemberName>
                                    </MemberListItem>
                                ))}
                            </MemberList>
                        </FloatingSearchBox>
                    )}
                </ButtonWrapper>
            )}
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

const ButtonWrapper = styled.div`
    border-top: 1px solid #cccc;
    position: relative;
`;

const FloatingSearchBox = styled.div`
    position: absolute;
    top: 0;
    left: 5em;
    background: #35363e;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 10000;
    width: 300px;
`;

const SearchInput = styled.input`
    width: calc(300px - 1rem);
    padding: 0.5rem;
    border-radius: 4px;
    border: none;
    background: #2a2b32;
    color: white;
    font-size: 0.875rem;

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px #4d79ff;
    }
`;

const MemberList = styled.div`
  margin-top: 1rem;
  max-height: 200px;
  overflow-y: auto;
`;

const MemberListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ColorDot = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.$color};
  margin: 0.5rem;
`;

const MemberName = styled.span`
  color: white;
  font-size: 0.875rem;
`;

export default React.memo(Controls);