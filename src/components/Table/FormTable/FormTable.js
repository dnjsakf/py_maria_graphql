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

import Switch from '@material-ui/core/Switch';
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
    overflowX: "scroll",
  },
  table: {
    minWidth: 440,
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
  th: {
    padding: theme.spacing(1),
  },
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
        <TableCell className={ classes.btnCell } padding="none" align="center"></TableCell>
        {columns.map(( column )=>{
          return (
            <TableCell
              key={ "table-form-head-col-"+column.name }
              className={ classes.th } 
              style={{ width: column.width }}
              padding="none"
              align="center"
            >
              { column.label }
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}


const FormTableColumn = props => {
  /* Props */
  const {
    classes,
    type,
    name,
    align,
    style,
    value,
    onChange,
    onBlur,
    ...rest
  } = props;

  /* Rendering: Switch */
  if( type == "switch" ){
    const checked = value == true || value == "Y";
    return (
      <TableCell className={ classes.td } padding="none" align="center">
        <FormControl
          fullWidth
          align={ align||"left" }
          style={ style }
        >
          <Switch
            name={ name }
            checked={ checked }
            onChange={ onChange }
            onBlur={ onBlur }
          />
        </FormControl>
      </TableCell>
    );
  }

  /* Rendering: Default */
  return (
    <TableCell className={ classes.td } padding="none" align="center">
      <FormControl
        align={ align||"left" }
        style={ style }
        fullWidth
      >
        <TextField 
          fullWidth
          type={ type||"text" }
          name={ name }
          value={ value }
          onChange={ onChange }
          onBlur={ onBlur }
          variant="outlined"
          InputProps={{
            classes: {
              input: clsx({
                [classes.input]: true,
                [classes.right]: align == "right",
                [classes.center]: align == "center"
              })
            }
          }}
        />
      </FormControl>
    </TableCell>
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
  const handleBlur = async (e)=>{
    const rowData = {
      ...formik.values
    }

    columns
      .filter(col=>col.type=="switch" && Array.isArray(col.switch) && col.switch.length == 2)
      .forEach( col=>{
        Object.assign(rowData, {
          [col.name]: rowData[col.name] ? col.switch[0] : col.switch[1]
        });
      });
    // onSave( rowId, rowData );
  }

  /* Redering */
  return (
    <TableRow>
      <TableCell className={ classes.btnCell } padding="none" align="center">
        <IconButton size="small" color="primary" onClick={ (e)=>onRemove(rowId) }>
          <RemoveCircle />
        </IconButton>
      </TableCell>
      {columns.map(( column )=>(
        <FormTableColumn
          key={ "table-form-body-col-"+column.name }
          classes={ classes }
          type={ column.type||"text" }
          name={ column.name }
          align={ column.align }
          value={ formik.values[column.name] }
          onChange={ formik.handleChange }
          onBlur={ handleBlur }
        />
      ))}
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
          className={ classes.table }
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