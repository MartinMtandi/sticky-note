import { useState } from 'react';
import { Member } from '../utils/types';

const STORAGE_KEY = 'sticky-notes-members';

// Initial members should be empty
const initialMembers: Member[] = [];

export const useMembers = () => {
    const [members, setMembers] = useState<Member[]>(() => {
        const savedMembers = localStorage.getItem(STORAGE_KEY);
        return savedMembers ? JSON.parse(savedMembers) : initialMembers;
    });

    const saveMembers = (updatedMembers: Member[]) => {
        setMembers(updatedMembers);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMembers));
    };

    const addMember = (member: { name: string; colorHeader: string; colorBody: string; colorText: string }) => {
        const newMember: Member = {
            ...member,
            id: `member-${Date.now()}`, // Use timestamp as unique ID
        };
        saveMembers([...members, newMember]);
    };

    const updateMember = (id: string, updatedMember: Member) => {
        const updatedMembers = members.map((member) => 
            member.id === id ? updatedMember : member
        );
        saveMembers(updatedMembers);
    };

    const deleteMember = (memberId: string) => {
        const updatedMembers = members.filter((member) => member.id !== memberId);
        saveMembers(updatedMembers);
    };

    const getMember = (memberId: string) => {
        return members.find((member) => member.id === memberId);
    };

    return {
        members,
        addMember,
        updateMember,
        deleteMember,
        getMember
    };
};
