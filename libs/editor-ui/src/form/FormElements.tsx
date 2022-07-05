import React from 'react';
import { Control, Controller } from 'react-hook-form';
import styled from 'styled-components';

type FormElements = {
  $name: string;
  $control: Control;
};

const FormBaseStyle = styled.input((props) => ({
  display: 'block',
  width: '100%',
  padding: '0.47rem 0.75rem',
  fontSize: '.925rem',
  fontWeight: 400,
  lineHeight: 1.5,
  color: '#495057',
  backgroundColor: '#fff',
  border: '1px solid #ced4da',
  marginBottom: '0.625rem',
}));

const FormInput: React.FC<FormElements> = (props) => {
  return (
    <Controller
      name={props.$name}
      control={props.$control}
      render={({ field }) => <FormBaseStyle {...field} />}
    ></Controller>
  );
};

export { FormInput };
