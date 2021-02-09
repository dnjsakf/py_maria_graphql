/* React */
import React from 'react';

/* Material-UI */
import { makeStyles } from '@material-ui/core';
import MuiCircularProgress from '@material-ui/core/CircularProgress';
// import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import clsx from 'clsx';

/*
      top={0}
      left={0}
      bottom={0}
      right={0}
      position="fixed"
      display="flex"
      alignItems="center"
      justifyContent="center"
*/

/* Material-UI Hook */
const useStyles = makeStyles((theme)=>({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  relative: {
    position: "relative",
  },
}));

/* Main Component */
const CircularProgress = props => {
  /* Props */
  const {
    className,
    relative,
    ...rest
  } = props;
  
  /* Material-UI Hook */
  const classes = useStyles();

  /* Rendering */
  return (
    <Container
      className={
        clsx({
          [classes.root]: true,
          [classes.relative]: !!relative
        })
      }
    >
      <MuiCircularProgress />
    </Container>
);
}

/* Exports */
export default CircularProgress;