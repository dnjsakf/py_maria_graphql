/* React */
import React from 'react';

/* Material-UI */
import { makeStyles, lighten } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';

/* Material-UI Hook */
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

/* Sub Component: TableTollBar */
const ActionToolBar = props => {
  /* Props */
  const {
    title,
    tools,
    ...rest
  } = props;
  
  /* Material-UI Hook */
  const classes = useStyles();

  /* Rendering */
  return (
    <Toolbar
      variant="dense"
      className={ classes.root }
    >
      <Typography className={ classes.title } variant="h6" id={ "title_"+title } component="div">
        { title }
      </Typography>
      {tools && Object.keys(tools).map((toolKey)=>{
        const tool = tools[toolKey];
        return (
          <Tooltip key={ "toolbar-"+toolKey } title={ tool.tooltip }>
            <IconButton aria-label={ toolKey } onClick={( e )=>tool.onClick && tool.onClick(e)}>
              {typeof(tool.icon) == "string"
                ? <Icon>{ tool.icon || "delete" }</Icon>
                : tool.icon
              }
            </IconButton>
          </Tooltip>
        );
      })}
    </Toolbar>
  );
};

export default ActionToolBar;