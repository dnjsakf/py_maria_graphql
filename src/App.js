/* React */
import React from 'react';

/* Router */
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

/* Styled */
import { createGlobalStyle } from 'styled-components'

import Test from './Test';

/* Global Styled */
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  .active {
    color: red;
  }
`

/* Main Component */
const App = ( props )=>{
  /* Render */
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={ ()=>( <Test /> ) }
        />
        <Redirect from="*" to="/" />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}

/* Prop Types */
App.propTypes = { }

/* Default Props */
App.defaultProps = { }

/* Exports */
export default App;