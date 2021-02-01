/* React */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

/* Formik */
import { useFormik } from 'formik';

/* GraphQL */
import client from '@graphql/client';
import { useMutation } from 'react-apollo';
import { CREATE_SCHEDULE } from '@graphql/mutation/schedule';

/* Material-UI */
import { useTheme, makeStyles } from '@material-ui/core';
import { blue, blueGrey } from '@material-ui/core/colors'
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

/* Moment */
import moment from 'moment';

/* Yup */
import * as Yup from 'yup';

/* Custom Components */
import { FormDialog } from '@components/Dialog';
import { GridRow, GridColumn } from '@components/Grid';
import { BackdropProgress } from '@components/Progress';

/* Context */
import { ResizeContext } from '@src/App';


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
  buttonGroup: {
    marginBottom: theme.spacing(1),
  },
  buttonDelete: {
    color: blueGrey[600]
  },
  buttonSave: {
    color: blue[600]
  },
}));


/* Sub Component */
const DateTimeField = props => {
  /* props */
  const {
    classes,
    theme,
    handleChange,
    required,
    ...rest
  } = props;

  /* Rendering */
  return (
    <GridRow padding={ theme.spacing(2) }>
      <GridColumn xs={ 12 }>
        <FormControl fullWidth>
          <TextField
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              onChange: handleChange
            }}
            { ...rest }
          />
          { required && <FormHelperText>Required</FormHelperText> }
        </FormControl>
      </GridColumn>
    </GridRow>
  );
}

/* Sub Component */
const IntervalField = props => {
  /* Props */
  const {
    classes,
    theme,
    formik,
    ...rest
  } = props;

  /* Rendering */
  return (
    <GridRow>
      <GridColumn xs={ 12 }>
        <GridRow padding={ theme.spacing(2) }>
          <GridColumn xs={ 6 }>
            <FormControl fullWidth>
              <TextField type="date"
                label="Start Date"
                id="start_date" 
                name="start_date"
                value={ formik.values.start_date }
                error={ !!formik.errors.start_date }
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  onChange: formik.handleChange,
                  classes: {
                    input: classes.center
                  }
                }}
              />
              {formik.errors.start_date && (
                <FormHelperText>{ formik.errors.start_date }</FormHelperText>
              )}
            </FormControl>
          </GridColumn>
          <GridColumn xs={ 6 }>
            <FormControl fullWidth>
              <TextField type="date"
                label="End Date"
                id="end_date" 
                name="end_date"
                value={ formik.values.end_date }
                error={ !!formik.errors.end_date }
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  onChange: formik.handleChange,
                  classes: {
                    input: classes.center
                  }
                }}
              />
              {formik.errors.end_date && (
                <FormHelperText>{ formik.errors.end_date }</FormHelperText>
              )}
            </FormControl>
          </GridColumn>
        </GridRow>
        <GridRow padding={ theme.spacing(2) }>
          <GridColumn xs={ 6 }>
            <FormControl fullWidth>
              <TextField type="number"
                label="Weeks"
                id="weeks" 
                name="weeks"
                value={ formik.values.weeks }
                error={ !!formik.errors.weeks }
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  onChange: formik.handleChange,
                  classes: {
                    input: classes.center
                  }
                }}
              />
              {formik.errors.weeks && (
                <FormHelperText>{ formik.errors.weeks }</FormHelperText>
              )}
            </FormControl>
          </GridColumn>
          <GridColumn xs={ 6 }>
            <FormControl fullWidth>
              <TextField type="number"
                label="Days"
                id="days" 
                name="days"
                value={ formik.values.days }
                error={ !!formik.errors.days }
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  onChange: formik.handleChange,
                  classes: {
                    input: classes.center
                  }
                }}
              />
              {formik.errors.days && (
                <FormHelperText>{ formik.errors.days }</FormHelperText>
              )}
            </FormControl>
          </GridColumn>
        </GridRow>
        <GridRow padding={ theme.spacing(2) }>
          <GridColumn xs={ 4 }>
            <FormControl fullWidth>
              <TextField type="number"
                label="Hours"
                id="hours" 
                name="hours"
                value={ formik.values.hours }
                error={ !!formik.errors.hours }
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  onChange: formik.handleChange,
                  classes: {
                    input: classes.center
                  }
                }}
              />
              {formik.errors.hours && (
                <FormHelperText>{ formik.errors.hours }</FormHelperText>
              )}
            </FormControl>
          </GridColumn>
          <GridColumn xs={ 4 }>
            <FormControl fullWidth>
              <TextField type="number"
                label="Minutes"
                id="minutes" 
                name="minutes"
                value={ formik.values.minutes }
                error={ !!formik.errors.minutes }
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  onChange: formik.handleChange,
                  classes: {
                    input: classes.center
                  }
                }}
              />
              {formik.errors.minutes && (
                <FormHelperText>{ formik.errors.minutes }</FormHelperText>
              )}
            </FormControl>
          </GridColumn>
          <GridColumn xs={ 4 }>
            <FormControl fullWidth>
              <TextField type="number"
                label="Seconds"
                id="seconds" 
                name="seconds"
                value={ formik.values.seconds }
                error={ !!formik.errors.seconds }
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  onChange: formik.handleChange,
                  classes: {
                    input: classes.center
                  }
                }}
              />
              {formik.errors.seconds && (
                <FormHelperText>{ formik.errors.seconds }</FormHelperText>
              )}
            </FormControl>
          </GridColumn>
        </GridRow>
      </GridColumn>
    </GridRow>
  );
}

/* Sub Component */
const CrontabField = props => {
  /* props */
  const {
    classes,
    theme,
    handleChange,
    required,
    ...rest
  } = props;

  /* Rendering */
  return (
    <GridRow padding={ theme.spacing(2) }>
      <GridColumn xs={ 12 }>
        <FormControl fullWidth>
          <TextField
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              onChange: handleChange
            }}
            { ...rest }
          />
          { required &&  <FormHelperText>Required</FormHelperText> }
        </FormControl>
      </GridColumn>
    </GridRow>
  );
}


/* Main Component */
const ScheduleRegister = props =>{
  /* Props */
  const {
    className,
    open,
    onClose,
    ...rest
  } = props;

  /* Material-UI Hook */
  const classes = useStyles();
  const theme = useTheme();

  /* Context */
  const { desktop } = useContext(ResizeContext);

  /* State */
  const [ initValue, setInitValue ] = useState({
    scheduleId: "",
    scheduleType: "interval",
    datetime: moment().format("YYYY-MM-DDTHH:mm:ss"),
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    start_date: moment().format("YYYY-MM-DD"),
    end_date: moment().format("YYYY-MM-DD"),
    crontab: "",
  });
  
  /* GraphQL */
  const [ createSchedule, { loading: createLoading } ] = useMutation(
    CREATE_SCHEDULE, {
      client,
      onError( error ){
        console.log(error);
      },
      onCompleted({ createSchedule: { schedule, success } }) {
        console.log({
          schedule,
          success
        });
        onClose(null, true);
      }
    }
  );

  /* Formik */
  const formik = useFormik({
    initialValues: initValue,
    validationSchema: Yup.object().shape({
      scheduleId: Yup.string(),
      scheduleType: Yup.string()
        .required('Required')
        .oneOf(['date','interval','crontab']),
      /* Date */
      datetime: Yup.string(),
      /* Interval */
      weeks: Yup.number(),
      days: Yup.number(),
      hours: Yup.number(),
      minutes: Yup.number(),
      seconds: Yup.number(),
      startDate: Yup.string(),
      endDate: Yup.string(),
      /* Crontab */
      crontab: Yup.string(),
    }),
    onSubmit(values) {
      const variables = values;

      switch( values.scheduleType ){
        case "date":
          const d = moment(values.datetime, "YYYY-MM-DDTHH:mm:ss");
          const date = d.format("YYYYMMDD");
          const time = d.format("HHmmss");

          Object.assign(variables, {
            datetime: date+time,
            date: date,
            time: time,
          });
          break;
        case "interval":
          const sd = moment(values.start_date, "YYYY-MM-DD").format("YYYYMMDD");
          const ed = moment(values.end_date, "YYYY-MM-DD").format("YYYYMMDD");

          Object.assign(variables, {
            start_date: sd,
            end_date: ed,
          });

          break;
      }

      console.log(JSON.stringify(variables, null, 2));
      if(confirm("저장하시겠습니까?")){
        createSchedule({
          variables
        });
      }
    }
  });

  /* Rendering */
  return (
    <FormDialog 
      open={ open }
      onClose={ onClose }
      onSubmit={ formik.handleSubmit }
      className={ classes.root }
      noValidate
    >
      <GridRow padding={ theme.spacing(2) }>
        <GridColumn xs={ 12 }>
          <FormControl fullWidth>
            <TextField
              fullWidth
              type="text"
              label="Schedule ID"
              id="scheduleId"
              name="scheduleId"
              error={ !!formik.errors.scheduleId }
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                onChange: formik.handleChange,
              }}
              inputProps={{
                maxLength: 30
              }}
              placeholder={ "UUID" }
            />
            {formik.errors.scheduleId && (
              <FormHelperText>{ formik.errors.scheduleId }</FormHelperText>
            )}
          </FormControl>
        </GridColumn>
      </GridRow>
      <GridRow padding={ theme.spacing(2) }>
        <GridColumn xs={ 12 }>
          <FormControl fullWidth required error={ !!formik.errors.scheduleType }>
            <InputLabel id="schedule-type-label">Schedule Type</InputLabel>
            <Select
              labelId="schedule-type-label"
              id="scheduleType"
              name="scheduleType"
              value={ formik.values.scheduleType }
              onChange={ formik.handleChange }
            >
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="interval">Interval</MenuItem>
              <MenuItem value="crontab">CronTab</MenuItem>
            </Select>
            {formik.errors.scheduleType && (
              <FormHelperText>{ formik.errors.scheduleType }</FormHelperText>
            )}
          </FormControl>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn xs={ 12 }>
          {
            formik.values.scheduleType == "crontab"
            ? <CrontabField
                label="crontab"
                id="crontab"
                name="crontab"
                value={ formik.values.crontab }
                handleChange={ formik.handleChange }
                classes={ classes }
                theme={ theme }
              />
            : formik.values.scheduleType == "interval"
            ? <IntervalField
                formik={ formik }
                classes={ classes }
                theme={ theme }
              />
            : <DateTimeField
                classes={ classes }
                theme={ theme }
                label="datetime"
                id="datetime"
                name="datetime"
                value={ formik.values.datetime }
                handleChange={ formik.handleChange }
                error={ formik.errors.datetime }
              />
          }
        </GridColumn>
      </GridRow>
      <BackdropProgress loading={ createLoading }/>
    </FormDialog>
  );
}

ScheduleRegister.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ScheduleRegister;

/*
 * https://material-ui.com/components/selects/
 * https://material-ui.com/api/input/#css
 * https://material-ui.com/components/text-fields/
 */