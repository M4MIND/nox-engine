import React from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';

type Form = {
  children: React.ReactNode;
  $onSubmit: (data: any) => void;
  $handleSubmit: UseFormHandleSubmit<any>;
};

const Form: React.FC<Form> = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return <form onSubmit={props.$handleSubmit(props.$onSubmit)}>{props.children}</form>;
};

export { Form };
