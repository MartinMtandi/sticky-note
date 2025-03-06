import { FC } from 'react';
import styled from 'styled-components';
import AddButton from "./AddButton";
import { useNotes } from '../services/useNotes';
import Color from './Color';
import colors from '../assets/colors.json';

const Controls: FC = () => {
    const { addNote } = useNotes();

    const handleAddNote = () => {
        addNote({
            body: '',
            colors: {
                id: "color-purple",
                colorHeader: "#FED0FD",
                colorBody: "#FEE5FD",
                colorText: "#18181A",
            },
            position: { x: 50, y: 50 },
        });
    };

    return (
        <ControlsContainer>
            <AddButton onClick={handleAddNote} />
            {colors.map((color) => (
                <Color key={color.id} color={color} />
            ))}
        </ControlsContainer>
    );
};

const ControlsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
    align-items: center;
    position: fixed;
    left: 1em;
    top: 50%;
    transform: translateY(-50%);
    background-color: #35363e;
    padding: 1em 1em;
    border-radius: 40px;
    box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% /
                    0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg
                    0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075);
    z-index: 10000;
`;

export default Controls;