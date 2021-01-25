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

/* Styled */
import { createGlobalStyle } from 'styled-components';

/* Custom Components */
import ErrorBoundary from '@components/ErrorBoundary';
import { CircularSuspense } from '@components/Suspense';

/* Main Component */
const App = React.lazy(()=>import('./App'));

/* Global Styled */
const GlobalStyle = createGlobalStyle`
  * {  box-sizing: border-box; }
  html, body { width: 100%; height: 100%; padding: 0; margin: 0; }
`;

/* Functions: Renderer */
function render(Component){
  Component = module.hot ? hot( Component ) : Component;
  
  RouterDomRender((
    <React.StrictMode>
      <ErrorBoundary>
        <CircularSuspense>
          <ThemeProvider theme={ theme }>
            <ApolloProvider client={ client }>
              <Component />
            </ApolloProvider>
          </ThemeProvider>
          <GlobalStyle />
        </CircularSuspense>
      </ErrorBoundary>
    </React.StrictMode>
   ), document.getElementById("root"));
}

/* Render Application */
render(App);