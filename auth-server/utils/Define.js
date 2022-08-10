

const Define = {

    SESSION_COOKIE_OPTIONS : {
        httpOnly : true, // so that the cookie cannot be accessed via JS code from the browser
        secure : false, // only for dev - set true when you want you cookies to be create on @https secure origin
        sameSite : 'lax', // cookie is set only when the domain URL in the browser matches the doamin in the cookie
    },
    OK : 200,
    NOT_FOUND : 404,
    BAD_REQUEST : 400,
    INTERNAL_SERVER : 500,
    UNPROCESSED : 422,
    CREATED : 201,
    INVALID_METHOD : 405,
    UNAUTHORIZED : 401

}

module.exports = Define;