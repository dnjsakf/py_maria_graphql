/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Material-UI */
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

/* Main Component */
const ConfirmDialog = props => {
  /* Props */ 
  const {
    className,
    title,
    message,
    open,
    onClose,
    ...rest
  } = props;

  /* Rendering */
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{ title }</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            { message }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ onClose } color="primary">
            Disagree
          </Button>
          <Button onClick={ onClose } color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default ConfirmDialog;