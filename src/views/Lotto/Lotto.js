/* React */
import React, { useState, useCallback, useEffect } from 'react';

/* Material-UI */
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';

/* GraphQL */
import client from '@graphql/client';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { LOTTO_PRZWIN_QUERY } from '@graphql/query/lotto';

/* Custom Components */
import { CircularProgress } from '@components/Progress';

/* 3th party */
import moment from 'moment';


/* Styles Hook */
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
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
});

/* Functions: For sorting Descending */
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

/* Functions: For sorting Descending */
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

/* Functions: For sorting Descending */
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index)=>[el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

/* Sub Component: TableHead */
function CheckableTableHead( props ){
  /* Props */
  const {
    classes,
    columns,
    selectedCount,
    rowCount,
    onAllSelect,
    order,
    orderBy,
    onRequestSort,
    ...rest
  } = props;

  /* Handler: Sorting */
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  /* Rendering */
  return (
    <TableHead>
      <TableRow>
        {columns.map((column, idx) => {
          let component = null;

          if( column.type == "checkbox"){
            component =  (
              <TableCell key={"checkbox-"+column.id} padding="checkbox">
                <Checkbox
                  indeterminate={ selectedCount > 0 && selectedCount < rowCount}
                  checked={ rowCount > 0 && selectedCount === rowCount }
                  onChange={ onAllSelect }
                  inputProps={{
                    'aria-label': 'select all desserts'
                  }}
                />
              </TableCell>
            );
          } else {
            component = (
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
            );
          }
          return component;
        })}
      </TableRow>
    </TableHead>
  );
}


/* Sub Component: TableBody */
function CheckableTableBody( props ){
  /* Props */
  const {
    classes,
    dataKey,
    columns,
    selected,
    onSelect,
    rows,
    loading,
    error,
    page,
    rowsPerPage,
    order,
    orderBy,
    ...rest
  } = props;

  if( loading ){
    return (
      <TableBody>
        <TableRow>
          <TableCell>
            <CircularProgress />
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }
  if( error ){ 
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={ columns.length }>
            <p>{ error.message }</p>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }
  if( !rows ){ 
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={ columns.length }>
            <p>데이터가 없습니다.</p>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  /* Rendering */
  return (
    <TableBody>
      {stableSort(rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), getComparator(order, orderBy))
        .map((row, idx)=>{
        const labelId = `table-checkbox-${idx}`;

        return (
          <TableRow 
            hover
            key={ row.id }
            role="checkbox"
            tabIndex={-1}
            /* @TODO: 동적할당 */
            onClick={(event) => onSelect(event, row[dataKey])}
            selected={ selected.indexOf(row[dataKey]) !== -1 }
            >
            { columns.map((column) => {
              let component = null;
              let value = row[column.id];

              if( column.type == "date" ){
                value = moment(value).format(column.format||"YYYY-MM-DD");
              } else if ( column.type == "number" ){
                value = Number(row[column.id]);
              }

              if( column.type == "checkbox" ){
                component = (
                  <TableCell
                    key={"checkbox-"+column.id}
                    align={ column.align }
                    padding="checkbox"
                    >
                    <Checkbox
                      onChange={ (event) => onSelect(event, value) }
                      checked={ selected.indexOf(value) >= 0 }
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </TableCell>
                );
              } else {
                component = (
                  <TableCell key={ column.id } align={ column.align }>
                    { value }
                  </TableCell>
                );
              }

              return component;
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
}


const LottoPrzwinList = props => {
  /* Props */
  const {
    className,
    dataKey,
    columns,
    ...rest
  } = props;
    
  /* State */
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [variables, setVariables] = useState({
    orderBy: [ "DRWT_NO_DESC" ],
    pagination: {
      page: page,
      rowsPerPage: rowsPerPage
    }
  });

  /* Styles Hook */
  const classes = useStyles();

  /* GraphQL */
  const { loading, error, data, refetch } = useQuery(
  // const [ getRows, { loading, error, data } ] = useLazyQuery(
    LOTTO_PRZWIN_QUERY, { 
      client,
      variables,
      onError( e ){
        console.log( "onError", e );
      },
      onCompleted( c ){
        console.log( "onCompleted", c );
      },
    }
  );

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
    if( event.target.checked && data ){
      if( selected.length == 0 ){
        console.log("all");
        const newSelecteds = data.rows.map((n) => n.drwtNo);
        setSelected(newSelecteds);
        return;
      }
    }
    setSelected([]);
  }, [ selected, data ]);

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
    setSelected(newSelected);
  }, [ selected ]);

  /* Constant Variables */
  const rowCount = data ? data.rows.length : 0;

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
            rows={ data ? data.rows : null }
            order={ order }
            orderBy={ orderBy }
            onSelect={ handleSelect }
            />
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={ data ? data.rows.length : 0 }
        rowsPerPage={ rowsPerPage }
        page={ page }
        onChangePage={ handleChangePage }
        onChangeRowsPerPage={ handleChangeRowsPerPage }
      />
    </Paper>
  );
}


/* Main Component */
const Lotto = props =>{
  /* Props */
  const {
    className,
    ...rest
  } = props;

  /* Rendering */
  return (
    <LottoPrzwinList
      dataKey="drwtNo"
      columns={[
        { id: "drwtNo", type: "checkbox", align: "center"},
        { id: "drwtNo", label: "회차", align: "center", minWidth: 30 },
        { id: "drwtNo1", label: "번호1", align: "center", minWidth: 30 },
        { id: "drwtNo2", label: "번호2", align: "center", minWidth: 30 },
        { id: "drwtNo3", label: "번호3", align: "center", minWidth: 30 },
        { id: "drwtNo4", label: "번호4", align: "center", minWidth: 30 },
        { id: "drwtNo5", label: "번호5", align: "center", minWidth: 30 },
        { id: "drwtNo6", label: "번호6", align: "center", minWidth: 30 },
        { id: "drwtNoBnus", label: "보너스", align: "center", minWidth: 30 },
        { id: "drwtNoDate", label: "추첨일", align: "center", type: "date", format: "YYYY-MM-DD", minWidth: 30 }
      ]}
    />
  );
}

export default Lotto;