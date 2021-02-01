/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Material-UI */
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

/* Custom Components */
import { CircularProgress } from '@components/Progress';

/* Clsx */
import clsx from 'clsx';

/* Material-UI Hook */
const useStyles = makeStyles((theme)=>({
  content: {
    padding: 'unset'
  },
}));

/* Main Component */
const FormDialog = props =>{
  /* Props */
  const {
    title,
    open,
    onClose,
    onSubmit,
    closeLabel,
    submitLabel,
    loading, 
    children,
    ...rest
  } = props;

  /* Material-UI Hooks */
  const classes = useStyles();

  /* Rendering */
  return (
    <Dialog
      fullWidth={ true }
      open={ open }
      onClose={ onClose }
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{ title }</DialogTitle>
      <DialogContent
        classes={{
          root: classes.content
        }}
      > 
        <form {...rest}>{ children }</form>
        { loading && <CircularProgress /> }
      </DialogContent>
      <DialogActions>
        <Button onClick={ onClose } color="primary">
          { closeLabel }
        </Button>
        <Button onClick={ onSubmit } color="primary">
          { submitLabel }
        </Button>
      </DialogActions>
    </Dialog>
  );
}

FormDialog.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  closeLabel: PropTypes.string,
  submitLabel: PropTypes.string,
}

FormDialog.defaultProps = {
  closeLabel: "Cacnel",
  submitLabel: "Save",
}

export default FormDialog;