//imports
const JWT = require('jsonwebtoken');
//secret key for the token
const secret = "....";
//function to create a token for the user
function createTokenForUser(user) {
    const pyload = {
        _id: user._id,
        email: user.email,
        profilePicture: user.profilePicture,
        role: user.role
    };
    const token = JWT.sign(pyload, secret);
    return token;
};
//function to verify the token
function verifyToken(token) {
    const pyload = JWT.verify(token, secret);  
    return pyload;
}
//exporting the functions
module.exports = {
    createTokenForUser,
    verifyToken,
};