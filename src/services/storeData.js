const { Firestore } = require('@google-cloud/firestore');

const db = new Firestore({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
}); // Inisialisasi Firestore di luar fungsi untuk efisiensi

async function storeData(id, data) {
  try {
    const predictCollection = db.collection('predictions');

    // Simpan data ke Firestore
    await predictCollection.doc(id).set(data);

    console.log(`Data with ID: ${id} successfully stored in Firestore.`);
    return { success: true, message: 'Data successfully stored' };
  } catch (error) {
    console.error(`Failed to store data with ID: ${id}. Error: ${error.message}`);
    throw new Error('Failed to store data in Firestore');
  }
}

module.exports = storeData;
