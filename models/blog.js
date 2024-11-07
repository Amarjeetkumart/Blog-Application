const { Schema, model } = require('mongoose');
//creating a schema for the blog
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    coverImageURL: {
        type: String,
        required: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        // required: true
    }
}, { timestamps: true });
//creating a model for the blog
const Blog = model('blog', blogSchema);
//exporting the model for the blog
module.exports = Blog;