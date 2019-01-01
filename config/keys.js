if (process.env.NODE_ENV === 'production') {
  module.export = require('./keys_prod')
} else {
  module.export = require('./keys_dev')
}

module.exports = {
  mongoURI: 'mongodb://paul:Gators48@ds231133.mlab.com:31133/ud_devconnector',
  secretOrKey: 'sssh-secret', // for creating jwt payload
}
