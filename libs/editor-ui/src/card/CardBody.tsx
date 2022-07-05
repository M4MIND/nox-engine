import React from 'react';
import styled from 'styled-components';

type CardBody = {
    children?: React.ReactNode;
};

const CardBodyStyle = styled.div((props) => ({
    flex: '1 1 auto',
    padding: '1.25rem 1.25rem',
}));
const CardBody: React.FC<CardBody> = (props) => {
    return <CardBodyStyle>{props.children}</CardBodyStyle>;
};

export { CardBody };
