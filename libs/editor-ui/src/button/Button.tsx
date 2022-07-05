import { EditorTheme, EditorThemeColors, Grid, GridItem } from '@nox-engine/editor-ui';
import React from 'react';
import styled from 'styled-components';

type ButtonStyle = {
    $backgroundColor?: EditorThemeColors;
    $color?: EditorThemeColors;
    $icon?: JSX.Element;
};

type Button = ButtonStyle & {
    children: React.ReactNode;
};

const ButtonStyleDefault = styled.button<Button>((props) => ({
    display: 'inline-block',
    fontWeight: '400',
    lineHeight: '1.5',
    color: props.$color ? props.theme.color[props.$color] ?? props.$color : props.theme.color['blue'],
    textAlign: 'center',
    verticalAlign: 'middle',
    cursor: 'pointer',
    userSelect: 'none',
    backgroundColor: props.$backgroundColor
        ? props.theme.color[props.$backgroundColor] ?? props.$backgroundColor
        : props.theme.color['white'],
    padding: 0,
    fontsize: '.8125rem',
    borderRadius: '0.25rem',
    height: '2rem',
    position: 'relative',
    border: 'none',
    overflow: 'hidden',
}));

const ButtonIconStyle = styled.div((props) => ({
    backgroundColor: 'rgba(255,255,255,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.225rem',
    position: 'relative',
    zIndex: 1,
}));

const ButtonTextStyle = styled.span((props) => ({
    zIndex: 1,
    position: 'relative',
}));

const ButtonStyle = styled(ButtonStyleDefault)<Button>`
    &::before {
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        content: '';
        position: absolute;
        opacity: 0;
        background-color: rgba(0, 0, 0, 0.2);
        transition: opacity 0.2s ease-in-out;
    }

    &:hover::before {
        opacity: 1;
    }
`;

const Button: React.FC<Button> = (props) => {
    return (
        <ButtonStyle theme={EditorTheme} {...props}>
            <Grid
                $alignItems={'center'}
                $columnGap={'xs'}
                $gridTemplateColumns={[`${props.$icon ? '2rem' : '0'} auto 0`]}
            >
                {props.$icon && (
                    <GridItem $gridColumnStart={1}>
                        <ButtonIconStyle>{props.$icon}</ButtonIconStyle>
                    </GridItem>
                )}
                <GridItem $gridColumnStart={2}>
                    <ButtonTextStyle>{props.children}</ButtonTextStyle>
                </GridItem>
            </Grid>
        </ButtonStyle>
    );
};

export { Button };
