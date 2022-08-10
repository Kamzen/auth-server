const bcrypt = require('bcrypt');

const Define = require('../../utils/Define');
const { ApiResponse, ApiError} = require('../../utils/response');
const { User } = require('../../models');
const { Op } = require("sequelize");
const Helper = require('../../utils/Helper');
const { verifyJWTtoken, getJWTtoken, verifyJWTRefreshToken } = require('../../utils/Helper');



const userController = {

    /**
     * signUp controller function
     * @param {any} req request
     * @param {any} res response
     * @param {any} next next function
     * @returns {any}
     */
    
    signUp : async (req,res,next) => {

        try{

            /**
             * Signing up new usr
             */
            const data = req.body;
            console.log(data)

            const ACCOUNT_TYPES = ['user','admin','superadmin'];

            if(!ACCOUNT_TYPES.includes(data?.type)) throw new ApiError(Define.BAD_REQUEST, "Error Creating New User") // if type is not in ACCOUNT_TYPES throw error

            const isEmailTaken = await User.findOne({where : { email : data.email }}); // check if email taken

            if(isEmailTaken) throw new ApiError(Define.UNPROCESSED, "Email Already Exist") // if email is taken return an error object

            const isUsernameTaken = await User.findOne({where : { username : data.username }}); // check if username exist

            
            if(isUsernameTaken) throw new ApiError(Define.UNPROCESSED, "Username Already Exist") // if username exist return error object

            const hash = await bcrypt.hash(data.password, await bcrypt.genSalt(10)); // hash user password

            // create new user
            const usr = await User.create({
                ...data, 
                password : hash
            });


            // if new user created successfully
            if(usr){
                
                return res.status(Define.CREATED).json(ApiResponse('User account created successfully', {user : usr}));
            }
            

        }catch(e){ // catch errors

            next(e);
        }

    },

    /**
     * @param {any} req request
     * @param {any} res response
     * @param {any} next next function
     * @returns {any}
     */
    login : async (req,res,next) => {

        try{

            // destructure email & password from request body
            const { email, password } = req.body;

            // check if usr email exist

            const usr = await User.findOne({
                where : {
                    [Op.or] : [
                        { email : email },
                        { username : email }
                    ]
                }
            });

            // if no user found throw error

            if(!usr) throw new ApiError(Define.NOT_FOUND, 'Email/Username and password incorrect')
            // check if passwords matches

            const isCorrectPassword = await bcrypt.compare(password, usr.password);

            // if passwords does not match

            if(!isCorrectPassword) throw new ApiError(Define.NOT_FOUND, 'Email/Username and password incorrect')

            // delete usr.password

            // set req cookie token
            const payload = { 
                    email : usr.email, 
                    username : usr.username,
                    id : usr.id,
                    firsName : usr.firstName,
                    lastName : usr.lastName
                }
    
            // get json token
            const JWTtoken = Helper.getJWTtoken(payload, "100s");
            const JWTRefreshToken = Helper.getJWTtoken(payload);

            // set token to cookie
            res.cookie(process.env.ACCESS_SECRET_TOKEN,JWTtoken,Define.SESSION_COOKIE_OPTIONS);

            // would need to persist refresh token, either redis in-memory or on the database

           return res.status(Define.OK).json(ApiResponse('Login successful', {token : JWTtoken, refresh : JWTRefreshToken}));

        }catch(e){

             next(e);
        }

    },
    // check if usr is logged in
    isLoggedIn : (req,res, next) => {

        try{

            // get token from request cookies
            const token = req.cookies[process.env.ACCESS_SECRET_TOKEN];

            // if token not defined
            if(!token) throw new ApiError(Define.UNAUTHORIZED, 'User not authorized');

            // verify token
            const loggedInUser = Helper.verifyJWTtoken(token);

            if(loggedInUser.msg && loggedInUser.msg === 'jwt expired') throw new ApiError(Define.UNAUTHORIZED, 'User token expired');

            // if token signature is not valid
            if(!loggedInUser) throw new ApiError(Define.BAD_REQUEST, 'Invalid token signature');

            // response
            return res.status(Define.OK).json(ApiResponse('User authorized successful', {user : loggedInUser}));
            

        }catch(e){
            console.log(e)
             next(e);

        }

    },

    refreshToken : (req,res,next) => {

        // get token from request params
        const { refreshToken } = req.params;

        // verify token, but you would to check if the token is there somewhere
        const usr = verifyJWTRefreshToken(refreshToken);

        delete usr.iat;

        // generate a new token
        const token = getJWTtoken(usr, '100s');

        // set new token to cookie
        res.cookie(process.env.ACCESS_SECRET_TOKEN,token,Define.SESSION_COOKIE_OPTIONS);

        return res.status(Define.OK).json(ApiResponse('Token refreshed successful', {token : token}));

    },

    // logout controller function
    logout : (req,res,next) => {

        try{

            // clear cookie token
            res.clearCookie(process.env.ACCESS_SECRET_TOKEN);
            req.user = null;
            return res.status(Define.OK).json(ApiResponse('Logout successful',{ user : null }))

        }catch(e){

             next(e);

        }

    }
}

module.exports = userController;