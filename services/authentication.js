const jwt =require('jsonwebtoken');
const secret='aIH(cnP(*De#h983';
function createToken(user){
    const payload={
        fullName:user.fullName,
        _id:user._id,
        email:user.email,
        profileImageURL:user.profileImageURL,
        role:user.role
    }
    return jwt.sign(payload,secret);
}
function validateToken(token){
    if(!token){
        return null;
    }
    return jwt.verify(token,secret);
}
module.exports={createToken,
    validateToken
}