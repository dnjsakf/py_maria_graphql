import gql from 'graphql-tag';

export const LOTTO_PRZWIN_QUERY = gql`
  query LottoPrzwinQuery (
    $pagination: InputPagination = {
      page: 0,
      rowsPerPage: 10
    }
  ) {
    totalCount
    rows (
      pagination: $pagination
    ) {
      id
      drwtNo
      drwtNo1
      drwtNo2
      drwtNo3
      drwtNo4
      drwtNo5
      drwtNo6
      drwtNoBnus
      drwtNoDate
    }
  }
`;

export const DUMMY_LOTTO_PRZWIN_QUERY = gql`
  query LottoPrzwinQuery (
    $orderBy: [LottoPrzwinTypeSortEnum]
    $rowsPerPage: Int!
  ) {
    przwins (sort: $orderBy, first: $rowsPerPage) {
      edges {
        node {
          drwtNo
          drwtNo1
          drwtNo2
          drwtNo3
          drwtNo4
          drwtNo5
          drwtNo6
          drwtNoBnus
        }
      }
    }
  }
`