import mongoose from 'mongoose';

const post = new mongoose.Schema( {
    content: {
        type: String,
        required: true
    },
    usernameQ: {
        type: String,
        required: true,
    }
});


const Post = mongoose.model('Post',post);

export default Post;