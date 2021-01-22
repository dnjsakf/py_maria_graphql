/* Webpack */
import { hot } from 'react-hot-loader/root';

/* React */
import React from 'react';

/* React Dom */
import { render as RouterDomRender } from "react-dom";

/* GraphQL */
import { ApolloProvider } from 'react-apollo';
import client from '@graphql/client';

/* Material-UI */
import { ThemeProvider } from "@material-ui/styles";
import theme from "@theme";

/* Main Component */
import App from './App';

/* Functions: Renderer */
function render(Component){
  const root = document.getElementById("root");
  
  Component = module.hot ? hot( Component ) : Component;
  
  RouterDomRender((
    <React.StrictMode>
      <ThemeProvider theme={ theme }>
        <ApolloProvider client={ client }>
          <Component />
        </ApolloProvider>
      </ThemeProvider>
    </React.StrictMode>
   ), document.getElementById("root"));
}

/* Render Application */
render(App);