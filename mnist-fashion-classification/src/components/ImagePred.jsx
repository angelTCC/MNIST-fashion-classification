import * as tf from '@tensorflow/tfjs';
import { BarChart } from '@mui/x-charts/BarChart';
import { useState } from 'react';
import { FaImage } from "react-icons/fa6";

export default function ImagePred( { pathImage } ) {
    const [model, setModel] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const displayBoxStyle = {
        width: '50%',
        backgroundColor: 'grey',
        margin: '10px',
        borderRadius: 10,
        height: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };
    const loadModel = async () => {
    try {
        const loadedModel = await tf.loadLayersModel('/model_v3/model.json');
        setModel(loadedModel);
        alert('Model loaded!');
    } catch (error) {
        console.error('Failed to load model:', error);
        alert('Error loading model. See console for details.');
    }
    };
    const predict = async () => {
        if (!model || !pathImage) return;

        const img = new Image();
        img.src = pathImage;
        img.crossOrigin = 'anonymous';
    
        img.onload = async () => {
            const tensor = tf.tidy(() => {
                const t = tf.browser.fromPixels(img)
                        .resizeNearestNeighbor([28, 28])
                        .mean(2)
                        .expandDims(-1)
                        .toFloat()
                        .div(255.0);
                    
                // Check model input shape and adjust accordingly
                return model.inputs[0].shape.length === 3 
                    ? t.reshape([28, 28, 1])  // For single-image models
                    : t.expandDims(0);        // For batch-expecting models
            });

            try {
                const output = model.predict(tensor);
                const data = await output.array();
                setPrediction(Array.isArray(data[0]) ? data[0] : data);
            } finally {
                tensor.dispose();
            }
        };
    };


    return (
        <div>
            <button onClick={loadModel}>Load Model</button>

              <div style={{ display: 'flex' }}>
                <div style={displayBoxStyle}>
                  {pathImage ? (
                    <img
                      src={pathImage}
                      alt="Selected"
                      style={{ height: '80%', borderRadius: 20 }}
                    />
                  ) : (
                    <div>
                        <FaImage style={{ fontSize: '48px', color: '#ccc' }}  />
                        <p>Select Image</p>
                    </div>
                  )}
                </div>
        
                <div style={displayBoxStyle}>
                    <div style={{ textAlign: 'center'}}>
                        <br />
                        <button
                        onClick={predict}
                        disabled={!model || !pathImage}
                        style={{ marginTop: 10 }}
                        >
                        Predict Selected Image
                        </button>
                        {prediction && (
                        <div style={{ marginTop: 10 }}>
            
                            <BarChart
                            yAxis={[
                            {
                                id: 'barCategories',
                                data: ["Tshirt", "Trouser", "Pullover", "Dress", "Coat", "Sandal", "Shirt", "Sneaker", "Bag", "Ankle"],
                            },
                            ]}
                            series={[
                            {
                                data: prediction,
                            },
                            ]}
                            height={200}
                            layout="horizontal"
                        />
                        </div>
                        )}
                    </div>
                </div>
              </div>
        </div>
    )
}