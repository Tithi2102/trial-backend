//Example of a middleware function
let exampleMiddleware=(req,res,next)=>
{
    req.user={'firstName':'Tithi','lastName':'Mitra Chowdhury'};
    next();
}

module.exports=
{
    exampleMiddleware:exampleMiddleware
}
