/* React */
import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

/* GraphQL */
import client from '@graphql/client';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_CODE_TYPE } from '@graphql/mutation/common';

/* Material-UI */
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Switch from '@material-ui/core/Switch';
import Paper  from '@material-ui/core/Paper';
import Collapse  from '@material-ui/core/Collapse';

/* Formik */
import { useFormik } from 'formik';

/* Yup */
import * as Yup from 'yup';

/* Custom Components */
import { SelectedToolBar } from '@components/ToolBar';
import { CheckableTable } from '@components/Table';
import { FormDialog } from '@components/Dialog';

/* Material-UI Hook */
const useStyles = makeStyles((theme)=>({
  root: {
    minWidth: 275,
    padding: theme.spacing(1),
  },
  header: {
    padding: theme.spacing(1),
  },
  content: {
    padding: theme.spacing(1),
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  titleButton: {
    justifyContent: "left",
  },
  actions: {
    justifyContent: "space-around",
  }
}));

/* Main Component */
const FormCard = props =>{
  /* Props */
  const {
    className,
    no,
    codeTypeId,
    codeTypeNm,
    codeTypeDesc,
    useYn: codeTypeUseYn,
    sortOrder,
    codes,
    refetch,
    ...rest
  } = props;

  /* State */
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  /* GraphQL */
  const [ updateCodeType, { loading: updateLoading } ] = useMutation(
    UPDATE_CODE_TYPE, {
    client,
    onError(error){
      console.error( error );
    },
    onCompleted({ updateParentCode: { codeType, success } }){
      console.log( codeType, success );
      // setOpen(false);
      refetch();
    }
  });

  /* Formik */
  const formik = useFormik({
    initialValues: {
      codeTypeId,
      codeTypeNm,
      codeTypeDesc,
      useYn: codeTypeUseYn=="Y",
      sortOrder,
      codes
    },
    validationSchema: Yup.object().shape({
      codeTypeId: Yup.string()
        .required('Required'),
      codeTypeNm: Yup.string(),
      codeTypeDesc: Yup.string(),
      useYn: Yup.bool(),
      sortOrder: Yup.number(),
      codes: Yup.array(),
    }),
    onSubmit(values) {
      updateCodeType({
        variables: {
          codeTypeId: values.codeTypeId,
          codeTypeNm: values.codeTypeNm,
          codeTypeDesc: values.codeTypeDesc,
          useYn: values.useYn ? "Y":"N",
          sortOrder: values.sortOrder,
          codes: values.codes.map((code)=>({
            codeId: code.codeId,
            codeNm: code.codeNm,
            codeDesc: code.codeDesc,
            useYn: code.useYn,
            sortOrder: code.sortOrder,
          }))
        }
      });
    }
  });

  /* Material-UI Hook */
  const classes = useStyles();

  /* Handler: Delete child codes. */
  const handleDeleteCode = useCallback((e, s)=>{
    console.log(codeTypeId, s);
  },[]);

  /* Handler: Toggle expand. */
  const handleToggleCollapse = useCallback((e)=>{
    setOpen(!open);
  },[open]);

  /* Handler: Reset variables. */
  const handleReset = useCallback((e)=>{
    formik.setValues(formik.initialValues);
  },[]);

  /* Rendering */
  return (
    <Card className={classes.root}>
      <form onSubmit={ formik.handleSubmit } noValidate>
        <CardHeader
          className={ classes.header }
          avatar={
            <Avatar aria-label="recipe" className={ classes.avatar }>
              { no }
            </Avatar>
          }
          action={
            <Switch
              checked={ formik.values.useYn }
              onChange={ formik.handleChange }
              name="useYn"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          }
          title={
            <Button
              fullWidth
              className={ classes.titleButton }
              onClick={ handleToggleCollapse }
            >
              { codeTypeNm }
            </Button>
          }
          subheader={ codeTypeId }
        />
        <Collapse in={open} timeout="auto" unmountOnExit>
          <CardContent className={ classes.content }>
            <FormControl className={ classes.pos } fullWidth>
              <TextField
                type="text"
                label="코드타입명"
                name="codeTypeNm"
                value={ formik.values.codeTypeNm }
                onChange={ formik.handleChange }
              />
            </FormControl>
            <FormControl className={ classes.pos } fullWidth>
              <TextField
                type="text"
                label="설명"
                name="codeTypeDesc"
                value={ formik.values.codeTypeDesc }
                onChange={ formik.handleChange }
                rowsMax={3}
                multiline
              />
            </FormControl>
            <FormControl className={ classes.pos } fullWidth>
              <TextField
                type="number"
                label="정렬순서"
                name="sortOrder"
                value={ formik.values.sortOrder }
                onChange={ formik.handleChange }
              />
            </FormControl>
            <Paper>
              <SelectedToolBar
                title="Codes"
                selected={ selected }
                selectTools={{
                  delete: {
                    tooltip: "Delete codes.",
                    icon: "delete",
                    onClick: handleDeleteCode,
                  }
                }}
                tools={{
                  added: {
                    tooltip: "Added codes.",
                    icon: "add_box",
                    onClick: handleDeleteCode,
                  }
                }}
              />
              <CheckableTable
                title="Codes"
                dataKey="codeId"
                columns={[
                  { id: "codeId", label: "ID", align: "left", width: "25%"},
                  { id: "codeNm", label: "Name", align: "center", width: "35%"},
                  { id: "codeDesc", label: "Desc", align: "left", width: "40%"},
                  { id: "sortOrder", label: "sortOrder", align: "left", width: "40%"},
                ]}
                rows={ codes }
                selected={ selected }
                onSelected={ setSelected }
              />
            </Paper>
          </CardContent>
          <CardActions className={ classes.actions }>
            <Button size="small" onClick={ handleReset } color="primary">Reset</Button>
            <Button size="small" type="submit" color="primary">Save</Button>
          </CardActions>
        </Collapse>
      </form>
    </Card>
  );
}

export default FormCard;