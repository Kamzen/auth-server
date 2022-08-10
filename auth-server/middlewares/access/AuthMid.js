const Define = require("../../utils/Define");
const Helper = require("../../utils/Helper");
const { ApiError } = require("../../utils/response");


const AuthMid = (req,res,next) => {

    try{

        // get auth header
        const header = req.header('authorization');

        // not bearer from request headers
        if(!header) throw new ApiError(Define.UNAUTHORIZED, 'User not authorized')

        // split the header auth
        const split = header.split(" ");

        // check if the prefix auth header is Bearer
        if(split[0] !== 'Bearer') throw new ApiError(Define.UNAUTHORIZED, 'User not authorized')

        // get token from request header
        const token = split[1];

        // verify token 
        const usr = Helper.verifyJWTtoken(token);   

        // check if user token expired
        if(usr.msg && usr.msg === 'jwt expired') throw new ApiError(Define.UNAUTHORIZED, 'User token expired');

        // if invalid token
        if(!usr) throw new ApiError(Define.UNAUTHORIZED, 'User not authorized')

        // set user on request variable
        req.user = usr;

        next();

    }catch(e){
        console.log(e)
         next(e);

    }

}

module.exports = AuthMid;