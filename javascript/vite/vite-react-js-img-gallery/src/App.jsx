import { Routes, Route, Link } from 'react-router-dom';
import { ImageGallery } from './components/ImageGallery';
import { ImageGalleryV2 } from './components/ImageGalleryV2';
import { MsWordToMd } from './components/MsWordToMd';

function Home() {
  return (
    <div style={{ textAlign: 'center', paddingTop: '10vh' }}>
      <h1>Vite React Image Gallery</h1>
      <p>Click below to view the gallery component.</p>
      <div style={{ marginTop: '2rem' }}>
        <Link to="/gallery">
          <button>Open Image Gallery</button>
        </Link>
        <Link to="/gallery-v2">
          <button>Open Image Gallery V2</button>
        </Link>
        <Link to="/ms-word-to-md" style={{ marginLeft: '10px' }}>
          <button>MS Word to MD</button>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gallery" element={<ImageGallery />} />
      <Route path="/gallery-v2" element={<ImageGalleryV2 />} />
      <Route path="/ms-word-to-md" element={<MsWordToMd />} />
    </Routes>
  );
}

export default App;
