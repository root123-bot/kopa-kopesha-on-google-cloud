
const routes = require('next-routes')(); 

routes
  .add('/campaigns/new', '/campaigns/new')
  .add('/profile/:address', '/pro/')
  .add('/profile/:address/borrow', '/borrow/') 
  .add('/campaigns/:address/requests', '/campaigns/requests/index')  // Hii vilevile  mtu akiclick /campaigns/<address:int>/requests basi itaenda kwenye campaigns/requests/index
  .add('/campaigns/:address/requests/new', '/campaigns/requests/new');
module.exports = routes;