

const ApiKeyMid = (req,res,next) => {

    const headers = req.headers;

    try{




    }catch(e){
        console.log(e)
        next(e)
    }
    

}

module.exports = ApiKeyMid;