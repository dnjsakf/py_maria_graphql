/* React */
import React, { useState } from 'react';

/* GraphQL */
import client from '@graphql/client';
import { useQuery } from '@apollo/react-hooks';
import { LOTTO_PRZWIN_QUERY } from '@graphql/query/lotto';

/* Material-UI */
import Paper from '@material-ui/core/Paper';

/* Custom Component */
import { SelectedToolBar } from '@components/ToolBar';
import { CheckableTable } from '@components/Table';

/* Main Component */
const Lotto = props =>{
  /* Props */
  const {
    className,
    ...rest
  } = props;

  /* State */
  const [variables, setVariables] = useState({});
  const [selected, setSelected] = useState([]);

  /* GraphQL */
  const { loading, error, data, refetch } = useQuery(
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

  /* Rendering */
  return (
    <Paper>
      <SelectedToolBar
        title="로또목록"
        selected={ selected }
      />
      <CheckableTable
        dataKey="drwtNo"
        checkbox={ false }
        columns={[
          { name: "drwtNo", label: "회차", align: "center", minWidth: 30 },
          { name: "drwtNo1", label: "번호1", align: "center", minWidth: 30 },
          { name: "drwtNo2", label: "번호2", align: "center", minWidth: 30 },
          { name: "drwtNo3", label: "번호3", align: "center", minWidth: 30 },
          { name: "drwtNo4", label: "번호4", align: "center", minWidth: 30 },
          { name: "drwtNo5", label: "번호5", align: "center", minWidth: 30 },
          { name: "drwtNo6", label: "번호6", align: "center", minWidth: 30 },
          { name: "drwtNoBnus", label: "보너스", align: "center", minWidth: 30 },
          { name: "drwtNoDate", label: "추첨일", align: "center", type: "date", format: "YYYY-MM-DD", minWidth: 30 }
        ]}
        rows={ loading ? null : data.przwinList }
        loading={ loading }
        error={ error }
        selected={ selected }
        onSelected={ setSelected }
      />
    </Paper>
  );
}

export default Lotto;