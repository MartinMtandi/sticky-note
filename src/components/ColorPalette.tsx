import { FC } from 'react';
import styled from 'styled-components';

interface ColorPaletteProps {
    selectedColor: string;
    onColorSelect: (color: string) => void;
}

const colors = [
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

const ColorPalette: FC<ColorPaletteProps> = ({ selectedColor, onColorSelect }) => {
    return (
        <ColorGrid>
            {colors.map((color) => (
                <ColorButton
                    key={color}
                    $color={color}
                    $isSelected={selectedColor === color}
                    onClick={() => onColorSelect(color)}
                    type="button"
                />
            ))}
        </ColorGrid>
    );
};

const ColorGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.75rem;
    width: 100%;
`;

const ColorButton = styled.button<{ $color: string; $isSelected: boolean }>`
    width: 100%;
    aspect-ratio: 1;
    border-radius: 8px;
    border: 2px solid ${({ $isSelected }) => $isSelected ? '#333' : 'transparent'};
    background-color: ${({ $color }) => $color};
    cursor: pointer;
    transition: all 0.2s;
    padding: 0;

    &:hover {
        transform: scale(1.05);
        border-color: #666;
    }

    &:active {
        transform: scale(0.95);
    }
`;

export default ColorPalette;
