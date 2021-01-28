/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Material UI */
import Grid from '@material-ui/core/Grid';

/* Styled Component */
const GridColumn = styled((props)=>(
  <Grid item { ...props }/>
))`
  ${({ padding })=>`
    padding: ${ padding }px;
  `}
`;

/* Main Component Settings */
GridColumn.propTypes = {
  alignContent: PropTypes.oneOf([
    'stretch'
    , 'center'
    , 'flex-start'
    , 'flex-end'
    , 'space-between'
    , 'space-around'
  ]),
  lignItems: PropTypes.oneOf([
    'flex-start'
    , 'center'
    , 'flex-end'
    , 'stretch'
    , 'baseline'
  ]),
  direction: PropTypes.oneOf([
    'row'
    , 'row-reverse'
    , 'column'
    , 'column-reverse'
  ]),
  justify: PropTypes.oneOf([
    'flex-start'
    , 'center'
    , 'flex-end'
    , 'space-between'
    , 'space-around'
    , 'space-evenly'
  ]),
  lg: PropTypes.oneOf([
    false, true, 'auto'
    , 1, 2, 3, 4, 5, 6
    , 7, 8, 9, 10, 11, 12
  ]),
  md: PropTypes.oneOf([
    false, true, 'auto'
    , 1, 2, 3, 4, 5, 6
    , 7, 8, 9, 10, 11, 12
  ]),
  sm: PropTypes.oneOf([
    false, true, 'auto'
    , 1, 2, 3, 4, 5, 6
    , 7, 8, 9, 10, 11, 12
  ]),
  xl: PropTypes.oneOf([
    false, true, 'auto'
    , 1, 2, 3, 4, 5, 6
    , 7, 8, 9, 10, 11, 12
  ]),
  xs: PropTypes.oneOf([
    false, true, 'auto'
    , 1, 2, 3, 4, 5, 6
    , 7, 8, 9, 10, 11, 12
  ]),
}

/* Exports */
export default GridColumn;