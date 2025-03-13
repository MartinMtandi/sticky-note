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
        font-size: ${({theme}) => theme.typography.fontSizes['4xl']};
        line-height: ${({theme}) => theme.typography.lineHeights.tightest};
    `,
    h2: css`
        font-size: ${({theme}) => theme.typography.fontSizes['3xl']};
        line-height: ${({theme}) => theme.typography.lineHeights.tighter};
    `,
    h3: css`
        font-size: ${({theme}) => theme.typography.fontSizes['2xl']};
        line-height: ${({theme}) => theme.typography.lineHeights.tight};
    `,
    h4: css`
        font-size: ${({theme}) => theme.typography.fontSizes.xl};
        line-height: ${({theme}) => theme.typography.lineHeights.tight};
    `,
    subtitle1: css`
        font-size: ${({theme}) => theme.typography.fontSizes.lg};
        line-height: ${({theme}) => theme.typography.lineHeights.normal};
    `,
    subtitle2: css`
        font-size: ${({theme}) => theme.typography.fontSizes.xm};
        line-height: ${({theme}) => theme.typography.lineHeights.normal};
    `,
    body1: css`
        font-size: ${({theme}) => theme.typography.fontSizes.md};
        line-height: ${({theme}) => theme.typography.lineHeights.normal};
    `,
    body2: css`
        font-size: ${({theme}) => theme.typography.fontSizes.sm};
        line-height: ${({theme}) => theme.typography.lineHeights.relaxed};
    `,
    caption: css`
        font-size: ${({theme}) => theme.typography.fontSizes.xs};
        line-height: ${({theme}) => theme.typography.lineHeights.normal};
    `
};

const colorStyles = {
    primary: css`
        color: ${({theme}) => theme.colors.text.primary};
    `,
    secondary: css`
        color: ${({theme}) => theme.colors.text.secondary};
    `,
    error: css`
        color: ${({theme}) => theme.colors.text.error};
    `,
    white: css`
        color: ${({theme}) => theme.colors.text.light};
    `
};

const weightStyles = {
    regular: css`
        font-weight: ${({theme}) => theme.typography.fontWeights.regular};
    `,
    medium: css`
        font-weight: ${({theme}) => theme.typography.fontWeights.medium};
    `,
    semibold: css`
        font-weight: ${({theme}) => theme.typography.fontWeights.semibold};
    `,
    bold: css`
        font-weight: ${({theme}) => theme.typography.fontWeights.bold};
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
