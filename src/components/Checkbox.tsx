import { FC } from 'react';
import styled from 'styled-components';

interface CheckboxProps {
    checked: boolean;
    onChange: () => void;
    color: string;
}

const Checkbox: FC<CheckboxProps> = ({ checked, onChange, color }) => {
    return (
        <CheckboxContainer onClick={onChange}>
            <HiddenCheckbox checked={checked} />
            <StyledCheckbox $checked={checked} $color={color}>
                {checked && (
                    <CheckMark viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                    </CheckMark>
                )}
            </StyledCheckbox>
        </CheckboxContainer>
    );
};

const CheckboxContainer = styled.div`
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })<{ checked: boolean }>`
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;

const StyledCheckbox = styled.div<{ $checked: boolean; $color: string }>`
    display: inline-block;
    width: 16px;
    height: 16px;
    background: ${props => props.$checked ? props.$color : 'transparent'};
    border: 2px solid ${props => props.$color};
    border-radius: 3px;
    transition: all 150ms;
`;

const CheckMark = styled.svg`
    fill: none;
    stroke: white;
    stroke-width: 3px;
    width: 16px;
    height: 16px;
`;

export default Checkbox;
