export default function Setup() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">AI Stock Analyzer Setup Guide</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Installing Dependencies</h2>
          <div className="bg-gray-800 rounded-lg p-6">
            <p className="text-gray-300 mb-4">Run the following command to install required dependencies:</p>
            <pre className="bg-gray-900 p-4 rounded overflow-x-auto">
              <code className="text-blue-400">npm install @tensorflow/tfjs-node react-chartjs-2 chart.js</code>
            </pre>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Training the TensorFlow Model</h2>
          <div className="bg-gray-800 rounded-lg p-6">
            <p className="text-gray-300 mb-4">
              Create a new file called <code className="text-blue-400">train-model.js</code> in your project root:
            </p>
            <pre className="bg-gray-900 p-4 rounded overflow-x-auto mb-4">
              <code className="text-blue-400">
                {`const tf = require('@tensorflow/tfjs-node');
const fetch = require('node-fetch');

async function fetchTrainingData(symbol) {
  const response = await fetch(
    \`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=\${symbol}&apikey=\${process.env.ALPHA_VANTAGE_API_KEY}\`
  );
  const data = await response.json();
  return Object.values(data['Time Series (Daily)'])
    .map(day => parseFloat(day['4. close']))
    .reverse();
}

async function prepareData(prices, windowSize = 5) {
  const x = [];
  const y = [];
  
  for (let i = 0; i < prices.length - windowSize; i++) {
    x.push(prices.slice(i, i + windowSize));
    y.push(prices[i + windowSize]);
  }
  
  return {
    inputs: tf.tensor2d(x),
    outputs: tf.tensor2d(y, [y.length, 1])
  };
}

async function trainModel() {
  // Fetch historical data for training
  const symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META'];
  let allPrices = [];
  
  for (const symbol of symbols) {
    const prices = await fetchTrainingData(symbol);
    allPrices = allPrices.concat(prices);
  }
  
  // Prepare data
  const { inputs, outputs } = await prepareData(allPrices);
  
  // Create model
  const model = tf.sequential();
  model.add(tf.layers.lstm({
    units: 50,
    returnSequences: true,
    inputShape: [5, 1]
  }));
  model.add(tf.layers.lstm({ units: 50 }));
  model.add(tf.layers.dense({ units: 1 }));
  
  // Compile model
  model.compile({
    optimizer: tf.train.adam(0.001),
    loss: 'meanSquaredError'
  });
  
  // Train model
  await model.fit(inputs, outputs, {
    epochs: 50,
    batchSize: 32,
    validationSplit: 0.1,
    shuffle: true
  });
  
  // Save model
  await model.save('file://./models/stock_prediction_model');
  console.log('Model trained and saved successfully!');
}

trainModel().catch(console.error);`}
              </code>
            </pre>

            <p className="text-gray-300 mb-4">Follow these steps to train the model:</p>
            <ol className="list-decimal list-inside text-gray-300 space-y-2">
              <li>
                Create a <code className="text-blue-400">models</code> directory in your project root
              </li>
              <li>Set your Alpha Vantage API key in your environment variables</li>
              <li>
                Run the training script:
                <pre className="bg-gray-900 p-2 rounded mt-2">
                  <code className="text-blue-400">node train-model.js</code>
                </pre>
              </li>
            </ol>

            <div className="mt-6 bg-yellow-900/50 p-4 rounded">
              <p className="text-yellow-300">
                <strong>Note:</strong> Training the model may take several minutes. The script will fetch historical
                data for multiple stocks to create a robust training dataset. Make sure you have a stable internet
                connection and sufficient API call limits with Alpha Vantage.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Environment Variables</h2>
          <div className="bg-gray-800 rounded-lg p-6">
            <p className="text-gray-300 mb-4">
              Create a <code className="text-blue-400">.env.local</code> file in your project root with:
            </p>
            <pre className="bg-gray-900 p-4 rounded overflow-x-auto">
              <code className="text-blue-400">ALPHA_VANTAGE_API_KEY=RITB360YR86PP5U0</code>
            </pre>
          </div>
        </section>
      </div>
    </div>
  )
}

