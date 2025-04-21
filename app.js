const express=require('express');
const mongoose=require('mongoose');
const userRouter=require('./routes/user')
const path=require('path');
const Blog=require('./models/blog');
const dotenv=require('dotenv');
dotenv.config();
const cookieParser=require('cookie-parser');
const { checkForAuthentication, restrictToLoggedInUserOnly } = require('./middlewares/authentication');
const app=express();

const PORT=process.env.PORT||8001;
const blogRouter=require('./routes/blog');

mongoose.connect(process.env.MongoDbURL).then(()=>console.log("MongoDb connected"))
.catch((err)=>
    console.log(err.message)
)

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(checkForAuthentication('token'));
app.use(express.static(path.resolve('./public')));

app.get('/',async(req,res)=>{
    let allBlogs = [];
    if (req.user && req.user._id) {
        allBlogs = await Blog.find({}).sort('createdAt');
    }    return res.render('home',{
        user:req.user,
        blogs:allBlogs
    });
})

app.use('/user',userRouter);
app.use('/blog',blogRouter)

app.listen(PORT,()=>console.log(`Server started at PORT ${PORT}`));