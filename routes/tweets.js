const express = require("express");
const router = express.Router();
const db = require("../db/models");

const  {Tweet} = db;

const asyncHandler = (handler) => {
    return (req, res, next) => {
        return handler(req, res, next).catch(next);
    };
};


// router.get("/", (req, res) => {
//     res.json({message: "test tweets index"});
// });

router.get("/", asyncHandler(async(req, res)=> {
    const tweets = await Tweet.findAll()
    res.json({tweets})
}))

router.get("/:id(\\d+)", asyncHandler(async(req, res, next)=> {
    const tweetId = await Tweet.findByPk(req.params.id)
    const tweetNotFoundError = (tweetId) => {
        
    }
    console.log(tweetId.message)
    res.json({tweetId})
}))

module.exports = router
