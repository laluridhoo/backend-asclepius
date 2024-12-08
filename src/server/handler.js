const predictClassification = require('../services/inferenceService');
const storeData = require('../services/storeData');
const crypto = require('crypto');

async function postPredictHandler(request, h) {
  try {
    const { image } = request.payload;
    const { model } = request.server.app;

    console.log('Starting prediction process...');
    const { confidenceScore, label, suggestion } = await predictClassification(model, image);
    console.log('Prediction result:', { confidenceScore, label, suggestion });

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const data = {
      id: id,
      result: label,
      suggestion: suggestion,
      confidenceScore: confidenceScore,
      createdAt: createdAt,
    };

    console.log('Storing data to Firestore...');
    await storeData(id, data); // Simpan ke Firestore
    console.log('Data stored successfully!');

    const response = h.response({
      status: 'success',
      message: confidenceScore > 99
        ? 'Model is predicted successfully.'
        : 'Model is predicted successfully but under threshold. Please use the correct picture',
      data,
    });
    response.code(201);
    return response;
  } catch (error) {
    console.error('Error occurred:', error.message);

    const response = h.response({
      status: 'fail',
      message: 'Terjadi kesalahan dalam menyimpan data atau melakukan prediksi',
    });
    response.code(500);
    return response;
  }
}

// Handler untuk GET /predict/histories
async function getHistoriesHandler(request, h) {
  try {
    const db = new Firestore();
    const predictCollection = db.collection('prediction');

    // Ambil semua dokumen dalam koleksi
    const snapshot = await predictCollection.get();

    // Jika tidak ada data
    if (snapshot.empty) {
      return h.response({
        status: 'success',
        data: [],
      }).code(200);
    }

    // Map data ke dalam array
    const histories = [];
    snapshot.forEach((doc) => {
      histories.push({
        id: doc.id,
        history: doc.data(),
      });
    });

    return h.response({
      status: 'success',
      data: histories,
    }).code(200);
  } catch (error) {
    console.error('Error while fetching histories:', error);

    return h.response({
      status: 'fail',
      message: 'Failed to fetch prediction histories',
    }).code(500);
  }
}






module.exports = postPredictHandler, getHistoriesHandler;