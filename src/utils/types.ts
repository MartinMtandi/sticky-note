interface NotePosition {
    x: number;
    y: number;
}

export interface NoteColors {
    id: string;
    colorHeader: string;
    colorBody: string;
    colorText: string;
}

export interface Note {
    $id: number;
    body: string;
    colors: NoteColors;
    position: NotePosition;
}