/* React */
import React, { useEffect, useContext } from 'react';
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
// import Header from './Header';
// import Section from './Section';
// import SideBar from './SideBar';

const Header = React.lazy(()=>import("./Header"));
const Section = React.lazy(()=>import("./Section"));
const SideBar = React.lazy(()=>import("./SideBar"));

/* Styled Components */
const Container = styled.div`
  height: calc( 100% - ${({ desktop })=>( desktop ? 64 : 56 )} );;
  padding-top: ${({ desktop })=>( desktop ? 64 : 56 )}px;
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
  
  /* Side Effect: Init scroll top. */
  useEffect(()=>{    
    document.scrollingElement.scrollTop = 0;
  }, [ location ]);

  /* Rendering */
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