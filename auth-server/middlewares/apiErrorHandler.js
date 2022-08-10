
const {ApiError} = require('../utils/response');

module.exports = {

    apiErrorHandler : (err,req,res,next) => {
        
        if(err instanceof ApiError){
            
            return res.status(err.code).json({
                status: true,
                msg : err.msg,
                message : err.message
            })

        }

        // else return a generic error that might happen

        return res.status(500).json({
            err : true,
            message : err.message
        })

    }
}

