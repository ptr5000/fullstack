const tokenParser = (req, res, next) => {
    const authorization = req.headers['authorization']
    
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      req.token = authorization.substring(7)
    } 
    
    next()
  }
  

  
module.exports = tokenParser