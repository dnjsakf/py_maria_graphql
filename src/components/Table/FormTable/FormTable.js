/* React */
import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

/* Formik */
import { useFormik } from 'formik';

/* Material-UI */
import { makeStyles } from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircle from '@material-ui/icons/RemoveCircle';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { ActionToolBar } from '@src/components/ToolBar';


/* Styles Hook */
const useStyles = makeStyles((theme)=>({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
}));


/* Sub Component: Table Header */
const FormTableHead = props => {
  /* Props */
  const {
    columns,
    ...rest
  } = props;

  /* Rendering */
  return (
    <TableHead>
      <TableRow>
        <TableCell style={{ width: "5%" }}></TableCell>
        {columns.map(( column )=>{
          return (
            <TableCell key={ "form-table-header-"+column.name } style={{ width: column.width }}>
              { column.label }
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

const FormTableRow = props => {
  /* Props */
  const {
    rowId,
    columns,
    onSave,
    onRemove,
    ...rest
  } = props;

  /* Formik */
  const formik = useFormik({
    initialValues: (()=>{
      const obj = {}
      columns.forEach(( column )=>{
        obj[column.name] = column.type == "text" ? "" : 0;
      });
      return obj;
    })(),
  });

  /* Handler: Save column. */
  const handleBlur = useCallback(( rowId )=>{
    onSave( rowId, formik.values );
  }, [ formik ]);

  /* Redering */
  return (
    <TableRow>
      <TableCell>
        <IconButton size="small" color="primary" onClick={ (e)=>{ onRemove(rowId); } }>
          <RemoveCircle />
        </IconButton>
      </TableCell>
      {columns.map(( column )=>{
        const value = formik.values[column.name];
        return (
          <TableCell key={ "form-table-body-"+column.name }>
            <FormControl
              align={ column.align||"left" }
              style={{ width: column.width }}
              fullWidth
            >
              <TextField 
                fullWidth
                type={ column.type||"text" }
                name={ column.name }
                value={ value }
                onChange={ formik.handleChange }
                onBlur={ (e)=>{ handleBlur(rowId); } }
              />
            </FormControl>
          </TableCell>
        );
      })}
    </TableRow>
  );
}

/* Main Component */
const FormTable = props =>{
  /* Props */
  const {
    className,
    title,
    columns,
    rows,
    setRows,
    ...rest
  } = props;

  /* Material-UI Hook */
  const classes = useStyles();

  /* State */
  // const [rows, setRows] = useState(data);
  
  /* Handler: Add row. */
  const handleAddRow = useCallback((e)=>{
    setRows([...rows, {}]);
  },[ rows ]);

  /* Handler: Save row data. */
  const handleSaveRowData = useCallback((id, data)=>{
    setRows([...rows.filter((_, idx)=>(idx != id)), data]);
  }, [ rows ]);

  /* Handler: Remove row data. */
  const handleRemoveRowData = useCallback(( id )=>{
    setRows(rows.filter((data, idx)=>(idx != id)));
  }, [ rows ]);

  useEffect(()=>{
    console.log( rows );
  },[ rows ]);

  /* Rendering */
  return (
    <Paper className={ classes.root }>
      <ActionToolBar
        title={ title }
        tools={{
          Added: {
            tooltip: "추가",
            icon: "add_box",
            onClick: handleAddRow
          }
        }}
      />
      <TableContainer className={ classes.container }>
        <Table
          stickyHeader
          aria-label="sticky table"
          size="small"
        > 
          <FormTableHead columns={ columns }/>
          <TableBody>
          {rows.map((row, idx)=>(
            <FormTableRow
              key={ "form-table-body-"+idx }
              rowId={ idx }
              columns={ columns }
              onSave={ handleSaveRowData }
              onRemove={ handleRemoveRowData }
            />
          ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

FormTable.propTypes = {
  columns: PropTypes.array,
}

FormTable.defaultProps = {
  columns: []
}

export default FormTable;