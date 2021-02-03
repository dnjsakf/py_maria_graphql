/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Material-UI */
import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

/* Custom Components */
import { CircularProgress } from '@components/Progress';

/* 3th party */
import moment from 'moment';

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

/* Material-UI Hook */
const useStyles = makeStyles({

});

/* Styled Components */
const StatusButton = styled(Button)`
  ${({ theme, status })=>`
    color: ${ theme.palette[status||"primary"].contrastText };
    background-color: ${ theme.palette[status||"primary"].main };
    &:hover {
      background-color: ${ theme.palette[status||"primary"].dark };
    }
  `}
`;

/* Main Component */
const CheckableTableBody = props => {
  /* Props */
  const {
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
    checkbox,
    ...rest
  } = props;

  /* Material-UI */
  const classes = useStyles();

  if( loading ){
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={ columns.length + ( checkbox ? 0 : -1 )}>
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
          <TableCell colSpan={ columns.length + ( checkbox ? 0 : -1 )}>
            <p>{ error.message }</p>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }
  if( !rows || rows.length == 0 ){ 
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={ columns.length + ( checkbox ? 0 : -1 ) }>
            <p>데이터가 없습니다.</p>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  /* Rendering */
  return (
    <TableBody>
      {stableSort(rows, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, idx)=>{
        const labelId = `table-checkbox-${idx}`;

        return (
          <TableRow 
            hover
            key={ row.id }
            role="checkbox"
            tabIndex={-1}
            onClick={(event) => onSelect(event, row[dataKey])}
            selected={ selected.indexOf(row[dataKey]) !== -1 }
            >
              {checkbox && (
                <TableCell
                key={"checkbox-"+dataKey}
                align="center"
                padding="checkbox"
                >
                <Checkbox
                  onChange={ (event) => onSelect(event, row[dataKey]) }
                  checked={ selected.indexOf(row[dataKey]) >= 0 }
                  inputProps={{ 'aria-labelledby': labelId }}
                />
                </TableCell>
              )}
              { columns.map((column) => {
                let Component = null;
                let value = row[column.id];

                if( column.type == "date" ){
                  value = moment(value).format(column.format||"YYYY-MM-DD");
                  Component = (
                    <TableCell key={ column.id } align={ column.align }>
                      { value }
                    </TableCell>
                  );
                } else if ( column.type == "number" ){
                  value = Number(row[column.id]);
                  Component = (
                    <TableCell key={ column.id } align={ column.align }>
                      { value }
                    </TableCell>
                  );
                } else if ( column.type == "button" ){
                  let status = "warning";
                  if( value == 0 ){
                    status = "default";
                  } else if ( value == 1 ){
                    status = "secondary";
                  } else if ( value == 2 ){
                    status = "primary";
                  } else if ( value == 3 ){
                    status = "success";
                  } else if ( value == 9 ){
                    status = "error";
                  }

                  Component = (
                    <TableCell key={ column.id } align={ column.align }>
                      <StatusButton status={ status } onClick={ (e)=>{ e.stopPropagation(); column.onClick(e, row[dataKey]); } } size="small">
                        { value }
                      </StatusButton>
                    </TableCell>
                  );
                } else {
                  Component = (
                    <TableCell key={ column.id } align={ column.align }>
                      { value }
                    </TableCell>
                  );
                }

                return Component;
              })}
          </TableRow>
        );
      })}
    </TableBody>
  );
}

CheckableTableBody.propTypes = {
  dataKey: PropTypes.string,
  columns: PropTypes.array,
  selected: PropTypes.array,
  onSelect: PropTypes.func,
  rows: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.any,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  order: PropTypes.any,
  orderBy: PropTypes.any,
  checkbox: PropTypes.bool,
}

CheckableTableBody.defaultProps = {
  checkbox: true,
}

export default CheckableTableBody;