/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Styled Component */
const Container = styled.main`
  height: 100%;
`;

/* Main Component */
const Section = ( props )=>{
  /* Porps */
  const {
    className,
    children,
    ...rest
  } = props;

  /* Render */
  return (
    <Container>
      { children }
    </Container>
  );
}

Section.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
}

export default Section;