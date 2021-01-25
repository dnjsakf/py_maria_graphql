/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Material-UI */
import { useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

/* Styled */
import styled from 'styled-components';

/* Styled Components */
const Container = styled.div`
  padding: ${({ theme })=>( theme.spacing(4) )}px;
`;

/* Main Component */
const Footer = props => {
  /* Props */
  const {
    className,
    ...rest
  } = props;
  
  /* Styles Hooks */
  const theme = useTheme();
  
  /* Renderer */
  return (
    <Container
      className={ className }
      theme={ theme }
    >
      <Typography variant="body1">
        &copy;{' '}
        <Link
          component="a"
          href="https://github.com/dnjsakf"
          target="_blank"
        >
        { "허도치" }
        </Link>
        { ". 2021" }
      </Typography>
      <Typography variant="caption">
        { "Dochi's react templates." }
      </Typography>
    </Container>
  );
  
}

/* Main Component Settings */
Footer.propTypes = {
  className: PropTypes.string
};

/* Props Default */
Footer.defaultProps = {
  // @TODO: Write default props.
}

/* Exports */
export default Footer;