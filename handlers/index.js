const homeHandler = require('./home.js');
const staticFiles = require('./static-handler');
const dataHandlers = require('./cats');

module.exports = [homeHandler, staticFiles, dataHandlers];