import { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption';
type TypographyColor = 'primary' | 'secondary' | 'error' | 'white';
type TypographyWeight = 'regular' | 'medium' | 'semibold' | 'bold';

interface TypographyProps {
    variant?: TypographyVariant;
    color?: TypographyColor;
    weight?: TypographyWeight;
    className?: string;
    children: ReactNode;
}

const Typography: FC<TypographyProps> = ({
    variant = 'body1',
    color = 'primary',
    weight = 'regular',
    className,
    children
}) => {
    return (
        <StyledTypography
            className={className}
            $variant={variant}
            $color={color}
            $weight={weight}
        >
            {children}
        </StyledTypography>
    );
};

const variantStyles = {
    h1: css`
        font-size: 2.5rem;
        line-height: 1.2;
    `,
    h2: css`
        font-size: 2rem;
        line-height: 1.3;
    `,
    h3: css`
        font-size: 1.75rem;
        line-height: 1.4;
    `,
    h4: css`
        font-size: 1.5rem;
        line-height: 1.4;
    `,
    subtitle1: css`
        font-size: 1.25rem;
        line-height: 1.5;
    `,
    subtitle2: css`
        font-size: 1.125rem;
        line-height: 1.5;
    `,
    body1: css`
        font-size: 1rem;
        line-height: 1.5;
    `,
    body2: css`
        font-size: 0.875rem;
        line-height: 1.6;
    `,
    caption: css`
        font-size: 0.75rem;
        line-height: 1.5;
    `
};

const colorStyles = {
    primary: css`
        color: #333333;
    `,
    secondary: css`
        color: #666666;
    `,
    error: css`
        color: #d32f2f;
    `,
    white: css`
        color: #ffffff;
    `
};

const weightStyles = {
    regular: css`
        font-weight: 400;
    `,
    medium: css`
        font-weight: 500;
    `,
    semibold: css`
        font-weight: 600;
    `,
    bold: css`
        font-weight: 700;
    `
};

const StyledTypography = styled.div<{
    $variant: TypographyVariant;
    $color: TypographyColor;
    $weight: TypographyWeight;
}>`
    margin: 0;
    padding: 0;
    ${({ $variant }) => variantStyles[$variant]};
    ${({ $color }) => colorStyles[$color]};
    ${({ $weight }) => weightStyles[$weight]};
    transition: color 0.2s ease;
`;

export default Typography;
