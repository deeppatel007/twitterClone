import express from 'express';
import User from '../schema/User.js';
import Comment from '../schema/Comment.js'
import Post from '../schema/Post.js';
import Follow from '../schema/follow.js';
const router=express.Router();


router.post('/signin', async (req,res,next) => {
    const exist = await User.findOne({ username: req.body.username });
    
    if(exist){
        return res.status(401).json('Username already exist');
    } 
    User.create(req.body)
    .then(data => res.json(data))
    .catch(next => console.log(next));
})

router.post('/follow', async (req,res,next) => {
    console.log(req.body);
    const exist = await Follow.findOne({ userid: req.body.username1 });
    const exist1 = await Follow.findOne({ userid: req.body.username2 });
    if(exist)
    {
        const hh = await Follow.findOneAndUpdate({ userid: req.body.username1 },{ $addToSet : {
            following: req.body.username2
        }})
    }
    else 
    {
        console.log("1");
        Follow.create({
            userid: req.body.username1,
            follower: [],
            following: [req.body.username2]
        })
        .then(data => res.json(data))
        .catch(next => console.log(next));
    }
    if(exist1)
    {
        const hh = await Follow.findOneAndUpdate({ userid: req.body.username2 }, {  $addToSet: {
            follower: req.body.username1
        }})
    }
    else 
    {
        console.log("2");
        Follow.create({
            userid: req.body.username2,
            follower: [req.body.username1],
            following: [] 
        })
        .then(data => res.json(data))
        .catch(next => console.log(next));
    }
})

router.post('/post', async (req,res,next) => {
    const exist = await Post.findOne({ _id: req.body._id});
    if(exist){
        return Post.updateOne({"_id":exist._id},{$set:{title:req.body.title, content:req.body.content}});
    } 
    else{
        Post.create(req.body)
        .then(data => res.json(data))
        .catch(next => console.log(next));
    }
})


router.post('/add', async (req,res,next) => {
    const exist = await Comment.findOne({ content: req.body.content, usernameQ : req.body.usernameQ});
    if(exist){
        return res.status(401).json('Comment already exist');

    } 
    Comment.create(req.body)
    .then(data => res.json(data))
    .catch(next => console.log(next));
})

router.get('/post/search', async (req,res,next) => {
    const exist = await Post.find({});
    if(exist){
        return res.json(exist);
    } 
    else{
        return res.json('no data found');
    }
})

router.get('/user/search', async (req,res,next) => {
    const exist = await User.find({});
    if(exist){
        return res.json(exist);
    } 
    else{
        return res.json('no data found');
    }
})
router.get('/follow/search', async (req,res,next) => {
    const exist = await Follow.find(req.query);
    if(exist){
        return res.json(exist);
    }else{
        return res.json('no data found');
    }
})



router.get('/comment/search', async (req,res,next) => {
    const exist = await Comment.find(req.query);
    if(exist){
        return res.json(exist);
    } 
    else{
        return res.json('no data found');
    }
})

router.post('/login', async (req, res, next) => {
    const user = await User.findOne({username: req.body.username, password: req.body.password});
    if(user){
        return res.status(200).json(`${req.body.username} login successfull`);
    }
    else{
        return res.status(401).json('Invalid Login');
    }
})



router.post('/tweet', async (req, res, next) => {
    Tweet.create(req.body)
    .then(data => res.json(data))
    .catch(next => console.log(next));
})

router.get('/tweet/search', async (req,res,next) => {
    const exist = await Que.find({});
    if(exist){
        return res.json(exist);
    } 
    else{
        return res.json('no tweets found');
    }
})

export default router;