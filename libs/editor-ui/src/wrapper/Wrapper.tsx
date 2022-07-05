import { EditorTheme, EditorThemeColors } from '@nox-engine/editor-ui';
import React from 'react';
import styled from 'styled-components';

type WrapperStyleProps = {
    $color?: EditorThemeColors | 'string';
};

type WrapperProps = WrapperStyleProps & {
    children: React.ReactNode;
};

const WrapperStyle = styled.div<WrapperStyleProps>((props) => ({
    backgroundColor: props.$color ? props.theme.color[props.$color] : props.theme.color['white'],
}));

const Wrapper: React.FC<WrapperProps> = (props) => {
    return (
        <WrapperStyle theme={EditorTheme} {...props}>
            {props.children}
        </WrapperStyle>
    );
};

export { Wrapper };
