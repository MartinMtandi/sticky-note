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

export const fakeData: Note[] = [
    {
        $id: 1,
        body: 'Resources:\n- Book: "You Don\'t Know JS: Scope & Closures" by Kyle Simpson.\n\n- Online Course: "JavaScript Patterns" on Udemy.\n\n- Articles:\n"Understanding JavaScript Closures" on Medium.\n\n"Mastering JavaScript Modules" on Dev.to.',
        colors: {
            id: "color-purple",
            colorHeader: "#FED0FD",
            colorBody: "#FEE5FD",
            colorText: "#18181A",
        },
        position: { x: 505, y: 10 },
    },
    {
        $id: 2,
        body: 'Resources:\n- Book: "You Don\'t Know JS: Scope & Closures" by Kyle Simpson.\n\n- Online Course: "JavaScript Patterns" on Udemy.\n\n- Articles:\n"Understanding JavaScript Closures" on Medium.\n\n"Mastering JavaScript Modules" on Dev.to.',
        colors: {
            id: "color-blue",
            colorHeader: "#D0E6FE",
            colorBody: "#E5F1FE",
            colorText: "#18181A",
        },
        position: { x: 20, y: 50 },
    },
    {
        $id: 3,
        body: 
            'Resources:\n- Book: "You Don\'t Know JS: Scope & Closures" by Kyle Simpson.\n\n- Online Course: "JavaScript Patterns" on Udemy.\n\n- Articles:\n"Understanding JavaScript Closures" on Medium.\n\n"Mastering JavaScript Modules" on Dev.to.'
        ,
        colors: {
            id: "color-yellow",
            colorHeader: "#FFEFBE",
            colorBody: "#FFF5DF",
            colorText: "#18181A",
        },
        position: { x: 605, y: 500 },
    },
];
