const express = require('express')

const routes = express.Router()

const TweetCtl = require('./controllers/TweetController')
const LikeCtl = require('./controllers/LikeController');

routes.get('/', (req, res) => {
    return res.send('Teste servidor!!!')
})

routes.get('/tweets', TweetCtl.index)
routes.post('/tweets', TweetCtl.store)

routes.post('/tweets/:id', LikeCtl.store)
module.exports = routes