/* eslint-disable no-undef */
require('babel-core/register')
require('babel-polyfill')

const configureCSSModules = require('./configureCSSModules')

// These may also be defined by webpack on the client-side.
global.__CLIENT__ = false
global.__SERVER__ = true
global.__DEVELOPMENT__ = process.env.NODE_ENV === 'development'
global.__DEVTOOLS__ = global.__CLIENT__ && __DEVELOPMENT__

if (__DEVELOPMENT__) {
  require('dotenv').load()
}
configureCSSModules()
require('./server').start()