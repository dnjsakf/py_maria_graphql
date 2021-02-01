/* React */
import React, { useState, useCallback } from 'react';

/* Material-UI */
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

/* Material-UI Hook */
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

/* Main Component */
const BackdropProgress = props =>{
  /* Props */
  const {
    className,
    loading,
    ...rest
  } = props;

  /* State */
  const [open, setOpen] = useState(loading);

  /* Material-UI Hook */
  const classes = useStyles();

  /* Handler: Close backdrop. */
  const handleClose = useCallback((e) => {
    setOpen(false);
  }, []);

  /* Rendering */
  return (
    <Backdrop className={ classes.backdrop } open={ open } onClick={handleClose}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default BackdropProgress;