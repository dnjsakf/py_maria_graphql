/* React */
import React, { useCallback, useState } from 'react';

/* GraphQL */
import client from '@graphql/client';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { SCHEDULE_QUERY } from '@graphql/query/schedule';
import { DELETE_SCHEDULE } from '@graphql/mutation/schedule';

/* Custom Components */
import { SelectedToolBar } from '@components/ToolBar';
import { CheckableTable } from '@components/Table';
import { GridRow, GridColumn } from '@components/Grid';

/* Sub Components */
import ScheduleRegister from './ScheduleRegister';

/* Main Component */
const ScheduleSetting = props =>{
  /* Props */
  const {
    className,
    ...rest
  } = props;

  /* State */
  const [selected, setSelected] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [variables, setVariables] = useState({
  });

  /* GraphQL */
  const { loading, error, data, refetch } = useQuery(
    SCHEDULE_QUERY, { 
      client,
      fetchPolicy: "cache-and-network",
      variables,
      onError( e ){
        console.log( "onError", e );
      },
      onCompleted( c ){
        console.log( "onCompleted", c );
      },
    }
  );
  const [ deleteSchedule, { loading: deleteLoading } ] = useMutation(
    DELETE_SCHEDULE, {
      client,
      onError( error ){
        console.log(error);
      },
      onCompleted({ deleteSchedule: { deleted, success } }) {
        console.log({
          deleted,
          success
        });
        refetch();
      }
    }
  )
  
  /* Handler: Open dialog for ScheduleRegister */
  const handleOpenDialog = useCallback(( e )=>{
    setOpenDialog(true);
  },[]);

  /* Handler: Close dialog for ScheduleRegister */
  const handleCloseDialog = useCallback((e, refetching)=>{
    if( refetching ){
      refetch();
    }
    setOpenDialog(false);
  },[ refetch ]);

  /* Handler: Delete schedule */
  const handleDeleteSchedule = useCallback(( e, ids )=>{
    deleteSchedule({
      variables: {
        schdIds: ids
      }
    });
  },[]);

  /* Rendering */
  return (
    <React.Fragment>
      <GridRow>
        <GridColumn xs={ 12 }>
          <SelectedToolBar
            title="스케줄 목록"
            selected={ selected }
            tools={{
              add: {
                tooltip: "Added data.",
                onClick: handleOpenDialog,
                icon: "add_box"
              }
            }}
            selectTools={{
              analytics: {
                tooltip: "Analyze selected data.",
                onClick: ( e, s )=>{ console.log(e, s); },
                icon: "analytics"
              },
              delete: {
                tooltip: "Delete selected data.",
                onClick: handleDeleteSchedule,
                icon: "delete"
              },
            }}
          />
          <CheckableTable
            dataKey="schdId"
            columns={[
              { id: "schdType", label: "타입", align: "left", width: "10%"},
              { id: "schdStatus", label: "상태", align: "center", width: "10%", type: "button", onClick: (e,key)=>{ console.log(key); }},
              { id: "schdId", label: "ID", align: "left", width: "40%"},
              { id: "execMessage", label: "메시지", align: "center" },
            ]}
            rows={ data ? data.scheduleList : null }
            loading={ loading }
            error={ error }
            selected={ selected }
            onSelected={ setSelected }
          />
        </GridColumn>
      </GridRow>
      <ScheduleRegister
        open={ openDialog } 
        onClose={ handleCloseDialog }
      />
    </React.Fragment>
  );
}

export default ScheduleSetting;