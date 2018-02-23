const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    if(body.username.length < 3) {
      response.status(412).send("Username too short")
    } else {
      let existingUser = await User.findOne({username: body.username})

      if(existingUser != null) {
        response.status(409).send("User already exists")
        return;
      }

      const saltRounds = 10
      const passwordHash = await bcrypt.hash(body.password, saltRounds)

      const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
        adult: body.adult
      })

      const savedUser = await user.save()

      response.status(201).json(savedUser)
    }
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

usersRouter.get('/', async (request, response) => {
    users = await User.find({})

    response.status(200).json(users);
})

module.exports = usersRouter
