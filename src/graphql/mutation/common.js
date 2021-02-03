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
    createCodeType (
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
    updateCodeType (
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

export const UPDATE_CODE_TYPE_USE_YN = gql`
  mutation UpdateCodeTypeUseYn (
    $codeTypeId: String!
    $useYn: String!
  ) {
    updateCodeTypeUseYn (
      input: {
        codeTypeId: $codeTypeId
        useYn: $useYn
      }
    ) {
      success
      updateCount
    }
  }
`

export const DELETE_CODE_TYPE = gql`
  mutation DeleteCodeType (
    $codeTypeId: String!
  ) {
    deleteCodeType (
      input: {
        codeTypeId: $codeTypeId
      }
    ) {
      success
      deleteCount
    }
  }
`;