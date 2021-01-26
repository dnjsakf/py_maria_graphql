/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Router */
import { Route } from 'react-router-dom';

/* Main Component */
const RouteWithLayout = props =>{
  /* Props */
  const {
    layout: Layout,
    component: Component,
    location,
    ...rest
  } = props;

  /* Rendering */
  return (
    <Route
      {...rest}
      render={ matchProps => (
        <Layout location={ location } { ...matchProps }>
          <Component />
        </Layout>
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  layout: PropTypes.any,
  component: PropTypes.any,
  path: PropTypes.string,
};

export default RouteWithLayout;