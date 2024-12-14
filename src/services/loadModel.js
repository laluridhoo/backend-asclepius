require('dotenv').config();
const tf = require('@tensorflow/tfjs-node');

async function loadModel() {
    const modelUrl = process.env.MODEL_URL;

    if (!modelUrl) {
        throw new Error('MODEL_URL is not defined. Please set the environment variable.');
    }

    try {
        const model = await tf.loadGraphModel(modelUrl);
        console.log('Model successfully loaded from:', modelUrl);
        return model;
    } catch (error) {
        console.error('Error loading model from URL:', modelUrl, '\nError:', error.message);
        throw error;
    }
}

module.exports = loadModel;
