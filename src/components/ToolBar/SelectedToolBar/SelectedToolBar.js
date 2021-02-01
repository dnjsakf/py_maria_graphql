/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Material-UI */
import { makeStyles, lighten } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

/* 3th party */
import clsx from 'clsx';

/* Styles Hook */
const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

/* Main Component */
const SelectedToolBar = props => {
  /* Props */
  const {
    title,
    selected,
    tools,
    selectTools,
    ...rest
  } = props;
  
  /* Material-UI Hook */
  const classes = useStyles();

  /* Constant Variables */
  const selectedCount = selected ? selected.length : 0;

  /* Rendering */
  return (
    <Toolbar
      variant="dense"
      className={clsx(classes.root, {
        [classes.highlight]: selectedCount > 0,
      })}
    >
      {selectedCount > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          { selectedCount } selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          { title }
        </Typography>
      )}

      {selectedCount > 0 ? (
        selectTools && Object.keys(selectTools).map((toolKey)=>{
          const tool = selectTools[toolKey];
          return (
            <Tooltip key={ "table-toolbar-selected-"+toolKey } title={ tool.tooltip }>
              <IconButton aria-label={ toolKey } onClick={( e )=>tool.onClick && tool.onClick(e, selected)}>
                <Icon>{ tool.icon || "delete" }</Icon>
              </IconButton>
            </Tooltip>
          );
        })
      ) : (
        tools && Object.keys(tools).map((toolKey)=>{
          const tool = tools[toolKey];
          return (
            <Tooltip key={ "table-toolbar-selected-"+toolKey } title={ tool.tooltip }>
              <IconButton aria-label={ toolKey } onClick={( e )=>tool.onClick && tool.onClick(e, selected)}>
                <Icon>{ tool.icon || "delete" }</Icon>
              </IconButton>
            </Tooltip>
          );
        })
      )}
    </Toolbar>
  );
};

SelectedToolBar.propTypes = {
  selected: PropTypes.array.isRequired,
};

export default SelectedToolBar;