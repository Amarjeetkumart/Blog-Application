// Purpose: Entry point of the application
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');
const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');
const Blog = require('./models/blog');
// create an express app
const app = express();
const PORT = 8000;
// connect to the database
mongoose.connect('mongodb://localhost:27017/blogify')
.then(e => console.log('Connected to DB'));
// set the view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));
// set the middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));
// set the routes
app.get('/', async (req, res) => {
  const allBlogs = await Blog.find({}).sort({ createdAt: -1 }) 
    res.render('home', {
      user: req.user,
      blogs: allBlogs,
    });
  });
// set the routes
app.use('/user', userRouter);
app.use('/blog', blogRouter);
// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})