import { FC, useCallback, useRef, useEffect, useState, MouseEvent } from 'react'
import styled from 'styled-components'
import { Note, NoteColors } from '../utils/types';
import { autoGrow, setZIndex } from '../utils';
import { useNotes } from '../services/useNotes';
import { useMembers } from '../services/useMembers';
import Spinner from '../icons/Spinner';
import Button from './Button';
import Checkbox from './Checkbox';
import MenuIcon from '../icons/MenuIcon';
import { PRIORITY_COLORS, Priority } from '../utils/constants';

interface StyledProps {
    $colors: NoteColors;
}

interface CardStyledProps extends StyledProps {
    $position: { x: number; y: number };
    $completed?: boolean;
}

interface NoteCardProps {
    note: Note;
    onDelete: () => void;
}

const NoteCard: FC<NoteCardProps> = ({ note, onDelete }) => {
    const { body, colors, priority, completed } = note;
    const [pos, setPos] = useState<CardStyledProps['$position']>(note.position);
    const [saving, setSaving] = useState<boolean>(false);
    const [currentPriority, setCurrentPriority] = useState<Priority | undefined>(priority);
    const [isCompleted, setIsCompleted] = useState<boolean>(completed || false);
    const keyUpTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const mouseStartPos = useRef<CardStyledProps['$position']>({ x: 0, y: 0 });
    const lastMousePos = useRef<CardStyledProps['$position']>({ x: 0, y: 0 });
    const cardRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const { updateNote } = useNotes();
    const { getMember } = useMembers();

    // Define completed colors
    const completedColors = {
        colorHeader: '#4A4A4A',
        colorBody: '#666666',
        colorText: '#CCCCCC'
    };

    // Get current colors based on completion status
    const currentColors = isCompleted ? completedColors : colors;

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

    const cyclePriority = (e: MouseEvent) => {
        e.stopPropagation(); // Prevent triggering mouseDown event
        const priorities: Priority[] = ['HIGH', 'MEDIUM', 'LOW'];
        const currentIndex = currentPriority ? priorities.indexOf(currentPriority) : -1;
        const nextPriority = currentIndex === priorities.length - 1 ? undefined : priorities[(currentIndex + 1) % priorities.length];
        
        setCurrentPriority(nextPriority);
        updateNote({
            ...note,
            priority: nextPriority
        });
    };

    const toggleComplete = () => {
        setIsCompleted(!isCompleted);
        updateNote({
            ...note,
            completed: !isCompleted
        });
    };

    const mouseMove = useCallback((e: globalThis.MouseEvent) => {
        const dx = e.clientX - mouseStartPos.current.x;
        const dy = e.clientY - mouseStartPos.current.y;
    
        const newPos = {
            x: lastMousePos.current.x + dx,
            y: lastMousePos.current.y + dy
        };
    
        setPos(newPos);
    }, [setPos]);

    const mouseUp = useCallback((e: globalThis.MouseEvent) => {
        window.removeEventListener("mousemove", mouseMove);
        window.removeEventListener("mouseup", mouseUp);
    
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
    }, [updateNote, note, mouseMove]);

    const mouseDown = useCallback((e: MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (target.getAttribute("data-type") === "note-header") {
            setZIndex(cardRef.current);
            mouseStartPos.current = { x: e.clientX, y: e.clientY };
            lastMousePos.current = pos;
            window.addEventListener("mousemove", mouseMove);
            window.addEventListener("mouseup", mouseUp);
        }
    }, [pos, mouseMove, mouseUp]); 

    // Get member name from memberId
    const member = note.memberId ? getMember(note.memberId) : null;
    const memberName = member?.name || 'Unassigned';

    return (
        <Card
            className="note-card"
            data-type="note-card"
            onMouseDown={mouseDown}
            ref={cardRef}
            $colors={currentColors}
            $position={pos}
            $completed={isCompleted}
        >
            <CardHeader data-type="note-header" $colors={currentColors}>
                <Button variant="delete" onClick={handleDelete} />
                {saving && (
                    <SavingIndicator>
                        <Spinner color={currentColors.colorText} />
                        <SavingText $colors={currentColors}>Saving...</SavingText>
                    </SavingIndicator>
                )}
                <MenuIcon onClick={(e) => e.stopPropagation()} />
            </CardHeader>
            <CardBody>
                <TextArea
                    ref={textAreaRef}
                    $colors={currentColors}
                    defaultValue={body}
                    onInput={() => autoGrow(textAreaRef)}
                    onKeyUp={handleKeyUp}
                    onFocus={() => {
                        setZIndex(cardRef.current);
                    }}
                    disabled={isCompleted}
                />
            </CardBody>
            <CardFooter $colors={currentColors}>
                <FooterLeft>
                    <Checkbox 
                        checked={isCompleted} 
                        onChange={toggleComplete}
                        color={currentColors.colorHeader}
                    />
                    <FooterText $colors={currentColors}>Completed</FooterText>
                </FooterLeft>
                <FooterRight>
                    {currentPriority && (
                        <PriorityDot 
                            $color={PRIORITY_COLORS[currentPriority]} 
                            onClick={cyclePriority}
                            title={`${currentPriority.charAt(0) + currentPriority.slice(1).toLowerCase()} Priority - Click to change`}
                            style={{ opacity: isCompleted ? 0.5 : 1 }}
                        />
                    )}
                    {!currentPriority && (
                        <PriorityDot 
                            $color="#666"
                            onClick={cyclePriority}
                            title="No Priority - Click to set"
                            style={{ opacity: 0.5 }}
                        />
                    )}
                    <FooterText $colors={currentColors}>{memberName}</FooterText>
                </FooterRight>
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
    opacity: ${props => props.$completed ? 0.8 : 1};
    box-shadow: 
        0 1px 1px hsl(0deg 0% 0% / 0.075),
        0 2px 2px hsl(0deg 0% 0% / 0.075),
        0 4px 4px hsl(0deg 0% 0% / 0.075),
        0 8px 8px hsl(0deg 0% 0% / 0.075),
        0 16px 16px hsl(0deg 0% 0% / 0.075);
    display: flex;
    flex-direction: column;
    transition: opacity 0.2s ease;
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
    cursor: ${props => props.$colors.colorText === '#CCCCCC' ? 'not-allowed' : 'text'};

    &:disabled {
        background-color: inherit;
        color: ${props => props.$colors.colorText};
    }

    &:focus {
        background-color: inherit;
        outline: none;
        width: 100%;
        height: 100%;
    }
`

const CardHeader = styled.div<StyledProps>`
    display: flex;
    align-items: center;
    padding: 0.5em;
    background-color: ${props => props.$colors.colorHeader};
    border-radius: 5px 5px 0 0;
    position: relative;

    > :first-child {
        margin-right: auto;
    }
`;

const CardFooter = styled.div<StyledProps>`
    background-color: ${props => props.$colors.colorBody};
    border-radius: 0 0 5px 5px;
    padding: 0.5em 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid ${props => props.$colors.colorHeader};
`

const FooterLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const FooterRight = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const FooterText = styled.span<StyledProps>`
    color: ${props => props.$colors.colorText};
    font-size: 12px;
    font-style: italic;
`

const PriorityDot = styled.div<{ $color: string }>`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${props => props.$color};
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.2);
    }
`;

const SavingIndicator = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5em;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
`;

const SavingText = styled.span<StyledProps>`
    color: ${props => props.$colors.colorText};
    font-size: 12px;
`;

export default NoteCard;
