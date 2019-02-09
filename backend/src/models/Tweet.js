const mongoose = require('mongoose')

const TweetSchema = new mongoose.Schema({
    author: String,
    content: String,
    likes: {
        type: Number,
        default: 0,
    },
    creatAd: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model("Tweet", TweetSchema)