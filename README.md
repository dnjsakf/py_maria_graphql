"# py_maria_graphql" 

$.ajax({
    method: "POST",
    url:"http://localhost:3000/graphql",
    contentType: "application/json",
    data: JSON.stringify({
        query: `
        query TestAjax ( $empno: Int! ) {
            emp ( empno: $empno ) {
                empno
                ename
            }
        }`,
        variables: {
            "empno":  7839
        }
    }),
    success: function(resp){
        console.log( resp );
    }
})