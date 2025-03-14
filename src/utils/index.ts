import { ReactElement, RefObject } from 'react';
import { renderToString } from 'react-dom/server';

export const svgToCursor = (component: ReactElement): string => {
    const svgString = renderToString(component);
    return `data:image/svg+xml;base64,${btoa(svgString)}`;
};

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

export const lightenHexColor = (hex: string): string => {
    hex = hex.replace("#", "");

    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    const percent = 44;

    // Blend with white based on percentage
    r = Math.round(r + (255 - r) * (percent / 100));
    g = Math.round(g + (255 - g) * (percent / 100));
    b = Math.round(b + (255 - b) * (percent / 100));

    // Convert back to hex
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
}

export const colors = [
    '#FFEFBE', // Yellow
    '#AFDA9F', // Green
    '#9BD1DE', // Blue
    '#FED0FD', // Purple
    '#FFB5C2', // Pink
    '#FFB584', // Orange
    '#7FDBDA', // Teal
    '#BDEF92', // Lime
    '#FF9AA2', // Coral
    '#D4BBFF', // Lavender
    '#98F5E1', // Mint
    '#FFCBA4'  // Peach
];
