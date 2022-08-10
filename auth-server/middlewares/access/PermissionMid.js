const Define = require("../../utils/Define");
const { ApiError } = require("../../utils/response");

 
const UserTypes = {
    admin : 'admin',
    superadmin : 'superadmin'
}

// admin access
const AdminMid = (req,res,next) => {

    try{

        // check if user type is admin
        if(req.user.type !== UserTypes.admin) throw new ApiError(Define.UNAUTHORIZED, 'Access Denied')

        next();

    }catch(e){

         next(e);
    }

}

// super admin access
const SuperAdminMid = (req,res,next) => {

    try{

        if(req.user.type !== UserTypes.admin) throw new ApiError(Define.UNAUTHORIZED, 'Access Denied')

        next();

    }catch(e){

         next(e);

    }

}

const AllAdminMid = (req,res,next) => {

    try{

        if(req.user.type !== UserTypes.admin || req.user.type !== UserTypes.superadmin)
        throw new ApiError(Define.UNAUTHORIZED, 'Access denied');

        next()

    }catch(e){

        next(e);

    }

}

// exports
module.exports = {
    SuperAdminMid,
    AdminMid,
    AllAdminMid
}