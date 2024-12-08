require('dotenv').config();
 
const Hapi = require('@hapi/hapi');
const routes = require('../server/routes');
const loadModel = require('../services/loadModel');
const InputError = require('../exceptions/InputError');
 
(async () => {
    const server = Hapi.server({
        port: 5000,
        host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
        routes: {
            cors: {
              origin: ['*'],
            },
        },
    });
 
    const model = await loadModel();
    server.app.model = model;
 
    server.route(routes);
 
    server.ext('onPreResponse', function (request, h) {
        const response = request.response;
    
        // Tangani payload yang melebihi batas (413)
        if (response.isBoom && response.output.statusCode === 413) {
            const newResponse = h.response({
                status: 'fail',
                message: "Payload content length greater than maximum allowed: 1000000",
            });
            newResponse.code(413);
            return newResponse;
        }
    
        // Tangani kesalahan format atau prediksi (400)
        if (response.isBoom && response.output.statusCode === 400) {
            const newResponse = h.response({
                status: 'fail',
                message: "Terjadi kesalahan dalam melakukan prediksi",
            });
            newResponse.code(400);
            return newResponse;
        }
    
        // Jika tidak ada kesalahan, lanjutkan respons
        return h.continue;
    });
    
    await server.start();
    console.log(`Server start at: ${server.info.uri}`);
})();