const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')


blogRouter.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .populate("user", { id:1, username: 1, name: 1 })
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/api/blogs', async(request, response) => {
  if (!request.token) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const decodedToken = jwt.verify(request.token, "ASDF")

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if ('title' in request.body) {
    let blog = new Blog({...request.body, user})

    let result = await blog.save()

    user.blogs = [...user.blogs, result._id]
    let userdata = await user.save()

    response
      .status(201)
      .json(result)
  } else {
    response
      .status(400)
      .send({error: "title or url missing"})
  }
})

blogRouter.delete('/api/blogs/:id', async(request, response) => {

  let res = await Blog.findByIdAndRemove(request.params.id)

  response
    .status(200)
    .end()

})

blogRouter.put('/api/blogs/:id', async(request, response) => {
  let res = await Blog.findByIdAndUpdate(request.params.id, request.body)

  response
    .status(200)
    .end()
})

module.exports = blogRouter
