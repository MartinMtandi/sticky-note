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

export const TASK_STATUS_COLORS = {
    READY_FOR_DEV: '#6B6B6B',      // Gray
    IN_PROGRESS: '#4D79FF',        // Blue
    WAITING_FOR_REVIEW: '#FFA500',  // Orange
    QA: '#9C27B0',                 // Purple
    READY_FOR_RELEASE: '#4CAF50',  // Green
    BLOCKED: '#FF4D4D',            // Red
    DONE: '#009688'                // Teal
};

export const TASK_STATUS_LABELS = {
    READY_FOR_DEV: 'Ready for Dev',
    IN_PROGRESS: 'In Progress',
    WAITING_FOR_REVIEW: 'Waiting for Review',
    QA: 'QA',
    READY_FOR_RELEASE: 'Ready for Release',
    BLOCKED: 'Blocked',
    DONE: 'Done'
};


