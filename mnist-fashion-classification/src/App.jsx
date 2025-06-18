import { useState } from 'react'
import './App.css'
import ImageGrid from './components/ImageGrid'
import ImagePred from './components/ImagePred';

function App() {
  const [pathImage, setPathImage] = useState(null);

  return (
    <>
      <h2>MNIST fashion classification</h2>
      <ImagePred pathImage = { pathImage } />
      <ImageGrid setPathImage = { setPathImage }/>
    </>
  )
}

export default App
