/* React */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Material-UI */
import { useTheme } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

/* Context */
import { ResizeContext } from '@src/App';

/* Styled Component */
const Container = styled.main`
  height: 100%;
  box-sizing: border-box;

  ${({ desktop, theme })=>`
    ${ desktop ? "padding: "+ theme.spacing(1) + "px;" : "" }
  `}
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
  
  /* Context */
  const { desktop } = useContext(ResizeContext);

  /* Render */
  return (
    <Container theme={ theme } desktop={ desktop }>
      <Paper>
        { children }
      </Paper>
    </Container>
  );
}

Section.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
}

export default Section;