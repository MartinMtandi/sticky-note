import { ColorProps } from "../utils/types";
import styled from 'styled-components';

const Color = ({ color }: ColorProps) => {
    const changeColor = () => {
        console.log("CHange color clicked:", color);
    };
 
    return (
        <ColorButton
            onClick={changeColor}
            style={{ backgroundColor: color.colorHeader }}
        />
    );
};

const ColorButton = styled.div`
    background-color: grey;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        height: 45px;
        width: 45px;
    }
`;

export default Color;