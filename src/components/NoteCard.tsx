import { FC, useRef, useEffect, useState, MouseEvent } from 'react'
import styled from 'styled-components'
import { Note, NoteColors } from '../assets/fakeData';
import Trash from '../icons/Trash';

interface StyledProps {
    $colors: NoteColors;
}

interface CardStyledProps extends StyledProps {
    $position: { x: number; y: number };
}

const NoteCard: FC<{ note: Note }> = ({ note }) => {
    const { body, colors } = note;
    const [pos, setPos] = useState(note.position);
    const mouseStartPos = useRef({ x: 0, y: 0 });
    const cardRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        autoGrow(textAreaRef);
    }, []);

    const autoGrow = (ref: React.RefObject<HTMLTextAreaElement>) => {
        if (ref?.current) {
            ref.current.style.height = "auto"; // Reset the height
            ref.current.style.height = ref.current.scrollHeight + "px"; // Set the new height
        }
    }

    const mouseDown = (e: MouseEvent<HTMLDivElement>) => {
        mouseStartPos.current = { x: e.clientX, y: e.clientY };
        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseup', mouseUp);
    }

    const mouseMove = (e: globalThis.MouseEvent) => {
        const dx = e.clientX - mouseStartPos.current.x;
        const dy = e.clientY - mouseStartPos.current.y;
        setPos({ x: pos.x + dx, y: pos.y + dy });
    }

    const mouseUp = () => {
        window.removeEventListener('mousemove', mouseMove);
        window.removeEventListener('mouseup', mouseUp);
    }

    return (
        <Card onMouseDown={mouseDown} ref={cardRef} $colors={colors} $position={pos}>
            <CardHeader $colors={colors}>
                <Trash />
            </CardHeader>
            <CardBody>
                <TextArea
                    ref={textAreaRef}
                    $colors={colors}
                    defaultValue={body}
                    onInput={() => autoGrow(textAreaRef)}
                />
            </CardBody>
        </Card>
    )
}

const Card = styled.div<CardStyledProps>`
  width: 400px;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  left: ${props => props.$position.x}px;
  top: ${props => props.$position.y}px;
  background-color: ${props => props.$colors.colorBody};
  box-shadow: 
    0 1px 1px hsl(0deg 0% 0% / 0.075),
    0 2px 2px hsl(0deg 0% 0% / 0.075),
    0 4px 4px hsl(0deg 0% 0% / 0.075),
    0 8px 8px hsl(0deg 0% 0% / 0.075),
    0 16px 16px hsl(0deg 0% 0% / 0.075);
`

const CardBody = styled.div`
    padding: 1em;
    border-radius: 0 0 5px 5px;
`

const TextArea = styled.textarea<StyledProps>`
    background-color: inherit;
    border: none;
    width: 100%;
    height: 100%;
    resize: none;
    font-size: 16px;
    color: ${props => props.$colors.colorText};

    &:focus {
        background-color: inherit;
        outline: none;
        width: 100%;
        height: 100%;
    }
`

const CardHeader = styled.div<StyledProps>`
    background-color: ${props => props.$colors.colorHeader}; 
    border-radius: 5px 5px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
`

export default NoteCard
