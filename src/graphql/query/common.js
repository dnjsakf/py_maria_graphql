import gql from 'graphql-tag';

export const CODE_TYPE_QUERY = gql`
  query CodeTypeQuery {
    codeTypes {
      totalCount
      edges {
        node {
          id
          codeTypeId
          codeTypeNm
          codeTypeDesc
          useYn
          sortOrder
          code {
            edges {
              node {
                id
                codeId
                codeNm
                codeDesc
                useYn
                sortOrder
              }
            }
          }
        }
      }
    }
  }
`;