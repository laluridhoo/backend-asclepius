const postPredictHandler = require('../server/handler');
const getHistoriesHandler = require('../server/handler');  
const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: postPredictHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        maxBytes: 1000000, // 1MB
      }
    }
  },
  {
   path: '/predict/histories', // Endpoint baru
    method: 'GET',
    handler: getHistoriesHandler, // Gunakan handler baru
  },
]
 
module.exports = routes;