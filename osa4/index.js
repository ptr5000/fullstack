const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const blogRouter = require('./controllers/blog')
const mongoose = require('mongoose')

app.use(cors())
app.use(bodyParser.json())


if ( process.env.NODE_ENV !== 'production' ) {
    require('dotenv').config()
}

const url = process.env.MONGODB_URI

mongoose.connect(url)
mongoose.Promise = global.Promise

const PORT = 3003

app.use('/', blogRouter)

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}