const yup = require('yup');
const Define = require('../../utils/Define');
const { errorResponse, ApiError } = require('../../utils/response');

module.exports = {

    loginValidate : async (req,res,next) => {
        
        const schema = yup.object().shape({
            email : yup.string().trim().required().email(),
            username : yup.string().trim().required().max(30),
            firstName : yup.string().trim().required().matches(/^[aA-zZ\s]+$/, 'firstName Only characters allowed').max(50),
            lastName : yup.string().trim().required().matches(/^[aA-zZ\s]+$/, 'lastName Only characters allowed').max(50),
            password : yup.string().trim().required().min(8)
        })

        try{

            await schema.validate(req.body,{
                abortEarly : false
            });
            next();

        }catch(err){

            return next(new ApiError(Define.UNPROCESSED,err.errors));

        }
    }
}