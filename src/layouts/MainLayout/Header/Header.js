/* React */
import React, { useState, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';

/* Router */
import { Link as RouterLink } from 'react-router-dom';

/* Styled */
import styled from 'styled-components';

/* Material-UI */
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Badge from '@material-ui/core/Badge';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';

/* clsx */
import clsx from 'clsx';

/* Context */
import { ResizeContext } from '@src/App';

/* Styles Hook */
const useStyles = makeStyles( theme => ({
  root: {
    boxShadow: 'none'
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

/* Styled Component */
const FlexGrow = styled.div`
  flex-grow: 1
`;

/* Main Component */
const Header = ( props )=>{
  /* Props */
  const {
    className,
    ...rest
  } = props;

  /* State */
  const [ notifications, setNotifications ] = useState([]);

  /* Context */
  const { setOpen } = useContext(ResizeContext);
  
  /* Styles Hook */
  const classes = useStyles();

  /* Handlers */
  const handleOpenSideBar = useCallback( event => {
    setOpen(true);
  }, []);

  return (
    <AppBar
      { ...rest }
      className={ clsx( classes.root, className ) }
    >
      <Toolbar>
        <RouterLink to="/">
          <img
            alt="Logo"
            src="/logo/js-react-logo.png"
            height="50px"
          />
        </RouterLink>
        <FlexGrow />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={ notifications.length }
              color="error"
              variant="standard"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            className={ classes.signOutButton }
            color="inherit"
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={ handleOpenSideBar }
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  className: PropTypes.string,
}

export default Header;