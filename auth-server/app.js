const express = require("express");
const dotenv = require('dotenv');
const morgan = require("morgan");
const authRouter = require("./routers/auth/auth");
const cookieparser = require('cookie-parser');
const {apiErrorHandler} = require("./middlewares/apiErrorHandler");
const { ApiError } = require("./utils/response");
const Define = require("./utils/Define");
const cors = require('cors');
const { createApiKey } = require("./utils/Helper");


// Initialize App
const app  = express();

dotenv.config();

const port = process.env.PORT || 5000;


/**
 * @date 2022-08-02
 * @middleware {morgan} morgan('method:url:status:res[content-length]-:response-timems') // for logging out info about visited routes
 * @middleware {json} express.json() // for allowing parsing json data on req param
 * @middleware {urlencoded} express.urlencoded({extended : false})
 * @middleware {cookie} cookieparser() // for allowing parsing cookies on req param
 * @returns - all returns {any}
 */
 app.use(cors({ origin: true, credentials: true }))
app.use(morgan('method :url :status :res[content-length] - :response-time ms'))
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cookieparser())

/**
 * @url {any} 'http://localhost/'
 * @param {any} req, res
 */

app.get('/',(req,res) => {
    console.log(res)
    return res.status(200).send({
        err : false,
        msg : 'Auth Server Running',
    })
})

app.use('/auth', authRouter)


app.use('*',(req,res,next) =>{
    next(new ApiError(Define.INVALID_METHOD,`Invalid route or you cannot ${req.method} to this route` ))
})

createApiKey();

app.use(apiErrorHandler)

app.listen(port,()=>console.log(`Server Running On Port ${port} `))

