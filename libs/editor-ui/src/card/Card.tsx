import { EditorTheme, EditorThemeColors } from '@nox-engine/editor-ui';
import React from 'react';
import styled from 'styled-components';

type CardProps = {
    children?: React.ReactNode;
    $color?: EditorThemeColors;
};

const CardStyle = styled.div<CardProps>((props) => ({
    boxShadow: '0 0.75rem 1.5rem rgb(18 38 63 / 3%)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '0',
    wordWrap: 'break-word',
    backgroundColor: props.$color ? props.theme.color[props.$color] : props.theme.color.white,
    backgroundClip: 'border-box',
    border: '0 solid #f6f6f6',
    borderRadius: '0.25rem',
}));

const Card: React.FC<CardProps> = (props) => {
    return (
        <CardStyle theme={EditorTheme} {...props}>
            {props.children}
        </CardStyle>
    );
};

export { Card };
