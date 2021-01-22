/* React */
import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { EMP_QUERY } from '@graphql/query/emp';

const Test = ()=>{
  const { loading, error, data, refetch } = useQuery(EMP_QUERY, { variables: { empno: 7839 }});
  
  if( loading ){
    return <span>Data loading....</span>;
  }
  if( error ){
    console.error( error );
    return null;
  }

  const {
    emp,
    empList,
    emps
  } = data;

  return (
    <ul>
      {
        empList.map(({ empno, ename })=>(
          <li key={empno+ename}>{ename}</li>
        ))
      }
    </ul>
  );
}

/* Exports */
export default Test;