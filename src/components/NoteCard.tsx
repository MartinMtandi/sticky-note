import { FC, useRef, useEffect, useState, MouseEvent } from 'react'
import styled from 'styled-components'
import { Note, NoteColors } from '../utils/types';
import { autoGrow, setZIndex } from '../utils';
import { useNotes } from '../services/useNotes';
import { useMembers } from '../services/useMembers';
import Spinner from '../icons/Spinner';
import Button from './Button';

interface StyledProps {
    $colors: NoteColors;
}

interface CardStyledProps extends StyledProps {
    $position: { x: number; y: number };
}

interface NoteCardProps {
    note: Note;
    onDelete: () => void;
}

const NoteCard: FC<NoteCardProps> = ({ note, onDelete }) => {
    const { body, colors } = note;
    const [pos, setPos] = useState<CardStyledProps['$position']>(note.position);
    const [saving, setSaving] = useState<boolean>(false);
    const keyUpTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const mouseStartPos = useRef<CardStyledProps['$position']>({ x: 0, y: 0 });
    const lastMousePos = useRef<CardStyledProps['$position']>({ x: 0, y: 0 });
    const cardRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const { updateNote } = useNotes();
    const { getMember } = useMembers();

    useEffect(() => {
        autoGrow(textAreaRef);
    }, []);

    const handleKeyUp = () => {
        setSaving(true);

        //If we have a timer id, clear it so we can add another two seconds
        if (keyUpTimer.current) {
            clearTimeout(keyUpTimer.current);
        }

        keyUpTimer.current = setTimeout(() => {
            updateNote({
                ...note,
                body: textAreaRef.current?.value || ''
            });
            setSaving(false);
        }, 2000);
    }

    const handleDelete = async (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
        e.stopPropagation(); // Prevent triggering mouseDown event
        await onDelete();
    }

    const mouseDown = (e: MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if(target.getAttribute('data-type') === 'note-header'){
            setZIndex(cardRef.current);
            mouseStartPos.current = { x: e.clientX, y: e.clientY };
            lastMousePos.current = pos;
            window.addEventListener('mousemove', mouseMove);
            window.addEventListener('mouseup', mouseUp); 
        }
   
    }

    const mouseMove = (e: globalThis.MouseEvent) => {
        const dx = e.clientX - mouseStartPos.current.x;
        const dy = e.clientY - mouseStartPos.current.y;
        
        const newPos = {
            x: lastMousePos.current.x + dx,
            y: lastMousePos.current.y + dy
        };
        
        setPos(newPos);
    }

    const mouseUp = (e: globalThis.MouseEvent) => {
        window.removeEventListener('mousemove', mouseMove);
        window.removeEventListener('mouseup', mouseUp);

        const dx = e.clientX - mouseStartPos.current.x;
        const dy = e.clientY - mouseStartPos.current.y;
        
        const finalPos = {
            x: lastMousePos.current.x + dx,
            y: lastMousePos.current.y + dy
        };

        // Update note with final calculated position
        updateNote({
            ...note,
            position: finalPos
        });
    }

    // Get member name from memberId
    const member = note.memberId ? getMember(note.memberId) : null;
    const memberName = member?.name || 'Unassigned';

    return (
        <Card
            className="note-card"
            data-type="note-card"
            onMouseDown={mouseDown}
            ref={cardRef}
            $colors={colors}
            $position={pos}
        >
            <CardHeader data-type="note-header" $colors={colors}>
                <Button variant="delete" onClick={handleDelete} />
                {saving && (
                    <SavingIndicator>
                        <Spinner color={colors.colorText} />
                        <SavingText $colors={colors}>Saving...</SavingText>
                    </SavingIndicator>
                )}
            </CardHeader>
            <CardBody>
                <TextArea
                    ref={textAreaRef}
                    $colors={colors}
                    defaultValue={body}
                    onInput={() => autoGrow(textAreaRef)}
                    onKeyUp={handleKeyUp}
                    onFocus={() => {
                        setZIndex(cardRef.current);
                    }}
                />
            </CardBody>
            <CardFooter $colors={colors}>
                <FooterText $colors={colors}>{memberName}</FooterText>
            </CardFooter>
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
  display: flex;
  flex-direction: column;
`

const CardBody = styled.div`
    padding: 1em;
    flex: 1;
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

const CardFooter = styled.div<StyledProps>`
    background-color: ${props => props.$colors.colorBody};
    border-radius: 0 0 5px 5px;
    padding: 0.5em 1em;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-top: 1px solid ${props => props.$colors.colorHeader};
`

const FooterText = styled.span<StyledProps>`
    color: ${props => props.$colors.colorText};
    font-size: 12px;
    font-style: italic;
`

const SavingIndicator = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`

const SavingText = styled.span<StyledProps>`
    color: ${props => props.$colors.colorText};
`

export default NoteCard;
