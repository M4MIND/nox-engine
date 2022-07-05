import React from 'react';
import styled from 'styled-components';

type CardFooter = {
    children?: React.ReactNode;
};

const CardFooterStyle = styled.div((props) => ({
    padding: '1rem 1.25rem',
    borderTop: '1px solid #eff2f7!important',
}));

const CardFooter: React.FC<CardFooter> = (props) => {
    return <CardFooterStyle>{props.children}</CardFooterStyle>;
};

export { CardFooter };
