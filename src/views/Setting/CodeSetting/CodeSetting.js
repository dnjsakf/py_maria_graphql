/* React */
import React, { useCallback, useState, useContext } from 'react';

/* GraphQL */
import client from '@graphql/client';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CODE_TYPE_QUERY } from '@graphql/query/common';

/*  Material-UI*/
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

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

  /* Context */
  const { desktop } = useContext(ResizeContext);

  /* State */
  const [viewMode, setViewMode] = useState( desktop ? "module" : "list" );
  const [openDialog, setOpenDialog] = useState(false);
  const [variables, setVariables] = useState({
  });

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
    // Paper에서 호출할 경우, 오류가 발생함
    // if( refetcing == true ){
    //   refetch();
    // }
    setOpenDialog(false);
  }, []);

  /* Handler: Change view mode, */
  const handleViewMode = useCallback((mode)=>{
    setViewMode(mode);
  }, []);

  /* GraphQL Loading */
  if( loading ){ return <CircularProgress /> }
  if( error ){ return <h1>{ error.message }</h1> }
  if( !data || !data.codeTypes ){ return <h1>No Data</h1> };

  /* Constant Variables */
  const { codeTypes } = data;

  /* Rendering */
  return (
    <GridRow>
      <GridColumn xs={ 12 }>
        <ActionToolBar
          title="공통코드관리"
          tools={
            Object.assign({
              "Add": {
                tooltip: "추가",
                icon: "add_box",
                onClick: handleOpenDialog,
              },
            }, ( desktop && { // 데스크탑인 경우에만 적용
              "ListView": {
                tooltip: "리스트형",
                icon: <ViewListIcon />,
                onClick: (e)=>{ handleViewMode("list") },
              },
              "ModuleView": {
                tooltip: "모듈형",
                icon: <ViewModuleIcon />,
                onClick: (e)=>{ handleViewMode("module") },
              },
            }))
          }
        />
      </GridColumn>
      <GridColumn xs={ 12 }>
        <GridRow>
          {codeTypes && codeTypes.edges.map(({ node }, idx)=>{
            return (
              <GridColumn key={ node.id } xs={ desktop && viewMode == "module" ? 4 : 12 }>
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
        onRefetch={ refetch }
      />
    </GridRow>
  );
}

export default CodeSetting;