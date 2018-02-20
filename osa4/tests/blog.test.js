const supertest = require('supertest')
const {app} = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

test('blogs are returned', async() => {
  const blogsInDb = await Blog.find({})

  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.length).toBe(blogsInDb.length)
})


test('blogs are deleted', async() => {
  let blog = new Blog({author: 'Jorma', url:'example.com'})

  let result = await blog.save()

  const response = await api
    .delete('/api/blogs')
    .send({id: result._id})
    .expect(200)
   
  expect(await Blog.findById(result._id)).toBe(null);

})


test('blog post is created', async() => {
  await api
    .post('/api/blogs')
    .send({title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7})
    .expect(201)
})

test('blog ', async() => {
  let resp = await api
    .post('/api/blogs')
    .send({title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/"})
    .expect(201)

  expect(resp.body['likes']).toBe(0)
})

test('blog post fails ', async() => {
  const resp = await api
    .post('/api/blogs')
    .send({author: "Michael Chan"})
    .expect(400)
})

afterAll(() => {
  server.close()
})
