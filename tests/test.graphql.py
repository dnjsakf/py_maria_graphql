from app.gql import schema
from pprint import pprint

class TestGraphQL(object):  
  def __init__(self):
    print("GraphQL 테스트")
    print("="*40)
    for attrname in dir(self):
      testcase = getattr(self, attrname)
      if attrname.startswith("test") and callable(testcase):
        print("="*40)
        print( testcase.__doc__ )
        print("="*40)
        try:
          testcase()
        except Exception as e:
          print("Error: "+str(e))
        print("")
        print("="*40)
        
  def _test_case_1(self):
    ''' Query - Field '''
    result = schema.execute('''
      query {
        emp ( empno: 7839 ) {
          empno
          ename
          job
          mgr
          hiredate
          sal
          comm
          deptno
        }
      }
    ''')
    pprint( dict(result.to_dict()), indent=2 )
    pprint( result.errors, indent=2 )
    pprint( result.invalid, indent=2 )
    
  def _test_case_2(self):
    ''' Query - List '''
    result = schema.execute('''
      query {
        emp ( empno: 7839 ) {
          empno
          ename
        }
        empList {
          empno
          ename
        }
      }
    ''')
    pprint( dict(result.to_dict()), indent=2 )
    pprint( result.errors, indent=2 )
    pprint( result.invalid, indent=2 )
    
  def _test_case_3(self):
    ''' Query - Edge '''
    result = schema.execute('''
      query EdgesQueryTest {
        emps (
            after: "YXJyYXljb25uZWN0aW9uOjM="
            last: 5
            # before: "YXJyYXljb25uZWN0aW9uOjU="
            # first: 5
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
    ''')
    pprint( dict(result.to_dict()), indent=2 )
    pprint( result.errors, indent=2 )
    pprint( result.invalid, indent=2 )

  def _test_case_4(self):
    ''' Mutation - CreateEmp '''
    result = schema.execute('''
      mutation CreateEmp {
        createEmp (
          input: {
            empno: 9998
            deptno: 10 
          }
        ) {
          emp {
            id
          }
          
        }
      }
    ''')

  def test_case_5(self):
    ''' 메뉴 목록 '''
    result = schema.execute('''
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
                    menuId
                    menuName
                    link
                    icon
                    cmenu {
                      edges {
                        node {
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
    ''')
    pprint( dict(result.to_dict()), indent=2 )
    pprint( result.errors, indent=2 )
    pprint( result.invalid, indent=2 )
  
    
# 테스트실행
TestGraphQL()