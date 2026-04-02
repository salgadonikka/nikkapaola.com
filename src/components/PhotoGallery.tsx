import { useState } from 'react';

interface Props {
  images: string[];
  captions?: string[];
  columns?: 2 | 3 | 4;
}

export default function PhotoGallery({ images, captions = [], columns = 3 }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  function prev() {
    setLightbox((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }

  function next() {
    setLightbox((i) => (i === null ? null : (i + 1) % images.length));
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'Escape') setLightbox(null);
  }

  const cols = { 2: '1fr 1fr', 3: 'repeat(3, 1fr)', 4: 'repeat(4, 1fr)' }[columns];

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: cols,
          gap: '4px',
          margin: '2em 0',
        }}
      >
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setLightbox(i)}
            style={{
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              overflow: 'hidden',
              aspectRatio: '1',
              background: '#e8d5ce',
              display: 'block',
            }}
            aria-label={captions[i] ?? `Photo ${i + 1}`}
          >
            <img
              src={src}
              alt={captions[i] ?? `Photo ${i + 1}`}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
            />
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(28, 26, 23, 0.96)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close"
            style={{
              position: 'absolute', top: 20, right: 24,
              background: 'none', border: 'none', color: 'rgba(250,247,242,0.6)',
              fontSize: '1.5rem', cursor: 'pointer', lineHeight: 1,
            }}
          >
            ✕
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous"
            style={{
              position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(250,247,242,0.1)', border: '1px solid rgba(250,247,242,0.2)',
              color: 'rgba(250,247,242,0.8)', width: 44, height: 44, borderRadius: '50%',
              cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            ←
          </button>

          <img
            src={images[lightbox]}
            alt={captions[lightbox] ?? `Photo ${lightbox + 1}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '80vh',
              objectFit: 'contain',
              borderRadius: '4px',
            }}
          />

          {captions[lightbox] && (
            <p style={{
              marginTop: '16px', color: 'rgba(250,247,242,0.6)',
              fontSize: '0.85rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic',
              textAlign: 'center',
            }}>
              {captions[lightbox]}
            </p>
          )}

          <p style={{ color: 'rgba(250,247,242,0.3)', fontSize: '0.75rem', marginTop: '12px' }}>
            {lightbox + 1} / {images.length}
          </p>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next"
            style={{
              position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(250,247,242,0.1)', border: '1px solid rgba(250,247,242,0.2)',
              color: 'rgba(250,247,242,0.8)', width: 44, height: 44, borderRadius: '50%',
              cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            →
          </button>
        </div>
      )}
    </>
  );
}
