import { Member, Note } from './types';

// Function to migrate any string IDs to numeric IDs in localStorage
export const migrateDataToNumericIds = () => {
  // Migrate members
  const membersKey = 'sticky-notes-members';
  const savedMembers = localStorage.getItem(membersKey);
  if (savedMembers) {
    try {
      const members: Member[] = JSON.parse(savedMembers);
      const updatedMembers = members.map(member => {
        // If id is a string, convert it to a number
        if (typeof member.id === 'string') {
          // Extract the numeric portion from "member-{timestamp}" or generate a new ID
          const numericId = (member.id as string).startsWith('member-') 
            ? parseInt((member.id as string).replace('member-', '')) 
            : Date.now() + Math.floor(Math.random() * 1000);
          
          return { ...member, id: numericId };
        }
        return member;
      });
      localStorage.setItem(membersKey, JSON.stringify(updatedMembers));
    } catch (error) {
      console.error('Error migrating members:', error);
    }
  }

  // Migrate notes
  const notesKey = 'sticky-notes-data';
  const savedNotes = localStorage.getItem(notesKey);
  if (savedNotes) {
    try {
      const notes: Note[] = JSON.parse(savedNotes);
      const updatedNotes = notes.map(note => {
        // If memberId is a string, convert it to a number
        if (typeof note.memberId === 'string') {
          // Extract the numeric portion from "member-{timestamp}" or set to undefined
          const numericId = (note.memberId as string).startsWith('member-') 
            ? parseInt((note.memberId as string).replace('member-', '')) 
            : undefined;
            
          return { ...note, memberId: numericId };
        }
        
        return note;
      });
      localStorage.setItem(notesKey, JSON.stringify(updatedNotes));
    } catch (error) {
      console.error('Error migrating notes:', error);
    }
  }
};
