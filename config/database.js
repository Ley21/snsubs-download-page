module.exports = {
    url : 'mongodb://'+process.env.db_user+':'+process.env.db_password+'@'+process.env.db_address+'/snsubs_ddl?authSource=admin' // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot

};