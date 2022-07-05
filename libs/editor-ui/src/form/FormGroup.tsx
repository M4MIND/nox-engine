import React from 'react';
import styled from 'styled-components';
import { Grid } from '../grid';

type FormGroup = {
  children: React.ReactNode;
};

const FormGroupStyle = styled.div((props) => ({}));

const FormGroup: React.FC<FormGroup> = (props) => {
  return <Grid $gap={'xs'}>{props.children}</Grid>;
};

export { FormGroup };
