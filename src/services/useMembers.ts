import { useState, useEffect } from 'react';

interface Member {
    id: string;
    name: string;
    colorHeader: string;
    colorBody: string;
    colorText: string;
}

const STORAGE_KEY = 'sticky-notes-members';

// Initial members should be empty
const initialMembers: Member[] = [];

export const useMembers = () => {
    const [members, setMembers] = useState<Member[]>([]);

    // Load members from localStorage on initial mount
    useEffect(() => {
        const savedMembers = localStorage.getItem(STORAGE_KEY);
        if (savedMembers) {
            setMembers(JSON.parse(savedMembers));
        } else {
            // If no saved members, set empty array
            setMembers(initialMembers);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMembers));
        }
    }, []);

    // Save members whenever they change
    const saveMembers = (updatedMembers: Member[]) => {
        setMembers(updatedMembers);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMembers));
    };

    const addMember = (member: Omit<Member, 'id'>) => {
        const newMember: Member = {
            ...member,
            id: `member-${Date.now()}`, // Use timestamp as unique ID
        };
        saveMembers([...members, newMember]);
    };

    const updateMember = (updatedMember: Member) => {
        const updatedMembers = members.map((member) => 
            member.id === updatedMember.id ? updatedMember : member
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
