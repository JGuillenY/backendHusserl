"use strict";

class security{
    sandSafe(req, res, next){
        console.log(req)
        console.log(req.auth)
        return next()
    }
    stoneSafe(){

    }
    ironSafe(){

    }
}

module.exports.security;