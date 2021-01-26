/* React */
import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Material-UI */
import { makeStyles, useTheme } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider'; 
import Drawer from '@material-ui/core/Drawer';

/* Context */
import { ResizeContext } from '@src/App';

/* Child Components */
import Profile from './Profile';
import SidebarNav from './SidebarNav';

/* Styles Hook */
const useStyles = makeStyles( theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
}));

/* Styled Components */
const Container = styled.div`
  background-color: ${({ theme })=> theme.palette.white };
  display: flex;
  flex-direction: column;
  height: 100%;

  padding-left: ${({ theme })=> theme.spacing(1) }px;
  padding-right: ${({ theme })=> theme.spacing(1) }px;
  padding-top: ${({ theme })=> theme.spacing(2) }px;
`;

/* Main Component */
const SideBar = props => {
  /* Props */
  const {
    className,
    ...rest
  } = props;

  /* Context */
  const { open, setOpen, desktop } = useContext(ResizeContext);
  
  /* Styles Hook */
  const classes = useStyles();
  const theme = useTheme();

  /* Handlers */
  const handleOpen = useCallback(()=>{
    setOpen(true);
  }, []);
  const handleClose = useCallback(()=>{
    setOpen(false);
  }, []);
  
  /* Render */
  return (
    <Drawer
      anchor="left"
      classes={{
        paper: classes.drawer
      }}
      onClose={ handleClose }
      open={ open }
      variant={ desktop ? 'persistent' : 'temporary' }
    >
      <Container theme={ theme }>
        <Profile />
        <Divider className={ classes.divider } />
        <SidebarNav />
      </Container>
    </Drawer>
  );
}

SideBar.propTypes = {
  className: PropTypes.string,
}

export default SideBar;