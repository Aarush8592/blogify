const express=require('express');
const User=require('../models/user')
const router=express.Router();

router.get('/signin',(req,res)=>{
    return res.render('signin');
})
router.get('/signup',(req,res)=>{
    return res.render('signup');
})
router.post('/signin',async (req,res)=>{
    const {email,password}=req.body;
    try{
        const token=await User.matchPasswordAndGenerateToken(email,password);
        return res.cookie('token',token).redirect('/');
    }
    catch(error){
        return res.render('signin',{
            error:error,
        })
    }
})
router.post('/signup',async (req,res)=>{
    const {fullName,email,password}=req.body;
    if(password.length<8){
        return res.render('signup',{
            error:"Password should be more than 8 characters!"
        })
    }
    const checkExisitingUser=await User.findOne({email});
    if(checkExisitingUser!==null){
        return res.render('signup',{
            error:'This email Already Exists! Try with other one.'
        })
    }
    try{
        const result=await User.create({
            fullName,
            email,
            password
        })
        return res.redirect('/user/signin');    
    }
    catch(err){
        return res.render('signup',{
            error:err.message
        })
    }
})
router.get('/logout',(req,res)=>{
    res.clearCookie('token').redirect('/');
})
module.exports=router;