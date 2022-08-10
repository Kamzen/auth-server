const jwt = require('jsonwebtoken');
const { ApiError } = require('./response');

module.exports = {

    getJWTtoken : (payload, expiresIn = null) => {
        if(expiresIn !== null){

            return jwt.sign(payload, process.env.ACCESS_SECRET_TOKEN, {expiresIn : expiresIn});

        }else{

            return jwt.sign(payload, process.env.REFRESH_ACCESS_TOKEN);

        }
    },

    verifyJWTtoken : (token) => {

        try{

            if(!token) return ApiError(401,"Unauthorized Access")

            const payload = jwt.verify(token,process.env.ACCESS_SECRET_TOKEN + "");

            return payload;

        }catch(e){

            return new ApiError(401, e.message)

        }

    },

    verifyJWTRefreshToken : (token) => {

        try{

            if(!token) return ApiError(401,"Unauthorized Access")

            const payload = jwt.verify(token,process.env.REFRESH_ACCESS_TOKEN + "");

            return payload;

        }catch(e){

            return new ApiError(401, e.message)

        }

    }

}