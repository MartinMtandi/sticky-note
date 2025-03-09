import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Member } from '../utils/types';

const STORAGE_KEY = 'sticky-notes-members';

// Define the shape of the context
interface MembersContextType {
  members: Member[];
  addMember: (member: { name: string; colorHeader: string; colorBody: string; colorText: string }) => void;
  updateMember: (id: string, updatedMember: Member) => void;
  deleteMember: (memberId: string) => void;
  getMember: (memberId: string) => Member | undefined;
}

// Create the context
const MembersContext = createContext<MembersContextType | undefined>(undefined);

// Provider component
export const MembersProvider = ({ children }: { children: ReactNode }) => {
  const [members, setMembers] = useState<Member[]>(() => {
    const savedMembers = localStorage.getItem(STORAGE_KEY);
    return savedMembers ? JSON.parse(savedMembers) : [];
  });

  // Save members to local storage when updated
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  }, [members]);

  const addMember = (member: { name: string; colorHeader: string; colorBody: string; colorText: string }) => {
    const newMember: Member = { ...member, id: `member-${Date.now()}` };
    setMembers((prev) => [...prev, newMember]);
  };

  const updateMember = (id: string, updatedMember: Member) => {
    setMembers((prev) => prev.map((member) => (member.id === id ? updatedMember : member)));
  };

  const deleteMember = (memberId: string) => {
    setMembers((prev) => prev.filter((member) => member.id !== memberId));
  };

  const getMember = (memberId: string) => members.find((member) => member.id === memberId);

  return (
    <MembersContext.Provider value={{ members, addMember, updateMember, deleteMember, getMember }}>
      {children}
    </MembersContext.Provider>
  );
};

// Hook to use the context
// eslint-disable-next-line react-refresh/only-export-components
export const useMembers = () => {
  const context = useContext(MembersContext);
  if (!context) {
    throw new Error('useMembers must be used within a MembersProvider');
  }
  return context;
};
