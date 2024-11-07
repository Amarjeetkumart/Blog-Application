const { Router } = require('express');
const multer = require('multer');
const path = require('path');
// import for blog and comment
const Blog = require('../models/blog');
const Comment = require('../models/comment');
//import for router
const router = Router();

//multer storage for the image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads`))
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
  })
//multer upload for the image
  const upload = multer({ storage: storage })
//get route for the blog with add new blog
router.get('/add-new', (req, res) => {
    return res.render('addBlog', {
        user: req.user,
    });
});
//get route for the blog with all the blogs
router.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate('createdBy');
    const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy");
        return res.render('blog', {
        blog,
        user: req.user,
        comments,
    });
}); 
//post route for the comment
router.post("/comment/:blogId", async (req, res) => {
    await Comment.create({
      content: req.body.content,
      blogId: req.params.blogId,
      createdBy: req.user._id,
    });
    return res.redirect(`/blog/${req.params.blogId}`);
  });
  
//post route for the blog
router.post('/', upload.single("coverImage"), async (req, res) => {
    const blog = await Blog.create({
        title: req.body.title,
        body: req.body.body,
        coverImageURL: `/uploads/${req.file.filename}`,
        createdBy: req.user._id
    });  
    return res.redirect(`/blog/${blog._id}`);
});

//exporting the router
module.exports = router;