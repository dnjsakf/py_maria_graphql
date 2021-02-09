/* React */
import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

/* GraphQL */
import client from '@graphql/client';
import { useMutation } from '@apollo/react-hooks';
import {
  UPDATE_CODE_TYPE,
  DELETE_CODE_TYPE,
  UPDATE_CODE_TYPE_USE_YN
} from '@graphql/mutation/common';

/* Formik */
import { useFormik } from 'formik';

/* Yup */
import * as Yup from 'yup';

/* Material-UI */
import styled from 'styled-components';

/* Material-UI */
import { useTheme, makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Switch from '@material-ui/core/Switch';
import Collapse  from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import SaveIcon from '@material-ui/icons/Save';

/* Custom Components */
import { GridRow, GridColumn } from '@components/Grid';
import { FormTable } from '@components/Table';
import { CircularProgress } from '@components/Progress';

/* Material-UI Hook */
const useStyles = makeStyles((theme)=>({
  root: {
    // height: "100%",
    minWidth: 275,
    padding: theme.spacing(1),
    boxSizing: "border-box",
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
  },
  right: {
    textAlight: "right",
  }
}));

/* Styled Components */
const StatusIconButton = styled(IconButton)`
  ${({ theme, status })=>`
    color: ${ theme.palette[status||"primary"].contrastText };
    background-color: ${ theme.palette[status||"primary"].main };
    &:hover {
      font-size: 100px;
      background-color: ${ theme.palette[status||"primary"].dark };
    }
  `}
`;

/* Main Component */
const FormCard = props =>{
  /* Props */
  const {
    className,
    no,
    codeTypeId,
    codeTypeNm,
    codeTypeDesc,
    useYn,
    sortOrder,
    codes,
    refetch,
    ...rest
  } = props;

  /* Material-UI Hook */
  const classes = useStyles();

  /* State */
  const [open, setOpen] = useState(false);
  const [rows , setRows] = useState(codes);
  const [toggle, setToggle] = useState(useYn=="Y");
  const [initValues, setInitValues] = useState({
    codeTypeId: codeTypeId||"",
    codeTypeNm: codeTypeNm||"",
    codeTypeDesc: codeTypeDesc||"",
    useYn: useYn,
    sortOrder: sortOrder||0,
    codes: codes.map( node => ({
      codeId: node.codeId||"",
      codeNm: node.codeNm||"",
      codeDesc: node.codeDesc||"",
      useYn: node.useYn||"N",
      sortOrder: node.sortOrder||0,
    }))
  });

  /* GraphQL */
  const [ updateCodeType, { loading: updateLoading } ] = useMutation(
    UPDATE_CODE_TYPE, {
    client,
    onError(error){
      console.error( error );
    },
    onCompleted({ updateCodeType: { codeType, success } }){
      const newRows = codeType.code.edges.map(({ node })=>({
        codeId: node.codeId,
        codeNm: node.codeNm,
        codeDesc: node.codeDesc,
        useYn: node.useYn,
        sortOrder: node.sortOrder,
      }));

      setInitValues({
        codeTypeId: codeType.codeTypeId||"",
        codeTypeNm: codeType.codeTypeNm||"",
        codeTypeDesc: codeType.codeTypeDesc||"",
        useYn: codeType.useYn,
        sortOrder: codeType.sortOrder||0,
        codes: newRows
      });

      setOpen(false);
      refetch();
    }
  });
  const [ updateCodeTypeUseYn, { loading: updateUseYnLoading } ] = useMutation(
    UPDATE_CODE_TYPE_USE_YN, {
    client,
    onError(error){
      console.error( error );
    },
    onCompleted({ updateCodeTypeUseYn: { updateCount, success } }){
      console.log(updateCount, success );
      // refetch();
      // setOpen(false);
    }
  });

  const [ deleteCodeType, { loading: deleteLoading } ] = useMutation(
    DELETE_CODE_TYPE, {
    client,
    onError(error){
      console.error( error );
    },
    onCompleted({ deleteCodeType: { deleteCount, success } }){
      console.log( deleteCount, success );
      refetch();
    },
  });

  /* Formik */
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object().shape({
      codeTypeId: Yup.string()
        .required('Required'),
      codeTypeNm: Yup.string()
        .required('Required'),
      codeTypeDesc: Yup.string(),
      useYn: Yup.string()
        .oneOf(["Y","N"]),
      sortOrder: Yup.number(),
      codes: Yup.array(),
    }),
    onSubmit(values) {
      const options = {
        variables: {
          codeTypeId: values.codeTypeId,
          codeTypeNm: values.codeTypeNm,
          codeTypeDesc: values.codeTypeDesc,
          useYn: values.useYn,
          sortOrder: values.sortOrder,
          codes: rows.map((node)=>({
            codeId: node.codeId,
            codeNm: node.codeNm,
            codeDesc: node.codeDesc,
            useYn: node.useYn || "Y",
            sortOrder: node.sortOrder
          }))
        }
      }
      updateCodeType(options);
    }
  });

  /* Handler: Toggle expand. */
  const handleToggleCollapse = useCallback((e)=>{
    if( open ){
      handleReset();
    }
    setOpen(!open);
  },[initValues, open]);

  /* Handler: Reset variables. */
  const handleReset = useCallback((e)=>{
    setRows(initValues.codes);
    formik.setValues(initValues);
  },[initValues]);

  /* Handler: Delete code type. */
  const handleDelete = useCallback((e)=>{
    deleteCodeType({
      variables: {
        codeTypeId
      }
    })
  },[]);

  /* Handler: Switching useYn */
  const handleSwitchUseYn = useCallback((e)=>{
    const afterToggle = !toggle;
    const afterUseYn = afterToggle ? "Y": "N";
    handleReset();
    setToggle(afterToggle);
    
    formik.setValues({
      ...formik.values,
      useYn: afterUseYn
    });
    updateCodeTypeUseYn({
      variables: {
        codeTypeId: codeTypeId,
        useYn: afterUseYn
      }
    });
    // formik.submitForm();
  }, [toggle, initValues]);

  /* Rendering */
  return (
    <Card className={ classes.root }>
      <form onSubmit={ formik.handleSubmit } noValidate>
        <CardHeader
          className={ classes.header }
          avatar={
            <Avatar aria-label="recipe" className={ classes.avatar }>
              { no }
            </Avatar>
          }
          action={
            (updateLoading  || updateUseYnLoading || deleteLoading )
            ?(<CircularProgress relative />)
            :(<Switch
              checked={ toggle }
              onChange={ handleSwitchUseYn }
              name="useYn"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />)
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
        <Collapse in={open} timeout={ 150 } unmountOnExit>
          <CardContent className={ classes.content }>
            <GridRow>
              <GridColumn xs={4}>
                <FormControl className={ classes.pos } fullWidth>
                  <TextField
                    type="number"
                    label="정렬순서"
                    name="sortOrder"
                    value={ formik.values.sortOrder }
                    onChange={ formik.handleChange }
                    InputProps={{
                      classes: {
                        input: classes.right
                      }
                    }}
                  />
                </FormControl>
              </GridColumn>
              <GridColumn xs={8}>
                <FormControl className={ classes.pos } fullWidth>
                <TextField
                  type="text"
                  label="코드타입명"
                  name="codeTypeNm"
                  value={ formik.values.codeTypeNm }
                  onChange={ formik.handleChange }
                />
              </FormControl>
              </GridColumn>
            </GridRow>
            <GridRow>
              <GridColumn xs={12}>
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
              </GridColumn>
            </GridRow>
            <GridRow>
              <GridColumn xs={12}>
                <FormTable
                  title="Codes"
                  columns={[
                    { type: "text", name: "codeId", label: "코드ID", align: "left" },
                    { type: "text", name: "codeNm", label: "코드명", align: "left" },
                    { type: "text", name: "codeDesc", label: "설명", align: "left" },
                    { type: "number", name: "sortOrder", label: "정렬순서", align: "right" },
                    { type: "switch", switch: ["Y","N"], name: "useYn", label: "사용여부", align: "center" },
                  ]}
                  rows={ rows }
                  setRows={ setRows }
                />
              </GridColumn>
            </GridRow>
          </CardContent>
          <CardActions className={ classes.actions }>
            <StatusIconButton size="small" onClick={ handleDelete } status="error">
              <DeleteIcon />
            </StatusIconButton>
            <StatusIconButton size="small" onClick={ handleReset } status="warning">
              <AutorenewIcon />
            </StatusIconButton>
            <StatusIconButton size="small" type="submit" status="primary">
              <SaveIcon />
            </StatusIconButton>
          </CardActions>
        </Collapse>
      </form>
    </Card>
  );
}

export default FormCard;