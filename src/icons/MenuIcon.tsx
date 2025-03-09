import React from 'react';
import styled from 'styled-components';

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 4px;
  background: none;
  color: inherit;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Dot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #18181A;
`;

interface MenuIconProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const MenuIcon: React.FC<MenuIconProps> = ({ className, onClick, ...props }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClick?.(e as React.MouseEvent<HTMLDivElement>);
  };

  return (
    <IconContainer className={className} onClick={handleClick} {...props}>
      <Dot />
      <Dot />
      <Dot />
    </IconContainer>
  );
};

export default MenuIcon;
