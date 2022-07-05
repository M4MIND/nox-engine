import React from 'react';
import styled from 'styled-components';
import { EditorTheme, EditorThemeSpacing } from '../theme';

type GridStyleProps = {
  $display?: 'grid' | 'inline-grid';
  $columnGap?: EditorThemeSpacing | string;
  $rowGap?: EditorThemeSpacing | string;
  $gap?: EditorThemeSpacing | string;
  $gridTemplateRows?: string[];
  $gridTemplateColumns?: string[];
  $width?: string;
  $height?: string;
  $alignItems?: string;
};

type GridProps = GridStyleProps & {
  children?: React.ReactNode;
};
const GridStyles = styled.div<GridStyleProps>((props) => ({
  display: props.$display ?? 'grid',
  columnGap:
    (props.$columnGap ? props.theme.spacing[props.$columnGap] : null) ??
    (props.$gap ? props.theme.spacing[props.$gap] : null) ??
    props.$columnGap ??
    props.$gap ??
    props.theme.spacing.m,
  rowGap:
    (props.$rowGap ? props.theme.spacing[props.$rowGap] : null) ??
    (props.$gap ? props.theme.spacing[props.$gap] : null) ??
    props.$rowGap ??
    props.$gap ??
    props.theme.spacing.m,
  gridTemplateRows: props.$gridTemplateRows ? props.$gridTemplateRows.join(' ') : 'auto',
  gridTemplateColumns: props.$gridTemplateColumns ? props.$gridTemplateColumns.join(' ') : 'auto',
  width: props.$width ?? 'auto',
  height: props.$height ?? 'auto',
  alignItems: props.$alignItems ?? 'auto',
}));

const Grid: React.FC<GridProps> = (props) => {
  return (
    <GridStyles theme={EditorTheme} {...props}>
      {props.children}
    </GridStyles>
  );
};

export { Grid };
