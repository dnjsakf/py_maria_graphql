import gql from 'graphql-tag';

export const MENU_QUERY = gql`
  query MenuQuery {
    menus {
      edgeCount
      edges {
        node {
          id
          menuType
          menuId
          menuName
          link
          icon
          pmenu {
            menuId
            menuName
            link
            icon
          }
          cmenu {
            edges {
              node {
                id
                menuId
                menuName
                link
                icon
                cmenu {
                  edges {
                    node {
                      id
                      menuId
                      menuName
                      link
                      icon
                    }
                  }
                }
              }
            }
          } 
        }
      }
    }
  }
`;