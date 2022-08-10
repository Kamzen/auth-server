const nodemailer = require('nodemailer');
const Define = require('./Define');
const { ApiError } = require('./response');

const sendEmail = async (payload,callback) => {

    try{

        const transporter = nodemailer.createTransport({
            service : 'gmail',
            // host : '',
            // port : '',
            auth : {
                user : process.env.EMAIL_USER,
                pass : process.env.EMAIL_USER_PASSWORD
            }
        });

        const EMAIL_INFO_OPTIONS = {
            from : process.env.EMAIL_USER,
            to : payload.email,
            subject : 'CDA Solutions Authentication',
            html : payload.html
        }


        transporter.sendMail(EMAIL_INFO_OPTIONS, (err,info) => {
            callback(err,info);
        })
    

    }catch(e){

        return new ApiError(Define.BAD_REQUEST,e);

    }
}

module.exports = sendEmail;