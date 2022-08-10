module.exports = {
    
    ApiError : class {

        constructor(code,msg){
            this.err = true;
            this.msg = msg;
            this.code = code;
        }

        resp(){
            return new ApiResponse(this.code,this.msg);
        }
    },

    ApiResponse: (msg, resp) => {
        return {
        status : false,
        resp : msg,
        message : resp
        };
    },

};
