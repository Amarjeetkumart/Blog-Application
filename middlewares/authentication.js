const { verifyToken } = require("../services/authentication");
//here we are checking if the user has a cookie with the name of the token
function checkForAuthenticationCookie(cookieName) {
    return function(req, res, next) {
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) {
           return next();
        }

        try {
            const userPayload = verifyToken(tokenCookieValue);
            req.user = userPayload;
        } catch (error) {} 
       return next();
    };
}
//exporting the function of checking for the authentication cookie
module.exports = {
    checkForAuthenticationCookie,
};