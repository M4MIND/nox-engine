import { EditorThemeColors } from '@nox-engine/editor-ui';
import React from 'react';
import styled from 'styled-components';
import { H5, H6 } from '../typography';

type CardSubtitleProps = {
    children: React.ReactNode;
    $color?: EditorThemeColors;
};

const CardSubtitle: React.FC<CardSubtitleProps> = (props) => {
    return (
        <H6 $fontWeight={600} $color={props.$color ?? 'gray500'} {...props}>
            {props.children}
        </H6>
    );
};

export { CardSubtitle };
