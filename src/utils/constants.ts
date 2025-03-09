export const PRIORITY_COLORS = {
    HIGH: '#FF4D4D',
    MEDIUM: '#FFA500',
    LOW: '#4D79FF'
} as const;

export type Priority = 'HIGH' | 'MEDIUM' | 'LOW';

export const DEFAULT_NOTE_COLORS = {
    colorHeader: "#FED0FD",
    colorBody: "#FEE5FD",
    colorText: "#18181A",
} as const;
