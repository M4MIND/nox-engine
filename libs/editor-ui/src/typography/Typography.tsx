import { EditorTheme, EditorThemeColors, EditorThemeFontSize } from '@nox-engine/editor-ui';
import React from 'react';
import styled from 'styled-components';

type TypographyProps = {
    children?: React.ReactNode;
};

type TypographyStyleProps = TypographyProps & {
    $color?: EditorThemeColors | 'string';
    $fontSize?: EditorThemeFontSize | 'string';
};

type HStyleProps = TypographyStyleProps & {
    $fontWeight?: string | number;
    $letterSpacing?: string;
};

const TypographyStyle = styled.text<TypographyStyleProps>((props) => ({
    color: props.$color ? props.theme.color[props.$color] : props.theme.color.gray600,
    fontSize: props.$fontSize ? props.theme.font.size[props.$fontSize] : props.theme.font.size.default,
    marginTop: 0,
    marginBottom: '1rem',
}));

const HStyles = styled(TypographyStyle)<HStyleProps>((props) => ({
    fontWeight: props.$fontWeight ?? 500,
    letterSpacing: props.$letterSpacing ?? '0.06rem',
}));

const H1: React.FC<HStyleProps> = (props) => {
    return (
        <HStyles $fontSize={'h1'} theme={EditorTheme} as={'h1'} {...props}>
            {props.children}
        </HStyles>
    );
};
const H2: React.FC<HStyleProps> = (props) => {
    return (
        <HStyles $fontSize={'h2'} theme={EditorTheme} as={'h2'} {...props}>
            {props.children}
        </HStyles>
    );
};
const H3: React.FC<HStyleProps> = (props) => {
    return (
        <HStyles $fontSize={'h3'} theme={EditorTheme} as={'h3'} {...props}>
            {props.children}
        </HStyles>
    );
};
const H4: React.FC<HStyleProps> = (props) => {
    return (
        <HStyles $fontSize={'h4'} theme={EditorTheme} as={'h4'} {...props}>
            {props.children}
        </HStyles>
    );
};

const H5: React.FC<HStyleProps> = (props) => {
    return (
        <HStyles $fontSize={'h5'} theme={EditorTheme} as={'h5'} {...props}>
            {props.children}
        </HStyles>
    );
};

const H6: React.FC<HStyleProps> = (props) => {
    return (
        <HStyles $fontSize={'h6'} theme={EditorTheme} as={'h6'} {...props}>
            {props.children}
        </HStyles>
    );
};

const P: React.FC<TypographyProps> = (props) => {
    return (
        <TypographyStyle as={'p'} theme={EditorTheme} {...props}>
            {props.children}
        </TypographyStyle>
    );
};

export { H1, H2, H3, H4, H5, H6, P };
