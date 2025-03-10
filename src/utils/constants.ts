import { lightenHexColor } from ".";

export const PRIORITY_COLORS = {
    HIGH: '#FF4D4D',
    MEDIUM: '#FFA500',
    LOW: '#4D79FF'
} as const;

export type Priority = 'HIGH' | 'MEDIUM' | 'LOW';

export const DEFAULT_NOTE_COLORS = {
    colorHeader: "#FFB584",
    colorBody: lightenHexColor("#FFB584"),
    colorText: "#18181A",
} as const;


