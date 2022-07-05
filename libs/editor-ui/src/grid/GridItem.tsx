import { EditorTheme, EditorThemeColors } from '@nox-engine/editor-ui';
import React from 'react';
import styled from 'styled-components';

type GridItemStyleProps = {
    $gridRowStart?: string | number;
    $gridRowEnd?: string | number;
    $gridColumnStart?: string | number;
    $gridColumnEnd?: string | number;
    $backgroundColor?: EditorThemeColors | string;
};

type GridItemProps = GridItemStyleProps & {
    children?: React.ReactNode;
};

const GridItemStyles = styled.div<GridItemStyleProps>((props) => ({
    gridRowStart: props.$gridRowStart ?? 'auto',
    gridRowEnd: props.$gridRowStart ?? 'auto',
    gridColumnStart: props.$gridColumnStart ?? 'auto',
    gridColumnEnd: props.$gridColumnEnd ?? 'auto',
    backgroundColor: props.$backgroundColor ? props.theme.color[props.$backgroundColor] : 'inherit',
}));

const GridItem: React.FC<GridItemProps> = (props) => {
    return (
        <GridItemStyles theme={EditorTheme} {...props}>
            {props.children}
        </GridItemStyles>
    );
};

export { GridItem };
