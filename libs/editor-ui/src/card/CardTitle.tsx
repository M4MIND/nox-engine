import { EditorThemeColors } from '@nox-engine/editor-ui';
import React from 'react';
import styled from 'styled-components';
import { H5 } from '../typography';

type CardTitleProps = {
    children: React.ReactNode;
    $color?: EditorThemeColors;
};

const CardTitle: React.FC<CardTitleProps> = (props) => {
    return (
        <H5 $fontWeight={600} $color={props.$color ?? 'gray700'} {...props}>
            {props.children}
        </H5>
    );
};

export { CardTitle };
