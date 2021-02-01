import gql from 'graphql-tag';


export const CREATE_CODE_TYPE = gql`
  mutation CreateCodeType (
    $codeTypeId: String!
    $codeTypeNm: String
    $codeTypeDesc: String
    $useYn: String
    $sortOrder: Int
    $codes: [CodeInput]
  ) {
    createParentCode (
      input: {
        codeTypeId: $codeTypeId
        codeTypeNm: $codeTypeNm
        codeTypeDesc: $codeTypeDesc
        useYn: $useYn
        sortOrder: $sortOrder
        codes: $codes
      }
    ) {
      success
      codeType {
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
`;

export const UPDATE_CODE_TYPE = gql`
  mutation UpdateCodeType (
    $codeTypeId: String!
    $codeTypeNm: String
    $codeTypeDesc: String
    $useYn: String
    $sortOrder: Int
    $codes: [CodeInput]
  ) {
    updateParentCode (
      input: {
        codeTypeId: $codeTypeId
        codeTypeNm: $codeTypeNm
        codeTypeDesc: $codeTypeDesc
        useYn: $useYn
        sortOrder: $sortOrder
        codes: $codes
      }
    ) {
      success
      codeType {
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
`;