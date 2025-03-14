import { FC } from 'react';
import styled from 'styled-components';
import { colors } from '../utils/constants';

interface ColorPaletteProps {
    selectedColor: string;
    onColorSelect: (color: string) => void;
}

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
                    aria-label={color}
                />
            ))}
        </ColorGrid>
    );
};

const ColorGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: ${({ theme }) => theme.spacing.m};
    width: 100%;
`;

const ColorButton = styled.button<{ $color: string; $isSelected: boolean }>`
    width: 100%;
    aspect-ratio: 1;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    border: 2px solid ${({ $isSelected }) => $isSelected ? '#333' : 'transparent'};
    background-color: ${({ $color }) => $color};
    cursor: pointer;
    transition: all 0.2s;
    padding: 0;

    &:hover {
        transform: scale(1.05);
        border-color: ${({ theme }) => theme.colors.text.secondary};
        aria-label: ${({ $color }) => $color};
    }

    &:active {
        transform: scale(0.95);
    }
`;

export default ColorPalette;
