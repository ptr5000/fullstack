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
  console.log(request.body)
  if ('title' in request.body) {
    const blog = new Blog(request.body)

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

module.exports = blogRouter
