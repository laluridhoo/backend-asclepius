const { postPredictHandler, getHistoriesHandler } = require('../server/handler');

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
    path: '/predict/histories',
    method: 'GET',
    handler: getHistoriesHandler,
  },
];

module.exports = routes;