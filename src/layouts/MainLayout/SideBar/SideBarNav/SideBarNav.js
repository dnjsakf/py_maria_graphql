/* React */
import React, { useMemo, useState, useCallback, useEffect, useContext, createContext } from 'react';
import PropTypes from 'prop-types';

/* Router */
import { NavLink, useLocation } from 'react-router-dom';

/* Material UI */
import { makeStyles, useTheme } from '@material-ui/styles';
import { blueGrey, lightBlue } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

/* Material UI: icons */
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

/* GraphQL */
import { useQuery } from '@apollo/react-hooks';
import { MENU_QUERY } from '@graphql/query/menu';

/* Custom Components */
import ErrorBoundary from '@components/ErrorBoundary';
import { CircularProgress } from '@components/Progress';

/* Clsx */
import clsx from 'clsx';

/* Styles Hook */
const useStyles = makeStyles((theme)=>({
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  menu: {
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
    color: blueGrey[800],
    paddingLeft: "30px",
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium,
    "&:hover": {
      backgroundColor: blueGrey[50],
    }
  },
  activeMenu: {
    color: blueGrey[600],
    backgroundColor: blueGrey[100],
    fontWeight: theme.typography.fontWeightLarge,
    '& $icon': {
      color: theme.palette.error.main
    }
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  expandIcon: {
    padding: '5px 2px',
  },
  divider: {
    margin: "2px 0",
  }
}));

/* Sub Component */
const ExpandIcon = ({ isExpand, open }) => (
  isExpand ? ( open ? <ExpandLess /> : <ExpandMore />  ): null
);

/* Sub Component */
const MenuListItem = props => {
  /* Props */
  const {
    className,
    node,
    depth,
    ...rest
  } = props;

  /* State */
  const [open, setOpen] = useState( true );
  
  /* Context */
  const { active, setActive } = useContext(ActiveContext);

  /* Styles Hook */
  const classes = useStyles();
  const theme = useTheme();
  
  /* Handler: Set active. */
  const handleActive = useCallback((e)=>{
    setActive(node.link);
  }, [active, node]);

  /* Handler: Open collapse. */
  const handleCallapse = useCallback((e)=>{
    setOpen(!open);
  }, [open, node, active]);

  /* Constant Variables */
  const isExpand = node.cmenu && node.cmenu.edges.length > 0;

  /* Rendering */
  return (
    <React.Fragment>
      <ListItem
        className={
          clsx({
            [classes.item]: true,
          }, className)
        }
        disableGutters
      >
        <Button
          className={ 
            clsx({
              [classes.menu]: true,
              [classes.activeMenu]: active == node.link,
            })
          }
          style={{
            paddingLeft: theme.spacing((depth)*2)
          }}
          onClick={ handleActive }
          component={ NavLink }
          to={ node.link }
        >
          { node.menuName }
        </Button>
        <IconButton
          onClick={ handleCallapse }
          className={ 
            clsx({
              [classes.expandIcon]: true,
            })
          }
        >
          <ExpandIcon isExpand={ isExpand } open={ open } />
        </IconButton>
      </ListItem>
      <Divider className={ classes.divider } />
      {
        isExpand && (
          <Collapse in={ open } timeout="auto" >
            <MenuList menus={ node.cmenu } depth={ depth+1 }/>
          </Collapse>
        )
      }
    </React.Fragment>
  );
}

/* Sub Component */
const MenuList = props => {
  /* Props */
  const {
    className,
    depth,
    menus: {
      edges
    },
    ...rest
  } = props;

  if( !edges ){ return null; }

  return (
    <List
      className={ className }
      disablePadding
    >
      {
        edges.map(({ node })=>(
          <MenuListItem
            key={ node.id }
            node={ node }
            depth={ depth }
            />
        ))
      }
    </List>
  );
}

export const ActiveContext = createContext({
  active: "/",
  setActive: ()=>{},
});

/* Main */
const SideBarNav = props => {
  /* Props */
  const {
    className,
    ...rest
  } = props;

  /* Router Hook */
  const location = useLocation();

  /* State */
  const [ active, setActive ] = useState(location.pathname);
  const value = useMemo(()=>({ active, setActive }), [active, setActive]);

  /* GraphQL */
  const { loading, error, data, refetch } = useQuery(MENU_QUERY);
  
  /* Side Effect: Set frist active menu. */
  useEffect(()=>{
    // if( data && data.menus.edges.length > 0 && active == null ){
    //   setActive(data.menus.edges[0].node.id);
    // }
    console.log(active);

  }, [ data, active ]);
  
  /* GraphQL Result */
  if( loading ){ return <CircularProgress />; }
  if( error ){ return <p>{ error }</p>; }

  /* Constant Variables */
  const {
    menus
  } = data;

  /* Rendering */
  return (
    <ErrorBoundary>
      <ActiveContext.Provider value={ value }>
        <MenuList menus={ menus } depth={ 1 } />
      </ActiveContext.Provider>
    </ErrorBoundary>
  );
}

SideBarNav.propTypes = {
  className: PropTypes.string,
};

export default SideBarNav;