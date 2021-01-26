/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Material-UI */
import { useTheme } from '@material-ui/core';

/* Styled Component */
const Container = styled.main`
  height: 100%;
  box-sizing: border-box;

  padding: ${({ theme })=>( theme.spacing(1) )}px;
`;

/* Main Component */
const Section = ( props )=>{
  /* Porps */
  const {
    className,
    children,
    ...rest
  } = props;

  /* Material-UI Hook */
  const theme = useTheme();

  /* Render */
  return (
    <Container theme={ theme }>
      { children }
    </Container>
  );
}

Section.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
}

export default Section;