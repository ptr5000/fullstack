const supertest = require('supertest')
const {app} = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

describe('Blog tests', () => {
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
      .delete('/api/blogs/' + result._id)
      .expect(200)
    
    expect(await Blog.findById(result._id)).toBe(null);

  })


  test('blogs are updated', async() => {
    let blog = new Blog({author: 'Jorma', url:'example.com'})

    let result = await blog.save()

    const response = await api
      .put('/api/blogs/' + result._id)
      .send({author:"Keijo", likes: 10})
      .expect(200)
    
    newBlog = await Blog.findById(result._id)

    expect(newBlog.author).toBe('Keijo');
    expect(newBlog.likes).toBe(10);
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

  test('create user', async() => {
      let username = Math.random().toString(36).replace(/[^a-z]+/g, '');

      await api
      .post('/api/users')
      .send({username: "as", password: username, name:"Test User"})
      .expect(412)

      await api
      .post('/api/users')
      .send({username: username, password: username, name:"Test User"})
      .expect(201)
      
      
      await api
      .post('/api/users')
      .send({username: username, password: username, name:"Test User"})
      .expect(409)
  })

  afterAll(() => {
    server.close()
  })
})