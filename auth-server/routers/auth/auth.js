
const express =  require('express');
const authController = require('../../controllers/auth/authController');
const AuthMid = require('../../middlewares/access/AuthMid');
const { AdminMid, SuperAdminMid } = require('../../middlewares/access/PermissionMid');
const { loginValidate } = require('../../middlewares/validate/auth');

const authRouter = express.Router();


authRouter.post('/register', authController.signUp);



authRouter.post('/login', authController.login);



authRouter.get('/isLoggedIn',authController.isLoggedIn);

authRouter.get('/logout',authController.logout);

authRouter.get('/refresh/:refreshToken', authController.refreshToken)

authRouter.get('/authorized',AuthMid, (req,res) => {
    return res.json({
        err : false,
        msg : 'User auhthorized',
        usr : req.user
    })
});

module.exports = authRouter;