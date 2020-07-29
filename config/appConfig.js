//Setting up configuration parameters
let appConfig={};

appConfig.port=3000;
appConfig.allowedCorsOrigin="*";
appConfig.env="dev";
appConfig.db={
    url:'mongodb://127.0.0.1:27017/blogAppDB'
};
appConfig.apiVersion='/api/v1';


//Setting up module.exports object
module.exports={

    port:appConfig.port,
    allowedCorsOrigin:appConfig.allowedCorsOrigin,
    environment:appConfig.env,
    db:appConfig.db,
    apiVersion:appConfig.apiVersion
}