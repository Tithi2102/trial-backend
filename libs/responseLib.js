//Creating custom libraries

/*Standard response format*/
let generate=(err,message,status,data)=>
{
    let response=
    {
        error:err,
        message:message,
        status:status,
        data:data
    }
    return response;
}

module.exports=
{
    generate:generate
}