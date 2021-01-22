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
    emps (
        after: "YXJyYXljb25uZWN0aW9uOjM="
        last: 5
      ) {
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

