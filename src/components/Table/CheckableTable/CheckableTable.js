/* React */
import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

/* Material-UI */
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';

/* Custom Components */
import CheckableTableHead from './CheckableTableHead';
import CheckableTableBody from './CheckableTableBody';

/* Styles Hook */
const useStyles = makeStyles((theme)=>({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
}));

/* Main Component */
const CheckableTable = props => {
  /* Props */
  const {
    className,
    title,
    dataKey,
    columns,
    loading,
    error,
    rows,
    tools,
    selectTools,
    selected,
    onSelected,
    checkbox,
    ...rest
  } = props;
    
  /* State */
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  /* Styles Hook */
  const classes = useStyles();

  /* Handler: Sorting */
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  /* Handler: Change page */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  /* Handler: Change RowsPerPage */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  /* Handler: Select all checkbox. */
  const handleAllSelect = useCallback((event) => {
    if( event.target.checked && rows ){
      if( selected.length == 0 ){
        const newSelecteds = rows.map((n) => n[dataKey]);
        onSelected(newSelecteds);
        return;
      }
    }
    onSelected([]);
  }, [ selected, rows ]);

  /* Handler: Select checkbox. */
  const handleSelect = useCallback((event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    onSelected(newSelected);
  }, [ selected ]);

  /* Side Effect: When updated rows, initialize selected. */
  useEffect(()=>{
    onSelected([]);
  }, [ rows ]);

  /* Constant Variables */
  const rowCount = rows ? rows.length : 0;

  return (
    <Paper className={ classes.root }>
      <TableContainer className={classes.container}>
        <Table 
          stickyHeader
          aria-label="sticky table"
          size="small"
          >
          <CheckableTableHead
            classes={ classes }
            columns={ columns }
            selectedCount={ selected.length }
            rowCount={ rowCount }
            order={ order }
            orderBy={ orderBy }
            onRequestSort={ handleRequestSort }
            onAllSelect={ handleAllSelect }
            checkbox={ checkbox }
          />
          <CheckableTableBody
            classes={ classes }
            dataKey={ dataKey }
            columns={ columns }
            selected={ selected }
            page={ page }
            rowsPerPage={ rowsPerPage }
            loading={ loading }
            error={ error }
            rows={ rows }
            order={ order }
            orderBy={ orderBy }
            onSelect={ handleSelect }
            checkbox={ checkbox }
            />
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={ rowCount }
        rowsPerPage={ rowsPerPage }
        page={ page }
        onChangePage={ handleChangePage }
        onChangeRowsPerPage={ handleChangeRowsPerPage }
      />
    </Paper>
  );
}

export default CheckableTable;