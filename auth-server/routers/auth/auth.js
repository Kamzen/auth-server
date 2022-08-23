
const express =  require('express');
const authController = require('../../controllers/auth/authController');
const AuthMid = require('../../middlewares/access/AuthMid');
const { AdminMid, SuperAdminMid } = require('../../middlewares/access/PermissionMid');
const { loginValidate, signUpValidate } = require('../../middlewares/validate/auth');

const authRouter = express.Router();


authRouter.post('/register', signUpValidate ,authController.signUp);



authRouter.post('/login', loginValidate ,authController.login);



authRouter.get('/getUserInfo',authController.getUserInfo);

authRouter.get('/logout',authController.logout);

authRouter.post('/refresh', authController.refreshToken)

authRouter.get('/authorized',AuthMid, (req,res) => {
    return res.json({
        err : false,
        msg : 'User auhthorized',
        usr : req.user
    })
});

module.exports = authRouter;