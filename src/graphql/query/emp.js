import gql from 'graphql-tag';

export const EMP_QUERY = gql(`
  query EMP_QUERY (
    $empno: Int!
  ) {
    emp ( empno: $empno ) {
      empno
      ename
    }
    empList {
      empno
      ename
    }
    emps {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          empno
          ename
        }
      }
      totalCount
      edgeCount
    }
  }
`);

