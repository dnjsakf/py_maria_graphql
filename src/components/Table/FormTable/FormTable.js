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

/* Clsx */
import clsx from 'clsx';

/* Functions */
import { uuid4 } from '@src/App';

/* Styles Hook */
const useStyles = makeStyles((theme)=>({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  input: {
    padding: theme.spacing(1)
  },
  center: {
    textAlign: "center",
  },
  right: {
    textAlign: "right",
  },
  btnCell: {
    padding: theme.spacing(1)
  },
  th: { },
  td: { }
}));


/* Sub Component: Table Header */
const FormTableHead = props => {
  /* Props */
  const {
    classes,
    columns,
    ...rest
  } = props;

  /* Rendering */
  return (
    <TableHead>
      <TableRow>
        <TableCell className={ classes.btnCell } padding="none"></TableCell>
        {columns.map(( column )=>{
          return (
            <TableCell
              key={ "form-table-header-"+column.name }
              className={ classes.th } 
              style={{ width: column.width }}
            >
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
    classes,
    rowId,
    columns,
    format,
    data,
    onSave,
    onRemove,
    ...rest
  } = props;

  /* Formik */
  const formik = useFormik({
    initialValues: (()=>{
      const obj = {}
      Object.keys(format).forEach(key=>{
        obj[key] = data[key] || format[key];
      });
      return obj;
    })(),
  });

  /* Handler: Save column. */
  const handleBlur = useCallback((e)=>{
    onSave( rowId, formik.values );
  }, [ rowId, formik ]);

  /* Redering */
  return (
    <TableRow>
      <TableCell className={ classes.btnCell } padding="none">
        <IconButton size="small" color="primary" onClick={ (e)=>onRemove(rowId) }>
          <RemoveCircle />
        </IconButton>
      </TableCell>
      {columns.map(( column )=>{
        const value = formik.values[column.name];
        return (
          <TableCell
            key={ "form-table-body-"+column.name }
            className={ classes.td }
            padding="none"
          >
            <FormControl
              align={ column.align||"left" }
              style={{ width: column.width }}
              fullWidth
              required
            >
              <TextField 
                fullWidth
                type={ column.type||"text" }
                name={ column.name }
                value={ value }
                onChange={ formik.handleChange }
                onBlur={ handleBlur }
                variant="outlined"
                InputProps={{
                  classes: {
                    input: clsx({
                      [classes.input]: true,
                      [classes.right]: column.align == "right",
                      [classes.center]: column.align == "center"
                    })
                  }
                }}
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
  const [format, setFormat] = useState(()=>{
    const obj = {}
    columns.forEach(( column )=>{
      obj[column.name] = column.type == "text" ? "" : 0;
    });
    return obj;
  });
  
  /* Handler: Add row. */
  const handleAddRow = useCallback((e)=>{
    setRows([...rows, { id: uuid4(), ...format }]);
  },[ rows ]);

  /* Handler: Save row data. */
  const handleSaveRowData = useCallback((id, data)=>{
    setRows([...rows.map((row)=>(row.id == id ? data : row))]);
  }, [ rows ]);

  /* Handler: Remove row data. */
  const handleRemoveRowData = useCallback(( id )=>{
    setRows(rows.filter((row)=>(row.id != id)));
  }, [ rows ]);

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
          <FormTableHead classes={ classes } columns={ columns }/>
          <TableBody>
          {rows.map((row)=>{
            const rowId = uuid4();
            row.id = rowId;

            return (
              <FormTableRow
                classes={ classes }
                key={ "form-table-body-"+rowId }
                data={ row }
                rowId={ rowId }
                columns={ columns }
                format={ format }
                onSave={ handleSaveRowData }
                onRemove={ handleRemoveRowData }
              />
            );
          })}
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