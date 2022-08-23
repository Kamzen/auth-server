const Define = require("../../utils/Define");
const Helper = require("../../utils/Helper");
const { ApiError } = require("../../utils/response");



module.exports = {

    AuthMid : (req,res,next) => {

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
    
            // check for invalid signature
            if(usr.msg && usr.msg === 'invalid signature') throw new ApiError(Define.UNAUTHORIZED, 'User token not valid');
    
            // if usr is nullish
            if(!usr) throw new ApiError(Define.UNAUTHORIZED, 'User not authorized')
    
            // set user on request variable
            req.user = usr;

            console.log('Auth token sent');
            next();
    
        }catch(e){
            console.log(e)
             next(e);
    
        }
    },

    /**
     * @description // check if usr is logged in
     */
     isLoggedIn : (req,res, next) => {

        try{

            // get token from request cookies
            const token = req.cookies[process.env.COOKIE_ACCESS_TOKEN];

            // console.log(req.cookies);

            // if token not defined
            if(!token) throw new ApiError(Define.UNAUTHORIZED, 'Hey what you tryna do, you are not logged in or you didn\'t login from here');

            // verify token
            const loggedInUser = Helper.verifyJWTtoken(token);

            // if token signature is not valid
            if(!loggedInUser) throw new ApiError(Define.BAD_REQUEST, 'Invalid token signature');

            next();
            

        }catch(e){

             next(e);

        }

    },

}
