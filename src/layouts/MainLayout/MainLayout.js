/* React */
import React, { useMemo, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Material-UI */
import { useTheme } from '@material-ui/styles';

/* Context */
import { ResizeContext } from '@src/App';

/* Custom Components */
import ErrorBoundary from '@components/ErrorBoundary';
import { CircularSuspense } from '@components/Suspense';

/* Layout Components */
const Header = React.lazy(()=>import('./Header'));
const Section = React.lazy(()=>import('./Section'));
const Footer = React.lazy(()=>import('./Footer'));
const SideBar = React.lazy(()=>import('./SideBar'));

/* Styled Components */
const Container = styled.div`
  height: 100%;
  padding-top: ${({ theme })=>( theme.breakpoints.up('sm') ? 64 : 56 )}px;
  ${({ desktop })=>( desktop && "padding-left: 240px" )}
`;

/* Main Component */
const MainLayout = ( props )=>{
  /* Props */
  const {
    className,
    children,
    location,
    ...rest
  } = props;
  
  /* Styles Hooks */
  const theme = useTheme();

  /* Context */
  const { desktop } = useContext(ResizeContext);

  /* Render */
  return (
    <ErrorBoundary>
      <CircularSuspense>
        <Container
          className={ className }
          theme={ theme }
          desktop={ desktop }
        >
          <Header />
          <SideBar />
          <Section>
            { children }
          </Section>
          <Footer />
        </Container>
      </CircularSuspense>
    </ErrorBoundary>
  );
}

MainLayout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
}

export default MainLayout;