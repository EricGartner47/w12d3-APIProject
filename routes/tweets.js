const express = require("express");
const router = express.Router();
const db = require("../db/models");
const {check, validationResult} = require('express-validator');
const { route } = require(".");

const  {Tweet} = db;

const asyncHandler = (handler) => {
    return (req, res, next) => {
        return handler(req, res, next).catch(next);
    };
};


// router.get("/", (req, res) => {
//     res.json({message: "test tweets index"});
// });

const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => error.msg);

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    return next(err);
  }
  next();
};

const checkTweet = [ //use check validator as a middleware
check ('message')
.exists({checkFalsy: true})
.isLength({max: 280})
]
router.get("/", asyncHandler(async(req, res)=> {
    const tweets = await Tweet.findAll()
    res.json({tweets})
}))

// custom error handler
// const tweetNotFoundError = (tweetId) => {
//     const err = new Error('Tweet not found')
//     err.status = 404
//     return err;
// }

router.get("/:id(\\d+)", asyncHandler(async(req, res, next)=> {
    const tweetId = await Tweet.findByPk(req.params.id)
    // console.log(tweetId.message)
    res.json({tweetId})
    next(tweetNotFoundError)
}))


router.post('/', checkTweet, handleValidationErrors, asyncHandler(async(req, res)=>{
    const {message} = req.body
    await Tweet.create({
        message
    })
    res.redirect('/tweets')
}))

router.put('/:id(\\d+)', asyncHandler(async(req,res)=>{
    const tweetId = await Tweet.findByPk(req.params.id)
}))

module.exports = router
