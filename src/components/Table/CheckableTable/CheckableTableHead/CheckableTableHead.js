/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Material-UI */
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';

/* Material-UI Hook */
const useStyles = makeStyles((theme)=>({
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

/* Main Component */
const CheckableTableHead = props => {
  /* Props */
  const {
    columns,
    selectedCount,
    rowCount,
    onAllSelect,
    order,
    orderBy,
    onRequestSort,
    checkbox,
    ...rest
  } = props;

  /* Material-UI Hook */
  const classes = useStyles();

  /* Handler: Sorting */
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  /* Rendering */
  return (
    <TableHead>
      <TableRow>
        {checkbox && (
          <TableCell key={"checkbox-all"} padding="checkbox" align="center">
          <Checkbox
            indeterminate={ selectedCount > 0 && selectedCount < rowCount}
            checked={ rowCount > 0 && selectedCount === rowCount }
            onChange={ onAllSelect }
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
          </TableCell>
        )}
        {columns.map((column, idx) => (
          <TableCell
            key={ column.id }
            align={ column.align }
            padding={ column.disablePadding ? 'none' : 'default' }
            sortDirection={orderBy === column.id ? order : false}
            style={{
              minWidth: column.minWidth,
              width: column.width
            }}
            >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : 'asc'}
              onClick={ createSortHandler(column.id) }
            >
              { column.label }
              {orderBy === column.id ? (
                <span className={ classes.visuallyHidden }>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

CheckableTableHead.propTypes = {
  columns: PropTypes.array,
  selectedCount: PropTypes.number,
  rowCount: PropTypes.number,
  order: PropTypes.any,
  orderBy: PropTypes.any,
  onRequestSort: PropTypes.any,
  onAllSelect: PropTypes.any,
  checkbox: PropTypes.bool,
}

CheckableTableHead.defaultProps = {
  checkbox: true,
}

export default CheckableTableHead;