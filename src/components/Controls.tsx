import React, { FC, useState, MouseEvent, Suspense, lazy, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Button from './Button';
import Color from './Color';
import { useMembers } from '../context/GlobalMembersContext';
import { Member } from '../utils/types';
import SearchBox from './SearchBox';

const AddMemberModal = lazy(() => import('./AddMemberModal'));

interface ControlsProps {
    className?: string;
    onActiveMemberChange: (member: Member | null) => void;
    activeMember: Member | null;
    onSearchToggle?: (isVisible: boolean) => void;
}

const Controls: FC<ControlsProps> = ({ className, onActiveMemberChange, activeMember, onSearchToggle }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { members, addMember } = useMembers();
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchButtonRef = useRef<HTMLDivElement>(null);

    const handleAddMember = (e: MouseEvent) => {
        e.stopPropagation();
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    const handleMemberClick = useCallback((member: Member) => {
        const newActiveMember = activeMember?.id === member.id ? null : member;
        onActiveMemberChange(newActiveMember);
    }, [activeMember, onActiveMemberChange]);

    // Update search visibility and notify parent component
    const updateSearchVisibility = useCallback((isVisible: boolean) => {
        setSearchVisible(isVisible);
        if (onSearchToggle) {
            onSearchToggle(isVisible);
        }
    }, [onSearchToggle]);

    const handleSearchClick = (e: MouseEvent) => {
        e.stopPropagation();
        const newVisibility = !searchVisible;
        updateSearchVisibility(newVisibility);
        
        if (!newVisibility) {
            // Clear search query when closing
            setSearchQuery('');
        }
    };

    // Close search box when clicking outside
    useEffect(() => {
        if (!searchVisible) return;
        
        const handleClickOutside = (e: MouseEvent) => {
            if (searchButtonRef.current && !searchButtonRef.current.contains(e.target as Node)) {
                updateSearchVisibility(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside as unknown as EventListener);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside as unknown as EventListener);
        };
    }, [searchVisible, updateSearchVisibility]);

    const handleSearch = useCallback(() => {
        // This will be called when the search input changes
        // We're using the filterFunction in SearchBox directly, so no need to do anything here
    }, []);

    const handleSearchResultClick = useCallback((member: Member) => {
        // Select the member
        handleMemberClick(member);
        
        // Close the search box
        updateSearchVisibility(false);
        setSearchQuery('');
    }, [handleMemberClick, updateSearchVisibility]);

    return (
        <ControlsContainer onClick={(e) => e.stopPropagation()}  data-type="control-container" className={className}>
            <Button variant="add" onClick={handleAddMember} />
            {members.length > 1 && (
                <ButtonWrapper ref={searchButtonRef}>
                    <Button variant="search" onClick={handleSearchClick} />
                    {searchVisible && (
                        <SearchBox
                            data={members}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            onSearch={handleSearch}
                            placeholder="Search members..."
                            floating={true}
                            filterFunction={(member, query) => 
                                member.name?.toLowerCase().includes(query.toLowerCase())}
                            onResultClick={handleSearchResultClick}
                            onToggle={updateSearchVisibility}
                        />
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
    gap: ${({ theme }) => theme.spacing.md};
    align-items: center;
    position: fixed;
    left: ${({ theme }) => theme.spacing.md};
    top: 50%;
    transform: translateY(-50%);
    background-color: ${({ theme }) => theme.colors.ui.dark};
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% /
                    0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg
                    0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075);
    z-index: 10000;
`;

const ButtonWrapper = styled.div`
    border-top: 1px solid ${({ theme }) => theme.colors.text.accent};
    position: relative;
    padding-top: ${({ theme }) => theme.spacing.md};
    width: 100%;
`;

export default React.memo(Controls);