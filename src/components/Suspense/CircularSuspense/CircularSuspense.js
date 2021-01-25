/* React */
import React, { Suspense } from 'react';

/* Custom Component */
import { CircularProgress } from '@components/Progress';

/* Main Component */
const CircularSuspense = props => (
  <Suspense fallback={ <CircularProgress /> }>
    { props.children }
  </Suspense>
)

/* Exports */
export default CircularSuspense;