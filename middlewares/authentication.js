const { validateToken } = require("../services/authentication");

function checkForAuthentication(cookieName){
    return (req,res,next)=>{
        const tokenCookieValue=req.cookies[cookieName];
        if(!tokenCookieValue){
            return next();
        }
        const user=validateToken(tokenCookieValue);
        if(!user){
            return next();
        }
        req.user=user;
        next();
    }
}
function restrictToLoggedInUserOnly(){
    return function(req,res,next){
        const tokenValue=req.cookies['token'];
        if(!tokenValue){
            return res.redirect('/user/signin');
        }
        const user=validateToken(tokenValue);
        if(!user){
            return res.redirect('/user/login');
        }
        req.user=user;
        next();
    }
}
module.exports={checkForAuthentication,restrictToLoggedInUserOnly};