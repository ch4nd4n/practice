import { Routes, Route, Link } from 'react-router-dom';
import { ImageGallery } from './components/ImageGallery';

function Home() {
  return (
    <div style={{ textAlign: 'center', paddingTop: '10vh' }}>
      <h1>Vite React Image Gallery</h1>
      <p>Click below to view the gallery component.</p>
      <div style={{ marginTop: '2rem' }}>
        <Link to="/gallery">
          <button>Open Image Gallery</button>
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
    </Routes>
  );
}

export default App;
