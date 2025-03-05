import { RefObject } from 'react';

export const autoGrow = (ref: RefObject<HTMLTextAreaElement>) => {
    if (ref?.current) {
        ref.current.style.height = "auto"; // Reset the height
        ref.current.style.height = ref.current.scrollHeight + "px"; // Set the new height
    }
}

export const setZIndex = (selectedCard: HTMLDivElement | null) => {
    if (!selectedCard) return;

    // Get all cards
    const cards = document.querySelectorAll('[data-type="note-card"]');
    
    // Reset all cards to base z-index
    cards.forEach(card => {
        (card as HTMLElement).style.zIndex = '1';
    });
    
    // Set selected card to top
    selectedCard.style.zIndex = '2';
}
