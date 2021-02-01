/* React */
import React, { useCallback, useState, useContext } from 'react';

/* GraphQL */
import client from '@graphql/client';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CODE_TYPE_QUERY } from '@graphql/query/common';

/* Context */
import { ResizeContext } from '@src/App';

/* Custom Components */
import { ActionToolBar } from '@components/ToolBar';
import { GridRow, GridColumn } from '@components/Grid';
import { CircularProgress } from '@components/Progress';

import CodeRegister from './CodeRegister';
import FormCard from './FormCard';

/* Main Component */
const CodeSetting = props =>{
  /* Props */
  const {
    className,
    ...rest
  } = props;

  /* State */
  const [openDialog, setOpenDialog] = useState(false);
  const [variables, setVariables] = useState({
  });

  /* Context */
  const { desktop } = useContext(ResizeContext);

  /* GraphQL */
  const { loading, error, data, refetch } = useQuery(
    CODE_TYPE_QUERY, { 
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

  /* Handler: Open dialog. */
  const handleOpenDialog = useCallback((e, s)=>{
    setOpenDialog(true);
  }, []);

  /* Handler: Close dialog. */
  const handleCloseDialog = useCallback((e, refetcing)=>{
    if( refetcing == true ){
      refetch();
    }
    setOpenDialog(false);
  }, []);

  /* GraphQL Loading */
  if( loading ){ return <CircularProgress /> }
  if( error ){ return <h1>{ error.message }</h1> }
  if( !data || !data.codeTypes ){ return <h1>No Data</h1> };

  const { codeTypes } = data;

  /* Rendering */
  return (
    <GridRow>
      <GridColumn xs={ 12 }>
        <ActionToolBar
          title="공통코드관리"
          tools={{
            "Add": {
              tooltip: "추가",
              icon: "add_box",
              onClick: handleOpenDialog,
            },
          }}
        />
      </GridColumn>
      <GridColumn xs={ 12 }>
        <GridRow>
          {codeTypes && codeTypes.edges.map(({ node }, idx)=>{
            return (
              <GridColumn key={ node.id } xs={ desktop ? 4 : 12 }>
                <FormCard
                  { ...node }
                  no={ codeTypes.edges.length - idx } 
                  codes={ node.code.edges.map(({ node })=>( node )) }
                  refetch={ refetch }
                />
              </GridColumn>
            );
          })}
        </GridRow>
      </GridColumn>
      <CodeRegister
        open={ openDialog }
        onClose={ handleCloseDialog }
      />
    </GridRow>
  );
}

export default CodeSetting;