/* React */
import React, { useMemo, useState, useEffect, createContext } from 'react';

/* Router */
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';

/* Material-UI */
import { useTheme, useMediaQuery } from '@material-ui/core';

/* Custom Components */
import { LayoutWithRoute } from '@components/Route';

/* Layouts */
import { MainLayout } from '@layouts';

/* Views */
import { NotFound } from '@views';

import Main from '@views/Main';
import Lotto from '@views/Lotto';
import Setting, {
  MenuSetting,
  UserSetting,
  UserAuthSetting,
  ScheduleSetting,
  CodeSetting
} from '@views/Setting';

/* Context: For window resize */
export const ResizeContext = createContext({
  open: false,
  setOpen: () => {},
  desktop: false,
  setDesktop: () => {},
});

/* Main Component */
const App = props =>{
  /* Props */
  const {
    ...rest
  } = props;

  /* Material-UI Hooks */
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  /*  State */
  const [ open, setOpen ] = useState(!isDesktop);
  const [ desktop, setDesktop ] = useState(isDesktop);
  const value = useMemo(()=>({ open, setOpen, desktop, setDesktop }), [open, setOpen, desktop, setDesktop]);

  /* Side Effects: resize window. */
  useEffect(()=>{
    setDesktop(isDesktop);
    setOpen(isDesktop);
  }, [ isDesktop ]);

  /* Rendering */
  return (
    <Router>
      <ResizeContext.Provider value={value}>
        <Switch>
          <LayoutWithRoute
            exact
            path="/"
            layout={ MainLayout }
            component={ Main }
          />
          <LayoutWithRoute
            exact
            path="/lotto"
            layout={ MainLayout }
            component={ Lotto }
          />
          <LayoutWithRoute
            exact
            path="/setting"
            layout={ MainLayout }
            component={ Setting }
          />
          <LayoutWithRoute
            exact
            path="/setting/menus"
            layout={ MainLayout }
            component={ MenuSetting }
          />
          <LayoutWithRoute
            exact
            path="/setting/users"
            layout={ MainLayout }
            component={ UserSetting }
          />
          <LayoutWithRoute
            exact
            path="/setting/users/auth"
            layout={ MainLayout }
            component={ UserAuthSetting }
          />
          <LayoutWithRoute
            exact
            path="/setting/sched"
            layout={ MainLayout }
            component={ ScheduleSetting }
          />
          <LayoutWithRoute
            exact
            path="/setting/code"
            layout={ MainLayout }
            component={ CodeSetting }
          />
          <LayoutWithRoute
            exact
            path="/NotFound"
            layout={ MainLayout }
            component={ NotFound }
          />
          <Redirect from="*" to="/NotFound"/>
        </Switch>
      </ResizeContext.Provider>
    </Router>
  );
}

export default App;