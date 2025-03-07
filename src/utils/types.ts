interface NotePosition {
    x: number;
    y: number;
}

export interface NoteColors {
    colorHeader: string;
    colorBody: string;
    colorText: string;
}

export interface Note {
    $id: number;
    body: string;
    colors: NoteColors;
    position: NotePosition;
    memberId?: string;
}

export interface ColorProps {
    color: NoteColors;
}

export interface Member extends NoteColors {
    id: string;
    name: string;
}