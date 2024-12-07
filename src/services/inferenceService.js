const tf = require('@tensorflow/tfjs-node');
 
async function predictClassification(model, image) {
  const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

  const prediction = model.predict(tensor);
  const score = await prediction.data();
  const confidenceScore = Math.max(...score) * 100;

  const classes = ['Cancer', 'Non-cancer'];
  const classResult = tf.argMax(prediction, 1).dataSync()[0];
  const label = classes[classResult];

  let suggestion;

  // Logika tambahan untuk menangani confidenceScore sangat rendah
  if (confidenceScore < 1) {
      return {
          confidenceScore,
          label: 'Non-cancer',
          suggestion: 'Penyakit kanker tidak terdeteksi.',
      };
  }

  if (label === 'Cancer') {
      suggestion = 'Segera periksa ke dokter!';
  } else if (label === 'Non-cancer') {
      suggestion = 'Penyakit kanker tidak terdeteksi.';
  }

  return { confidenceScore, label, suggestion };
}

 
module.exports = predictClassification;