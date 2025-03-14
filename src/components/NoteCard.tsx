import {
  FC,
  useCallback,
  useRef,
  useEffect,
  useState,
  MouseEvent,
} from "react";
import styled, { keyframes, css } from "styled-components";
import {
  NoteColors,
  Member,
  NoteCardProps,
  CardStyledProps,
  StyledProps,
} from "../utils/types";
import { autoGrow, setZIndex } from "../utils";
import { useNotes } from "../context/GlobalNotesContext";
import { useMembers } from "../context/GlobalMembersContext";
import Spinner from "../icons/Spinner";
import Button from "./Button";
import Checkbox from "./Checkbox";
import { defaultTheme as theme } from "../utils/theme";
import MenuIcon from "../icons/MenuIcon";
import { Priority, TASK_STATUS_COLORS } from "../utils/constants";
import { Pill } from "./Pill";

const popIn = keyframes`
    0% {
        opacity: 0;
        transform: scale(0.5);
    }
    60% {
        transform: scale(1.05);
    }
    80% {
        transform: scale(0.95);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
`;

const NoteCard: FC<NoteCardProps> = ({
  note,
  onDelete,
  id,
  className,
  animationDelay = 0,
}) => {
  const { body, colors, priority, completed, memberId } = note;
  const [taskStatus, setTaskStatus] = useState<keyof typeof TASK_STATUS_COLORS>(note.taskStatus || "READY_FOR_DEV");
  const [pos, setPos] = useState<CardStyledProps["$position"]>(note.position);
  const [saving, setSaving] = useState<boolean>(false);
  const [currentPriority, setCurrentPriority] = useState<Priority | undefined>(
    priority
  );
  const [isCompleted, setIsCompleted] = useState<boolean>(completed || false);
  const [showMemberSelector, setShowMemberSelector] = useState(false);
  const keyUpTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mouseStartPos = useRef<CardStyledProps["$position"]>({ x: 0, y: 0 });
  const lastMousePos = useRef<CardStyledProps["$position"]>({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { updateNote } = useNotes();
  const { getMember, members } = useMembers();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set visibility after delay for animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, animationDelay);

    return () => clearTimeout(timer);
  }, [animationDelay]);

  // Get current member
  const currentMember = memberId ? getMember(memberId) : null;

  // Define completed colors
  const completedColors = {
    colorHeader: theme.colors.text.dark,
    colorBody: theme.colors.text.secondary,
    colorText: theme.colors.text.accent,
  };

  // Get current colors based on completion status
  const currentColors = isCompleted ? completedColors : colors;

  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (
        showMemberSelector &&
        cardRef.current &&
        !cardRef.current.contains(event.target as Node)
      ) {
        setShowMemberSelector(false);
      }
    };

    if (showMemberSelector) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMemberSelector]);

  const handleKeyUp = () => {
    setSaving(true);

    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    keyUpTimer.current = setTimeout(() => {
      updateNote({
        ...note,
        body: textAreaRef.current?.value || "",
      });
      setSaving(false);
    }, 2000);
  };

  const handleDelete = async (
    e: MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    e.stopPropagation();
    await onDelete();
  };

  const handleMemberSelect = (
    memberId: number | undefined,
    memberColors?: NoteColors
  ) => {
    updateNote({
      ...note,
      memberId,
      colors: memberColors || colors, // Keep current colors if unassigning
    });
    setShowMemberSelector(false);
  };

  const toggleMemberSelector = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMemberSelector(!showMemberSelector);
  };

  const cyclePriority = (e: MouseEvent) => {
    e.stopPropagation();
    const priorities: Priority[] = ["HIGH", "MEDIUM", "LOW"];
    const currentIndex = currentPriority
      ? priorities.indexOf(currentPriority)
      : -1;
    const nextPriority =
      currentIndex === priorities.length - 1
        ? undefined
        : priorities[(currentIndex + 1) % priorities.length];

    setCurrentPriority(nextPriority);
    updateNote({
      ...note,
      priority: nextPriority,
    });
  };

  const cycleStatus = (e: MouseEvent) => {
    e.stopPropagation();
    const statuses = Object.keys(TASK_STATUS_COLORS) as Array<keyof typeof TASK_STATUS_COLORS>;
    const currentIndex = taskStatus ? Object.keys(TASK_STATUS_COLORS).indexOf(taskStatus) : 0;
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];

    setIsCompleted(nextStatus === 'DONE');    
    setTaskStatus(nextStatus);
    
    updateNote({ ...note, taskStatus: nextStatus });
};

  const mouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      const dx = e.clientX - mouseStartPos.current.x;
      const dy = e.clientY - mouseStartPos.current.y;

      const newPos = {
        x: lastMousePos.current.x + dx,
        y: lastMousePos.current.y + dy,
      };

      setPos(newPos);
    },
    [setPos]
  );

  const mouseUp = useCallback(
    (e: globalThis.MouseEvent) => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);

      const dx = e.clientX - mouseStartPos.current.x;
      const dy = e.clientY - mouseStartPos.current.y;

      const finalPos = {
        x: lastMousePos.current.x + dx,
        y: lastMousePos.current.y + dy,
      };

      updateNote({
        ...note,
        position: finalPos,
      });
    },
    [updateNote, note, mouseMove]
  );

  const handleMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      if (target.getAttribute("data-type") === "note-header") {
        setZIndex(cardRef.current);
        mouseStartPos.current = { x: e.clientX, y: e.clientY };
        lastMousePos.current = pos;
        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mouseup", mouseUp);
      }
    },
    [pos, mouseMove, mouseUp]
  );

  // Get member name from memberId
  const memberName = currentMember?.name || "Unassigned";

  return (
    <Card
      className={`note-card ${className || ""}`}
      id={id}
      ref={cardRef}
      onMouseDown={handleMouseDown}
      $colors={currentColors}
      $position={pos}
      $completed={isCompleted}
      $visible={isVisible}
    >
      <CardHeader data-type="note-header" $colors={currentColors}>
        <Button variant="delete" onClick={handleDelete} />
        {saving && (
          <SavingIndicator>
            <Spinner color={currentColors.colorText} />
            <SavingText $colors={currentColors}>Saving...</SavingText>
          </SavingIndicator>
        )}
        <div style={{ position: "relative" }}>
          <MenuIcon onClick={toggleMemberSelector} />
          <MemberSelector $show={showMemberSelector}>
            {members.map((member: Member) => (
              <MemberOption
                key={member.id}
                $color={member.colorHeader}
                $bodyColor={member.colorBody}
                $textColor={member.colorText}
                $isActive={member.id === note.memberId}
                onClick={() =>
                  handleMemberSelect(
                    member.id === note.memberId ? undefined : member.id,
                    member.id === note.memberId
                      ? undefined
                      : {
                          colorHeader: member.colorHeader,
                          colorBody: member.colorBody,
                          colorText: member.colorText,
                        }
                  )
                }
                data-name={member.name}
              />
            ))}
            {note.memberId && (
              <UnassignOption onClick={() => handleMemberSelect(undefined)} />
            )}
          </MemberSelector>
        </div>
      </CardHeader>
      <CardBody>
        <PillWrapper>
          <Pill
            priority={currentPriority}
            onClick={cyclePriority}
            disabled={isCompleted}
          />
        </PillWrapper>
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
          <Pill
            taskStatus={taskStatus}
            onClick={cycleStatus}
            disabled={isCompleted}
          />
        </FooterLeft>
        <FooterRight>
          <FooterText $colors={currentColors}>{memberName}</FooterText>
        </FooterRight>
      </CardFooter>
    </Card>
  );
};

const Card = styled.div<CardStyledProps>`
  position: absolute;
  left: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
  width: 300px;
  min-height: 200px;
  background-color: ${(props) => props.$colors.colorBody};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  cursor: auto;
  display: flex;
  flex-direction: column;
  transition: opacity ${({ theme }) => theme.transitions.fast};
  opacity: 0;
  transform: scale(0.5);

  ${(props) =>
    props.$visible &&
    css`
      animation: ${popIn} 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    `}
`;

const CardBody = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  flex: 1;
`;

const PillWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.m};
  display: flex;
  align-items: center;
  min-height: 24px;
`;

const TextArea = styled.textarea<StyledProps>`
  background-color: inherit;
  border: none;
  width: 100%;
  height: 100%;
  resize: none;
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${(props) => props.$colors.colorText};
  cursor: ${(props) =>
    props.$colors.colorText === props.theme.colors.text.accent
      ? "not-allowed"
      : "text"};

  &:disabled {
    background-color: inherit;
    color: ${(props) => props.$colors.colorText};
  }

  &:focus {
    background-color: inherit;
    outline: none;
    width: 100%;
    height: 100%;
  }
`;

const CardHeader = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${(props) => props.$colors.colorHeader};
  border-radius: ${({ theme }) => theme.borderRadius.m}
    ${({ theme }) => theme.borderRadius.m} 0 0;
  position: relative;

  > :first-child {
    margin-right: auto;
  }
`;

const CardFooter = styled.div<StyledProps>`
  background-color: ${(props) => props.$colors.colorBody};
  border-radius: 0 0 ${({ theme }) => theme.borderRadius.m}
    ${({ theme }) => theme.borderRadius.m};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${(props) => props.$colors.colorHeader};
`;

const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const FooterRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const FooterText = styled.span<StyledProps>`
  color: ${(props) => props.$colors.colorText};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-style: italic;
`;

const SavingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const SavingText = styled.span<StyledProps>`
  color: ${(props) => props.$colors.colorText};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
`;

const MemberSelector = styled.div<{ $show: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${({ theme }) => theme.colors.text.light};
  border-radius: ${({ theme }) => theme.borderRadius.m};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.spacing.sm};
  display: ${(props) => (props.$show ? "flex" : "none")};
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  z-index: 10001;
`;

const MemberOption = styled.div<{
  $color: string;
  $bodyColor: string;
  $textColor: string;
  $isActive: boolean;
}>`
  width: 24px;
  height: 24px;
  border-radius: ${({ theme }) => theme.borderRadius.round};
  background-color: ${(props) => props.$color};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  position: relative;
  box-shadow: ${(props) =>
    props.$isActive ? "0 0 0 2px white, 0 0 0 4px " + props.$color : "none"};

  &:hover {
    transform: scale(1.1);
  }

  &::before {
    content: "";
    position: absolute;
    left: calc(100% + 4px);
    top: 50%;
    transform: translateY(-50%);
    border: 6px solid transparent;
    border-right-color: ${(props) => props.$bodyColor};
    opacity: 0;
    transition: opacity ${({ theme }) => theme.transitions.fast};
  }

  &::after {
    content: attr(data-name);
    position: absolute;
    left: calc(120% + 6px);
    top: 50%;
    transform: translateY(-50%);
    white-space: nowrap;
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
    background-color: ${(props) => props.$bodyColor};
    color: ${(props) => props.$textColor};
    padding: ${({ theme }) => theme.spacing.xs}
      ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    opacity: 0;
    transition: opacity ${({ theme }) => theme.transitions.fast};
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  &:hover::before,
  &:hover::after {
    opacity: 1;
  }
`;

const UnassignOption = styled.div`
  width: 24px;
  height: 24px;
  border-radius: ${({ theme }) => theme.borderRadius.round};
  background-color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  position: relative;
  opacity: 0.5;

  &:hover {
    transform: scale(1.1);
    opacity: 0.8;
  }

  &::after {
    content: "Unassign";
    position: absolute;
    left: calc(120% + 6px);
    top: 50%;
    transform: translateY(-50%);
    white-space: nowrap;
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
    background-color: ${({ theme }) => theme.colors.text.secondary};
    color: ${({ theme }) => theme.colors.text.light};
    padding: ${({ theme }) => theme.spacing.xs}
      ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.spacing.xs};
    opacity: 0;
    transition: opacity ${({ theme }) => theme.transitions.fast};
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  &:hover::after {
    opacity: 1;
  }
`;

export default NoteCard;
