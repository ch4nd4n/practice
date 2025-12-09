import { useState } from 'react';

const MOCK_IMAGES = [
    { id: 1, url: 'https://picsum.photos/id/10/300/200', title: 'Forest' },
    { id: 2, url: 'https://picsum.photos/id/11/300/200', title: 'Lake' },
    { id: 3, url: 'https://picsum.photos/id/12/300/200', title: 'Beach' },
    { id: 4, url: 'https://picsum.photos/id/13/300/200', title: 'Stream' },
    { id: 5, url: 'https://picsum.photos/id/14/300/200', title: 'Ocean' },
    { id: 6, url: 'https://picsum.photos/id/15/300/200', title: 'Waterfall' },
    { id: 7, url: 'https://picsum.photos/id/16/300/200', title: 'Rocks' },
    { id: 8, url: 'https://picsum.photos/id/17/300/200', title: 'Meadow' },
];

export function ImageGallery() {
    const [filter, setFilter] = useState('');
    const [displayedImages, setDisplayedImages] = useState(MOCK_IMAGES);

    const handleSearch = () => {
        const lowerFilter = filter.toLowerCase();
        const filtered = MOCK_IMAGES.filter(img =>
            img.title.toLowerCase().includes(lowerFilter)
        );
        setDisplayedImages(filtered);
    };

    const handleKeyUp = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className="gallery-holder">
            <h2>Image Gallery</h2>

            <div className="gallery-controls">
                <input
                    type="text"
                    className="gallery-input"
                    placeholder="Filter images..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    onKeyUp={handleKeyUp}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            <ul className="gallery-list">
                {displayedImages.length > 0 ? (
                    displayedImages.map(img => (
                        <li key={img.id} className="gallery-item">
                            <img src={img.url} alt={img.title} title={img.title} />
                        </li>
                    ))
                ) : (
                    <p>No images found.</p>
                )}
            </ul>
        </div>
    );
}
