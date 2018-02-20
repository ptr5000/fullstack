const blogRouter = require('express').Router()

const Blog = require('../models/blog')

blogRouter.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/api/blogs', async(request, response) => {
  if ('title' in request.body) {
    let blog = new Blog(request.body)

    let result = await blog.save()
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
