/* React */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

/* Formik */
import { useFormik } from 'formik';

/* Yup */
import * as Yup from 'yup';

/* GraphQL */
import client from '@graphql/client';
import { useMutation } from 'react-apollo';
import { CREATE_CODE_TYPE } from '@graphql/mutation/common';

/* Material-UI */
import { useTheme, makeStyles } from '@material-ui/core';
import { blue, blueGrey } from '@material-ui/core/colors'
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

/* Custom Components */
import { FormDialog } from '@components/Dialog';
import { GridRow, GridColumn } from '@components/Grid';
import { BackdropProgress } from '@components/Progress';
import { FormTable } from '@components/Table';

/* Moment */
import moment from 'moment';

/* Styles Hook */
const useStyles = makeStyles((theme)=>({
  root: {
    padding: theme.spacing(1),
  },
  datetime: {
    width: "100%"
  },
  center: {
    textAlign: "center"
  },
  right: {
    textAlign: "right"
  }
}));

/* Main Component */
const CodeRegister = props =>{
  /* Props */
  const {
    className,
    open,
    onClose,
    onRefetch,
    ...rest
  } = props;

  /* Material-UI Hook */
  const classes = useStyles();
  const theme = useTheme();

  /* State */
  const [codes, setCodes] = useState([]);

  /* GraphQL */
  const [ createCodeType, { loading: createLoading } ] = useMutation(
    CREATE_CODE_TYPE, {
      client,
      onError( error ){
        console.log(error);
      },
      onCompleted({ createCodeType: { codeType, success } }) {
        console.log({
          codeType,
          success
        });
        onClose();
        onRefetch();
      }
    }
  );

  /* Formik */
  const formik = useFormik({
    initialValues: {
      codeTypeId: "",
      codeTypeNm: "",
      codeTypeDesc: "",
      useYn: "Y",
      sortOrder: 0,
      codes: codes
    },
    validationSchema: Yup.object().shape({
      codeTypeId: Yup.string()
        .required('Required'),
      codeTypeNm: Yup.string()
        .required('Required'),
      codeTypeDesc: Yup.string(),
      useYn: Yup.string().oneOf(["Y","N"]),
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
          codes: codes.map((code)=>({
            codeId: code.codeId,
            codeNm: code.codeNm,
            codeDesc: code.codeDesc,
            useYn: code.useYn,
            sortOrder: code.sortOrder,
          }))
        }
      }
      createCodeType(options);
    }
  });

  /* Rendering */
  return (
    <FormDialog 
      title="공통코드 등록"
      open={ open }
      onClose={ onClose }
      onSubmit={ formik.handleSubmit }
      className={ classes.root }
      noValidate
    >
      <GridRow padding={ theme.spacing(2) }>
        <GridColumn xs={ 3 }>
          <FormControl fullWidth required>
            <TextField
              fullWidth
              type="number"
              label="정렬순서"
              name="sortOrder"
              value={ formik.values.sortOrder }
              error={ !!formik.errors.sortOrder }
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                onChange: formik.handleChange,
                classes: {
                  input: classes.right
                }
              }}
            />
            {formik.errors.sortOrder && (
              <FormHelperText>{ formik.errors.sortOrder }</FormHelperText>
            )}
          </FormControl>
        </GridColumn>
        <GridColumn xs={ 4 }>
          <FormControl fullWidth required>
            <TextField
              fullWidth
              type="text"
              label="코드타입ID"
              name="codeTypeId"
              value={ formik.values.codeTypeId }
              error={ !!formik.errors.codeTypeId }
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                onChange: formik.handleChange,
              }}
              inputProps={{
                maxLength: 30,
                required: true,
              }}
              autoFocus
            />
            {formik.errors.codeTypeId && (
              <FormHelperText>{ formik.errors.codeTypeId }</FormHelperText>
            )}
          </FormControl>
        </GridColumn>
        <GridColumn xs={ 5 }>
          <FormControl fullWidth required>
            <TextField
              fullWidth
              type="text"
              label="코드타입명"
              name="codeTypeNm"
              value={ formik.values.codeTypeNm }
              error={ !!formik.errors.codeTypeNm }
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                onChange: formik.handleChange,
              }}
              inputProps={{
                maxLength: 30,
                required: true,
              }}
            />
            {formik.errors.codeTypeNm && (
              <FormHelperText>{ formik.errors.codeTypeNm }</FormHelperText>
            )}
          </FormControl>
        </GridColumn>
      </GridRow>
      <GridRow padding={ theme.spacing(2) }>
        <GridColumn xs={ 12 }>
          <FormControl fullWidth required>
            <TextField
              fullWidth
              type="text"
              label="설명"
              name="codeTypeDesc"
              value={ formik.errors.codeTypeDesc }
              error={ !!formik.errors.codeTypeDesc }
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                onChange: formik.handleChange,
              }}
              inputProps={{
                maxLength: 300
              }}
              rows={ 3 }
              rowsMax={ 3 }
              multiline
            />
            {formik.errors.codeTypeDesc && (
              <FormHelperText>{ formik.errors.codeTypeDesc }</FormHelperText>
            )}
          </FormControl>
        </GridColumn>
      </GridRow>
      <GridRow padding={ theme.spacing(2) }>
        <GridColumn xs={ 12 }>
          <FormTable
            title="Codes"
            columns={[
              { type: "text", name: "codeId", label: "코드ID", align: "left" },
              { type: "text", name: "codeNm", label: "코드명", align: "left" },
              { type: "text", name: "codeDesc", label: "설명", align: "left" },
              { type: "number", name: "sortOrder", label: "정렬순서", align: "right" },
            ]}
            rows={ codes }
            setRows={ setCodes }
          />
        </GridColumn>
      </GridRow>
      <BackdropProgress loading={ createLoading }/>
    </FormDialog>
  );
}

CodeRegister.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default CodeRegister;