const jwt =require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
const secret=process.env.SECRET_KEY;
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