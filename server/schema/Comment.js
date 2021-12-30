import mongoose from 'mongoose';

const comments = new mongoose.Schema( {
    content: {
        type: String,
        required: true
    },
    usernameQ: {
        type: String,
        required: true
    }
});


const Comment = mongoose.model('Comment',comments);

export default Comment;