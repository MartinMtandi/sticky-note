import { FC, useRef, useEffect, useState, MouseEvent } from 'react'
import styled from 'styled-components'
import { Note, NoteColors } from '../utils/types';
import { autoGrow, setZIndex } from '../utils';
import { useNotes } from '../services/useNotes';
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
    const lastMousePos = useRef({ x: 0, y: 0 });
    const cardRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const { updateNote } = useNotes();

    useEffect(() => {
        autoGrow(textAreaRef);
    }, []);

    const mouseDown = (e: MouseEvent<HTMLDivElement>) => {
        setZIndex(cardRef.current);
        mouseStartPos.current = { x: e.clientX, y: e.clientY };
        lastMousePos.current = { x: e.clientX, y: e.clientY };
        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseup', mouseUp);
    }

    const mouseMove = (e: globalThis.MouseEvent) => {
        const dx = e.clientX - lastMousePos.current.x;
        const dy = e.clientY - lastMousePos.current.y;
        lastMousePos.current = { x: e.clientX, y: e.clientY };
        setPos(prevPos => ({ 
            x: prevPos.x + dx,
            y: prevPos.y + dy 
        }));
    }

    const mouseUp = () => {
        window.removeEventListener('mousemove', mouseMove);
        window.removeEventListener('mouseup', mouseUp);
        
        // Calculate final position
        const finalPosition = {
            x: note.position.x + (lastMousePos.current.x - mouseStartPos.current.x),
            y: note.position.y + (lastMousePos.current.y - mouseStartPos.current.y)
        };
        
        // Update note with final position
        updateNote({
            ...note,
            position: finalPosition
        });
        
        // Update local state
        setPos(finalPosition);
    }

    return (
        <Card 
            data-type="note-card"
            onMouseDown={mouseDown} 
            ref={cardRef} 
            $colors={colors} 
            $position={pos}
        >
            <CardHeader $colors={colors}>
                <Trash />
            </CardHeader>
            <CardBody>
                <TextArea
                    ref={textAreaRef}
                    $colors={colors}
                    defaultValue={body}
                    onInput={() => autoGrow(textAreaRef)}
                    onFocus={() => {
                        setZIndex(cardRef.current);
                    }}
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
